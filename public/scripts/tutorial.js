

var CommentForm = React.createClass({
    handleSubmit:function(e){
        e.preventDefault();
        var author=this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if(!text||!author){
            return;
        }
        this.refs.author.value ='';
        this.refs.text.value='';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something" ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});
var Comment = React.createClass({
    rawMarkup:function(){
        var rawMarkup = marked(this.props.children.toString(),{sanitize:true});
        return {__html:rawMarkup};
    },
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});
var CommentList = React.createClass({
    render:function(){
        var commentNodes =this.props.data.map(function(comment1){
            return(
                <Comment author={comment1.author}>{comment1.text}</Comment>
            );
        });
        return(
            <div className="commentList">
            {commentNodes}
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState:function(){
        return{data:[]};
    },
    componentDidMount:function(){
        this.loadCommentsFromServer();
        setInterval(this.loadCommentFromServer,this.props.pollInterval);
    },
    loadCommentsFromServer:function(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({data:data});
            }.bind(this),
            error:function(xhr,status,err){
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
        <CommentForm />
        </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);
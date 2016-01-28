var data=[
    {author:"lyss",text:"awedr"},
    {author:"lyss",text:"awe"}
];


var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
            Hello, world! I am a CommentForm.
        </div>
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
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.props.data} />
        <CommentForm />
        </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);
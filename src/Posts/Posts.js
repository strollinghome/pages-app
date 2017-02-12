import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* UI */
import './Posts.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Well } from 'react-bootstrap';

function Post(props) {
    return <Well bsSize="large" className="well"> {props.msg} </Well>;
}

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: {}, dataReady: false};
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        console.log("Posts componentWillMount");
        console.log(this.props);
        var reqUrl = "/" + this.props.page['id'] + "/feed";
        console.log(reqUrl);
        graph.get(reqUrl, function(err, res) {
            console.log(res.data);
            this.setState(
                {posts: res.data,
                    dataReady: true}
            );
        }.bind(this));
    }

    render() {
        // For rendering posts:
        // http://v4-alpha.getbootstrap.com/components/list-group/
        // styling https://github.com/erikras/react-redux-universal-hot-example/issues/171
        let body = null;
        if (this.state.dataReady) {
            var rows = [];
            // Render posts
            this.state.posts.forEach((post) => {
                if ('message' in post) {
                    rows.push(<Post msg={post['message']}/>);
                }
            });
            body =
                <div>
                    {rows}
                </div>
        } else {
            body =
                <div>
                    Data not ready.
                </div>
        }
        return (
                <div>
                    {body}
                </div>
        );
    }

}

export default Posts;

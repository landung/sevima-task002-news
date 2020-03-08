import React, {Component, Fragment} from 'react';
import API from '../../helpers/API';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class NewsDetailBackend extends Component {
 
    state = {
        newsId: this.props.match.params.id,
        newsDetail: [],
        newsUser: []
    }
  
    componentDidMount() {
      
      const newsId = this.state.newsId;
  
      API.get(`news/${newsId}`)
      .then((response) => {  
        this.setState({
          newsDetail: response.data,
          newsUser: response.data.user
        });        
      }, (err) => {
        //console.log(err);
      })

      
      
    }
  
    render() {
      return (
        <Fragment>
          <div className="card">
              <ul className="nav justify-content-center">
                <li class="nav-item">
                  <Link to={`/news-post-backend`} className="btn btn-success">Add</Link>
                </li>
                <li class="nav-item">
                  <Link to={`/news-post-backend/${this.state.newsId}`} className="btn btn-warning">Edit</Link>
                </li>
              </ul>
              <hr />
            <div className="card-body">
              <div className="blog-post">
                <h2 className="blog-post-title">{this.state.newsDetail.title}</h2>
                <p className="blog-post-meta"><Moment format="D MMM YYYY" withTitle>{this.state.newsDetail.created_at}</Moment>, by {this.state.newsUser.username}</p>
                <p className="content">
                  <img src="http://placeimg.com/200/150/tech" className="rounded float-left p-3" alt="..." />
                  {this.state.newsDetail.content}
                </p>
              </div>
            </div>
          </div>          
        </Fragment>
      )
    }
    
}

export default NewsDetailBackend;
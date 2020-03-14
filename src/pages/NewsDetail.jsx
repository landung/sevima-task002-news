import React, {Component, Fragment} from 'react';
import API from '../helpers/API';
import Moment from 'react-moment';
import BreadcrumComp from '../components/BreadcrumbComp';
class NewsDetail extends Component {
 
    state = {
        page: [
          {
            name: 'News',
          },
          {
            name: 'Detail',
            active: true
          }
        ],
        newsId: this.props.match.params.id,
        newsDetail: [],
        newsUser: [],
        errorMessage: ''
    }

    async getNewsDetail() {
      
      const newsId = this.state.newsId;

      try {
        const response = await API.get(`news/${newsId}`);
        this.setState({
          newsDetail: response.data
        })
      } catch (error) {
        this.setState({
          errorMessage: error.message
        })
      }
    }
  
    componentDidMount() {
        this.getNewsDetail();
    }
  
    render() {
      return (
        <Fragment>
          <BreadcrumComp page={this.state.page}/>
          <div className="blog-post">
              <h2 className="blog-post-title">{this.state.newsDetail.title}</h2>
              <p className="blog-post-meta"><Moment format="D MMM YYYY" withTitle>{this.state.newsDetail.created_at}</Moment>, by {this.state.newsUser.username}</p>
              <p className="content">
              <img src="http://placeimg.com/200/150/tech" className="rounded float-left p-3" alt="..." />
                {this.state.newsDetail.content}
              </p>
          </div>
        </Fragment>
        
      )
    }
    
}

export default NewsDetail;
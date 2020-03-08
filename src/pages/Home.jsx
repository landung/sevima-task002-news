import React, { Component, Fragment } from 'react';
import API from '../helpers/API';
import NewsListComp from '../components/NewsListComp';

class Home extends Component {

    state = {
        newsList: [],
    }
    
    getNews = () => API.get('news')
    .then(response => {
      this.setState({
        newsList: response.data
      })
    })
  
    componentDidMount() {
      this.getNews();
    }
    
    handleNewsDetail = () => {
      console.log(this.props);
    }
  
    render() {
      return (
        <Fragment>
          <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
          </nav>
            <hr />
            <div className="row mb-2">
            {
                this.state.newsList.map(newsList => {
                    return (
                        <NewsListComp 
                            key={newsList.id} 
                            data={newsList} 
                        />
                    //   <div key={newsList.id} className="news">
                    //     <p className="title"><Link to={`/news-detail/${newsList.id}`}>{newsList.title}</Link></p>
                    //     <p className="content">{newsList.content}</p>
                    //     <p> <Link to={`/news-detail/${newsList.id}`}>Detail</Link></p>
                    //     <hr />
                    //   </div>
                    )
                })
            }
            </div>
          </div>
        </Fragment>
      )
    }
}

export default Home;
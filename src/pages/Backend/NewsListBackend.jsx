import React, { Component, Fragment } from 'react';
import API from '../../helpers/API';
import NewsListBackendComp from '../../components/NewsListBackendComp';
import { Link } from 'react-router-dom';

class NewsList extends Component {

    state = {
      formNewsPost: {
        title: '',
        content: ''
      },
      getNewsByUser: [],
      isUpdate: false,
      message: ''
    }
  
    getNewsByUser = () => API.get('news-by-user')
    .then(response => {
      this.setState({
        getNewsByUser: response.data
      })
    })
    
    handleUpdate = (data) => {
      this.setState({
        formNewsPost: data,
        isUpdate: true
      })
    }
      
    handleRemove = (id) => {
      
      API.delete(`news/${id}`)
      .then((response) => {
        this.setState({
          message: response.message
        })
        this.getNewsByUser(); 
      }, (err) => {
        //console.log(err);
      })
    }
  
    componentDidMount() {
      this.getNewsByUser(); 
    }
  
    render() {
      return (
        <Fragment>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">News</li>
            </ol>
          </nav>
          <Link to="/news-post-backend" className="btn btn-success">Add</Link>
          <p>{this.state.message}</p>
          {
                this.state.getNewsByUser.map(getNewsByUser => {
                    return (
                      <Fragment key={getNewsByUser.id} >
                        <NewsListBackendComp 
                              key={getNewsByUser.id} 
                              data={getNewsByUser} 
                          />
                        <div>
                          <Link to={`/news-post-backend/${getNewsByUser.id}`} className="btn btn-warning">Edit</Link>
                          <button className="btn btn-danger" onClick={() => this.handleRemove(getNewsByUser.id)}>Remove</button>
                          <hr />
                        </div>
                        </Fragment>
                    )
                })
            }
        </Fragment>
      )
    }
}

export default NewsList;
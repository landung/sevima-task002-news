import React, { Component, Fragment } from 'react';
import API from '../../helpers/API';
import NewsListBackendComp from '../../components/NewsListBackendComp';
import { Link } from 'react-router-dom';
import BreadcrumComp from '../../components/BreadcrumbComp';

class NewsList extends Component {

    state = {
      page: [
        {
          name: 'News List',
          active: true
        }
      ],
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

    async deleteNews(id) {
      
      try {
        const response = await API.delete(`news/${id}`);
        this.setState({
          message: response.message
        })
      } catch (error) {
        this.setState({
          errorMessage: error.message
        })
      }
    }
      
    handleRemove = (id) => {
      this.deleteNews(id);
    }
  
    componentDidMount() {
      this.getNewsByUser(); 
    }
  
    render() {
      return (
        <Fragment>
          <BreadcrumComp page={this.state.page}/>
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
import React, { Component, Fragment } from 'react';
import API from '../helpers/API';
import NewsListComp from '../components/NewsListComp';
import BreadcrumComp from '../components/BreadcrumbComp';

class Home extends Component {

    state = {
        page: [
          {
            name: 'Home',
            active: true
          }
        ],
        newsList: [],
        errorMessage: ''
    }

    async getNews() {
      try {
        const response = await API.get('news');
        this.setState({
          newsList: response.data
        })
      } catch (error) {
        this.setState({
          errorMessage: error.message
        })
      }
    }
      
    componentDidMount() {
      this.getNews();
    }
      
    render() {     
      return (
        <Fragment>
          <div>
            <BreadcrumComp page={this.state.page}/>
            {this.state.errorMessage}
            <hr />
            <div className="row mb-2">
            {
                this.state.newsList.map(newsList => {
                    return (
                        <NewsListComp 
                            key={newsList.id} 
                            data={newsList} 
                        />
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
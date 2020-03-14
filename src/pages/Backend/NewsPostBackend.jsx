import React, {Component, Fragment} from 'react';
import API from '../../helpers/API';
import AlertComp from '../../components/AlertComp';

class NewsPostBackend extends Component {
 
    state = {
        newsId: this.props.match.params.id,
        formNewsPost: {
          title: '',
          content: ''
        },
        postError: false,
        postMessage: '',
        isUpdate: false
    }
    
    handleFormChange = (event) => {
      // copy object formNewsPost ke formNewsPostNew
      let formNewsPostNew = {...this.state.formNewsPost};
  
      // masukkan value ke object yang baru
      formNewsPostNew[event.target.name] = event.target.value;
      
      this.setState({
          formNewsPost: formNewsPostNew
      })
      
    }

    // method untuk mengosongkan form
    clearFormData = () => {
      this.setState({formNewsPost: {
          title: '',
          content: ''
        }
      });
    }

    async putNews(id, data) {
      try {
        const response = await API.put(`news/${id}`, data);
        const rsData = response.data;
        if(rsData.error){
          this.setState({
            postError: true,
            postMessage: rsData.message
          })
        }
        else{
          this.props.history.push(`/news-detail-backend/${id}`);
        }

      } catch (error) {
        this.setState({
          postError: true,
          postMessage: error.message
        })
      }
    }

    async postNews(data) {
      try {
        const response = await API.post(`news`, data);
        const rsData = response.data;
        const id = rsData.data.id;
        this.props.history.push(`/news-detail-backend/${id}`);
      } catch (error) {
        this.setState({
          postError: true,
          postMessage: error.message
        })
      }
    }

    handleSubmitNews = () => {
      const {id, title, content} = this.state.formNewsPost;
      
      if(title && content) {
  
        if(this.state.isUpdate) {
          let data = {title: title, content: content}
          this.putNews(id, data);
        }
        else {
          this.postNews(this.state.formNewsPost);
        }

      }

    }

    async getNewsDetail() {
      
      const newsId = this.state.newsId;
      
      try {
        const response = await API.get(`news/${newsId}`);
        this.setState({
          formNewsPost: response.data,
          isUpdate: true
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
      let alert;

      if(this.state.postMessage) {
        alert = <AlertComp data={this.state}/>
      }

      return (
        <Fragment>
          {alert}
          <form>
            <div className="form-group">            
              <label htmlFor="title">Title</label>
              <input className="form-control" type="text" name="title" value={this.state.formNewsPost.title} placeholder="add title" onChange={this.handleFormChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="content">News Content</label>
              <textarea className="form-control" name="content" id="content" value={this.state.formNewsPost.content} cols="30" rows="10" placeholder="add blog content" onChange={this.handleFormChange}/>
            </div>
            <button type="button" className="btn btn-success" onClick={this.handleSubmitNews}>Save</button>
          </form>
        </Fragment>
        
      )
    }
    
}

export default NewsPostBackend;
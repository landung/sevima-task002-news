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

    handleSubmitNews = () => {
      const {id, title, content} = this.state.formNewsPost;
      
      if(title && content) {
  
        if(this.state.isUpdate) {
          let data = {title: title, content: content}
  
          API.put(`news/${id}`, data)
          .then(() => {            
            this.props.history.push(`/news-detail-backend/${id}`);
          }, (error) => {
            this.setState({
              postError: true,
              postMessage: error
            })
          })
        }
        else {
          API.post('news', this.state.formNewsPost)
          .then((response) => {
            const id = response.data.data.id;
            this.props.history.push(`/news-detail-backend/${id}`);
          },
          (error) => {
            this.setState({
              postError: true,
              postMessage: error.response.statusText
            })
          })
        }

      }

    }

    componentDidMount() {

      let id = this.state.newsId;

      if(id) {
        API.get(`news/${id}`)
        .then((response) => {
          this.setState({
            formNewsPost: response.data
          });
        }, (error) => {

        })

        this.setState({
          isUpdate: true
        });
      }
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
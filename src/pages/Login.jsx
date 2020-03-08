import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RootContext } from '../App';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
  
    handleChangeText = (e) => {
      this.setState({
          [e.target.id]: e.target.value 
      })
    }
    
    render() {
      
      return (
        <RootContext.Consumer>
          {              
            value => {
            
              if(value.state.auth){
                return <Redirect to="/dashboard" />
              }
  
              return (
                <div>
                  <h1>Login</h1>
                  <hr />
                  <form>
                    <div className="form-group">
                      <input id="username" placeholder="Username" type="text" onChange={this.handleChangeText}/>
                    </div>
                    <div className="form-group">
                      <input id="password" placeholder="Password"  type="password"  onChange={this.handleChangeText}/>
                    </div>
                    <button className="btn btn-info" type="button" onClick={() => value.handleLogin(this.state)}>Login</button>
                  </form>
                  
                  <p>{value.state.apiResponse.message}</p>
                
                </div>
              )
            }
          }
        </RootContext.Consumer>
        
      )
    }
  
}

export default Login;
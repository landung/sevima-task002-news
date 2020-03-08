import React, { Component, createContext, Fragment } from 'react';
import logo from './logo.svg';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import NewsDetail from './pages/NewsDetail';
import Dashboard from './pages/Backend/Dashboard';
import NewsListBackend from './pages/Backend/NewsListBackend';
import sessionManager from './helpers/sessionManager';
import { userData } from '.';
import NewsDetailBackend from './pages/Backend/NewsDetailBackend';
import NewsPostBackend from './pages/Backend/NewsPostBackend';

//State Manajemen
export const RootContext = createContext();
const Provider = RootContext.Provider;

class App extends Component {

  state = {
    auth: false,
    apiResponse: {}
  }

  handleLogin = (data) => {
      const {username,password} = data;

      if(username && password) {
        axios.post('/login', data)
        .then((result) => {
          const rsData = result.data;

          if(rsData.error){
            this.setState({
              apiResponse: rsData
            });
          }
          else{
            
            sessionManager.setUserData(rsData);

            //set token header
            const token = 'Bearer ' + rsData.meta.token;
            axios.defaults.headers.common['Authorization'] = token;

            this.setState({
              auth: true
            })
          }
        }, (err) => {
          this.setState({
            apiResponse: {
              error: true,
              message: 'Network Error'
            }
          })
        })
      }
  }

  handleLogout = () => {
    sessionStorage.setItem("userData","");
    sessionStorage.clear();
    this.setState({
      auth: false
    })
  }

  componentDidMount() {

    if(userData != null){
      this.setState({
        auth: true
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Provider value={
          {
            state: this.state,
            handleLogin: this.handleLogin
          }
        }
        >   
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                  <img src={logo} width="30" height="30" alt="" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  {!this.state.auth ? (
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    </ul>
                    )
                    : (
                      <Fragment>
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/news-list-backend">News</Link>
                        </li>
                      </ul>
                      <form className="form-inline my-2 my-lg-0">
                        <button className="btn btn-info my-2 my-sm-0" onClick={this.handleLogout}>Logout</button>
                      </form>
                      </Fragment>
                    )
                  }
                </div>
            </nav>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/news-detail/:id" component={NewsDetail} />
              <Route path="/login" component={Login} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} auth={this.state.auth}/>
              <PrivateRoute path="/news-list-backend" component={NewsListBackend} auth={this.state.auth}/>
              <PrivateRoute path="/news-post-backend/:id" component={NewsPostBackend} auth={this.state.auth}/>
              <PrivateRoute path="/news-post-backend" component={NewsPostBackend} auth={this.state.auth}/>
              <PrivateRoute path="/news-detail-backend/:id" component={NewsDetailBackend} auth={this.state.auth}/>

              <Route exact component={NotFound} />
            
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
  
}

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  )
}

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route 
    {...rest}
    render={
      props => auth ?
      (<Component {...props} />)
      :(<Redirect to={{ pathname: "/" }} />)
    }
    />
  )
}

export default App;
import React, { Component, Fragment } from 'react';

class Dashboard extends Component { 
  
    render() {
      return (
        <Fragment>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </Fragment>
      )
    }
}

export default Dashboard;
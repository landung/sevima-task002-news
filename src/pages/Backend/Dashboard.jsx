import React, { Component, Fragment } from 'react';
import BreadcrumComp from '../../components/BreadcrumbComp';

class Dashboard extends Component { 
  state = {
    page: [
      {
        name: 'Dashboard',
        active: true
      }
    ]
}
    render() {
      return (
        <Fragment>
          <BreadcrumComp page={this.state.page}/>
        </Fragment>
      )
    }
}

export default Dashboard;
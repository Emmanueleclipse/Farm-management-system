import React, { Fragment } from 'react';
import Nav from './Nav/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Product from './Product/Product';
import Company from './Company/Company';
import Add from './Add/Add';
import Print from './Print/Print';
import { connect } from 'react-redux';
import Edit from './Edit/Edit';

const App = props => {
  return (
    <Fragment>
      {props.AuthReducer ?
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path='/edit/:id' component={Edit} />
            <Route path='/print/:id' component={Print} />
            <Route path='/product' component={Product} />
            <Route path='/company/:id' component={Company} />
            <Route path='/add' component={Add} />
            <Route e path='/' component={Home} />
          </Switch>
        </BrowserRouter>
        :
        <Login />}
    </Fragment>
  );
}
const mapStateToProps = (store) => {
  return {
    AuthReducer: store.AuthReducer
  }
}
export default connect(mapStateToProps)(App);

import React, { Fragment, Component } from 'react';
import './Nav.css';
import SideDrawer from './SideDrawer';
import AuthReducerAction from '../actions/AuthReducerAction';
import { connect } from 'react-redux';

class Nav extends Component {
    state = {
        sideDrawer: false
    }
    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('UBaidData'));
        const expiresIn = 3500 - (new Date().getTime() - token.time) / 1000;
        setTimeout(() => {
            localStorage.removeItem('UBaidData');
            this.props.dispatch(AuthReducerAction(false));
        }, expiresIn * 1000);
    }
    render() {
        return (
            <Fragment>
                <nav className='flex card'>
                    <div className='menu' onClick={() => { this.setState({ sideDrawer: true }) }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <h1>Core Center</h1>
                </nav> {this.state.sideDrawer && <SideDrawer clicked={() => { this.setState({ sideDrawer: false }) }} />}
                <div id='nav'></div>
            </Fragment>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        LinksReducer: store.LinksReducer
    }
}
export default connect(mapStateToProps)(Nav);
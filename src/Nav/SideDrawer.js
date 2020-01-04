import React, { useState } from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthReducerAction from '../actions/AuthReducerAction';

const SideDrawer = props => {
    const [classes, setClasses] = useState(false)
    const onLogout = () => {
        localStorage.removeItem('UBaidData');
        props.dispatch(AuthReducerAction(false));
    }
    const dropDown = () => {
        classes ? setClasses(false) : setClasses('open');
    }
    return (
        <div>
            <div className='blur' onClick={props.clicked}></div>
            <div className='SideDrawer card'>
                <Link to='/'>Home</Link>
                <Link to='/add'>Add Record</Link>
                <div className={'companies ' + classes} onClick={dropDown}>
                    <span>Companies <div></div></span>
                    {props.names.map((Company, index) =>
                        <Link to={'/company/' + Company.split(' ').join('')} key={index}>{Company}</Link>
                    )}
                </div>
                <div className='border'></div>
                <Link to='/' onClick={onLogout}>Logout</Link>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        names: store.LinksReducer
    }
}
export default connect(mapStateToProps)(SideDrawer);
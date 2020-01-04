import React, { useRef, useEffect, useState } from 'react';
import './Login.css'
import Input from '../UI/Input';
import { connect } from 'react-redux';
import AuthReducerAction from '../actions/AuthReducerAction';
import AllDataAction from '../actions/AllDataAction';
import LinksReducerAction from '../actions/LinksReducerAction';

const Login = props => {
    const username = useRef();
    const password = useRef();
    const [login, setLogin] = useState({
        isLogin: false,
        sms: ''
    });
    const submit = (event) => {
        event.preventDefault();
        setLogin({ isLogin: true, sms: '' });
        let option = {
            method: 'POST',
            body: JSON.stringify({
                email: username.current.value,
                password: password.current.value,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd4xYS1GygjlbJXS1T4b03L1RMODIohhc', option)
            .then(res => res.json())
            .then(res => {
                if (res.idToken) {
                    res.time = new Date().getTime();
                    localStorage.setItem('UBaidData', JSON.stringify(res));
                    getData(res.idToken);
                } else {
                    setLogin({ isLogin: false, sms: 'Username or Password is Invalid' })
                }
            })
            .catch(err => setLogin({isLogin: false, sms: 'Failed to connect to Internet'}))
    }
    const getData = (token) => {
        setLogin({ isLogin: true, sms: '' });
        fetch('https://core-center.firebaseio.com/allData.json?auth=' + token)
            .then(res => res.json())
            .then(res => {
                const allData = []
                const data = res.records;
                for (let key in data) {
                    data[key].id = key;
                    allData.unshift(data[key]);
                }
                const companies = [];
                for (let key in res.companies) {
                    companies.push(res.companies[key]);
                }
                props.dispatch(AllDataAction(allData));
                props.dispatch(LinksReducerAction(companies));
                props.dispatch(AuthReducerAction(token));
            })
            .catch(err => setLogin({
                isLogin: false,
                sms: 'Failed to connect to Internet'
            }))
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('UBaidData'))
        if (token) {
            const expiresIn = (new Date().getTime() - token.time)/1000;
            expiresIn < 3500 ? getData(token.idToken) : localStorage.removeItem('UBaidData');
        }
    }, [])
    return (
        <div className='Login flex'>
            {login.isLogin && <div id='loader'><div className='loader'></div></div>}
            <div className='card'>
                <h2>Please Login</h2>
                <form action='/dummy' onSubmit={submit}>
                    <Input type='text' label='Username' refe={username} />
                    <Input type='password' label='Password' refe={password} />
                    <p className='alert'>{login.sms}</p>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        AuthReducer: store.AuthReducer,
        allData: store.AllData,
        LinksReducer: store.LinksReducer
    }
}
export default connect(mapStateToProps)(Login);
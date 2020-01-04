import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import './Product.css';
import { Link } from 'react-router-dom';
import DeleteReducerAction from '../actions/DeleteReducerAction'

const Product = props => {
    const [alert, setAlert] = useState({
        sms: '',
        alert: false
    })
    const [approveSMS, setAprroveSMS] = useState(false);
    const [loader, setLoader] = useState(false)
    let index;
    const product = props.AllData.find((p, i) => {
        index = i;
        return p.id === props.location.hash.slice(1)
    })
    const sendData = (method, callBack) => {
        setLoader(true);
        const options = {
            method: method,
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('https://core-center.firebaseio.com/allData/records/' + product.id + '.json?auth=' + props.AuthReducer, options)
            .then(res => res.json())
            .then(res => callBack())
            .catch(err => console.log(err))
    }
    const check = () => {
        if (alert.sms === 'Are u sure you want to remove this record') {
            sendData('DELETE', deleteCallBack);
        } else {
            product.approved = "Yes";
            sendData('PUT', approvedCallBack);
        }
    }
    const recordAction = (message) => {
        setAlert({
            sms: message,
            alert: true
        });
        setLoader(false)
    }
    const approvedCallBack = () => {
        close();
        setAprroveSMS(true);
    }
    const deleteCallBack = () => {
        props.dispatch(DeleteReducerAction(index));
        props.history.push('/');
    }
    const close = () => {
        setAlert({
            sms: '',
            alert: false
        })
    }
    return (
        <Fragment>
            {product ? <div className='product container card'>
                {approveSMS && <div className='approveMessage green'>This record has been approved</div>}
                {alert.alert && <div id='loader'>
                    {loader ? <div className='loader'></div> : <div className='card alertBox'>
                        <h3>{alert.sms}</h3>
                        <button className='red' onClick={check}>Yes</button>
                        <button className='green' onClick={close}>No</button>
                    </div>}
                </div>}
                <b>Sr# {product.sr}</b>
                <h2>{product.company_name}</h2>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Make/Model</th>
                                <th>Year</th>
                                <th>Reg#</th>
                                <th>Engine#</th>
                                <th>Chassis#</th>
                                <th>Surveyor</th>
                                <th>Surveyor CO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.model}</td>
                                <td>{product.year}</td>
                                <td>{product.reg}</td>
                                <td>{product.enginno}</td>
                                <td>{product.chasesno}</td>
                                <td>{product.suveryor}</td>
                                <td>{product.surveyorCo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3>Parts Info</h3>
                <div className='partsTable table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Part Name or Number</th>
                                <th>Qty</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.parts.map((part, index) => (
                                <tr key={index}>
                                    <td>{part.name}</td>
                                    <td>{part.qty}</td>
                                    <td>{part.amount}</td>
                                </tr>
                            ))}
                            <tr>
                                <th colSpan='2'>Total</th>
                                <th>Rs. {product.amount}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link to={'/print/' + product.id} className='btn'>Print</Link>
                {product.approved === 'No' && <div className='btn green' onClick={() => { recordAction('Are you sure you want to approve this record') }}>Approve</div>}
                <Link to={'/edit/' + product.id} className='btn grey'>Edit</Link>
                <div className='btn red' onClick={() => { recordAction('Are u sure you want to remove this record') }}>Delete</div>
            </div> : props.history.push('/')}
        </Fragment>
    )
}

const mapStateToProps = (store) => {
    return {
        AllData: store.AllData,
        AuthReducer: store.AuthReducer
    }
}
export default connect(mapStateToProps)(Product);
import React, { Component } from 'react';
import './Add.css';
import Input from '../UI/Input';
import Select from '../UI/Select';
import { connect } from 'react-redux';
import InputA from '../UI/InputA';
import AddRecordAction from '../actions/AddRecordAction';
import LinkReducerAction from '../actions/LinkReducerAction';

class Add extends Component {
    state = {
        companyName: '',
        otherCo: false,
        parts: [],
        loader: false,
        alert: false
    }
    data = {
        model: '',
        year: '',
        reg: '',
        enginno: '',
        chasesno: '',
        suveryor: '',
        surveyorCo: ''
    }
    onSubmit = (event) => {
        event.preventDefault();
        for (let key in this.data) {
            if (this.data[key] === '' || this.state.companyName === '') {
                this.setState({ alert: true })
                return false;
            }
        }
        this.addParts();
    }
    prePareData = (data) => {
        return {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    render() {
        return (
            <div className='container card Add'>
                {this.state.loader && <div id='loader'><div className='loader'></div></div>}
                <h2>Add New Record</h2>
                {!this.state.parts[0] ?
                    <form action='/' onSubmit={this.onSubmit}>
                        {this.state.otherCo ? <Input label='Enter Company Name' k='company_name' blur={(data) => { this.onSelect(data, true) }} /> :
                            <Select label='Select a Company' label='' value={this.state.companyName}>
                                {this.props.LinksReducer.map(name => (
                                    <span key={name} onClick={() => { this.onSelect(name) }}>
                                        {name}
                                    </span>
                                ))}
                                <span onClick={() => { this.setState({ otherCo: true }) }}>
                                    Other Company
                                </span>
                            </Select>
                        }
                        <div className='formFlex'>
                            {Object.keys(this.data).map(
                                (key, i) =>
                                    <Input k={key} label={this.labels[i]} type='text' blur={this.onBlur} key={i} />)
                            }
                        </div>
                        {this.state.alert && <p className='alert'>Please Fill all Fields</p>}
                        <button>Submit</button>
                    </form> :
                    <form action='/' onSubmit={this.onSubmitParts}>
                        {this.state.parts.map((parts, i) => (
                            <div key={i} className='partsInfo'>
                                <Input
                                    type='text' label='Part Name/Number' className='PartName'
                                    blur={name => { this.AddToParts(name, 'name', i) }}
                                />
                                <Input
                                    type='text' label='Qty' className='PartQty'
                                    blur={qty => { this.AddToParts(qty, 'qty', i) }}
                                />
                                <InputA label='Amount' className='PartAmount'
                                    i={i}
                                    input={amount => { this.AddToParts(amount, 'amount', i) }}
                                    keyDown={this.addParts}
                                />
                            </div>
                        ))}
                        {localStorage.setItem('addIndex', this.state.parts.length - 1)}
                        <button type='button' className='AddMoreParts' onClick={this.addParts}>Add More Parts</button><button>Save Record</button>
                    </form>
                }
            </div>
        )
    }
    labels = ['Model', 'Year', 'Registration#', 'Engine#', 'Chassis#', 'Surveyor Name', 'Surveyor Company Name']
    onBlur = (event, key) => {
        this.data[key] = event;
    }
    onSelect = (name, otherCo = false) => {
        this.setState({ companyName: name, otherCo: otherCo })
    }
    parts = []
    addParts = () => {
        this.parts.push({
            name: '',
            qty: '',
            amount: '',
        });
        this.setState({ parts: this.parts });
    }
    onSubmitParts = (event) => {
        event.preventDefault();
        this.setState({ loader: true });
        let total = 0
        for (let data of this.parts) {
            total = total + +data.amount;
        }
        const date = new Date();
        this.data.company_name = this.state.companyName;
        this.data.time = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        this.data.parts = this.parts;
        this.data.amount = total;
        this.data.approved = 'No';
        const token = this.props.AuthReducer;
        this.data.sr = 1;
        if (this.state.otherCo) {
            fetch('https://core-center.firebaseio.com/allData/companies.json?auth=' + token, this.prePareData(this.state.companyName))
                .then(res => res.json())
                .then(res => this.props.dispatch(LinkReducerAction(this.data.company_name)))
                .catch(err => console.log(err))
        } else {
            for (let record of this.props.AllData) {
                if (record.company_name === this.state.companyName) {
                    this.data.sr = record.sr + 1;
                    break;
                }
            }
        }
        fetch('https://core-center.firebaseio.com/allData/records/.json?auth=' + token, this.prePareData(this.data))
            .then(res => res.json())
            .then(res => {
                this.data.id = res.name;
                this.props.dispatch(AddRecordAction(this.data));
                this.props.history.push('/print/' + this.data.id);
            })
            .catch(err => console.log(err))
    }
    AddToParts = (data, key, i) => {
        this.parts[i][key] = data;
    }
}
const maptStateToProps = (store) => {
    return {
        LinksReducer: store.LinksReducer,
        AllData: store.AllData,
        AuthReducer: store.AuthReducer
    }
}
export default connect(maptStateToProps)(Add);
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InputE from '../UI/InputE';
import InputEA from '../UI/InputEA';
import UpdateReducerAction from '../actions/UpdateReducerAction';

class Edit extends Component {
    state = {
        product: undefined,
        alert: false,
        showParts: false,
        loader: false
    }
    onPartsChange = (event, key, index) => {
        const product = this.state.product;
        product.parts[index][key] = event.target.value;
        this.setState({ product: product });
    }
    onAddParts = () => {
        const product = this.state.product;
        product.parts.push({
            name: '',
            qty: '',
            amount: '',
        })
        this.setState({ product: product })
    }
    onSubmitPartsData = (event) => {
        event.preventDefault();
        const product = this.state.product
        let total = 0;
        for (let amount of product.parts) {
            total = +amount.amount + total;
        }
        this.setState({loader: true})
        product.amount = total;
        const options = {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('https://core-center.firebaseio.com/allData/records/' + product.id + '.json?auth=' + this.props.AuthReducer, options)
            .then(res => res.json())
            .then(res => {
                this.props.dispatch(UpdateReducerAction(product));
                this.props.history.push('/print/' + product.id);
                
            })
            .catch(err => console.log(err))
    }
    render() {
        const product = this.state.product
        return (
            <Fragment>
                {this.state.product &&
                    <div className='container card Add'>
                        {this.state.loader && <div id='loader'><div className='loader'></div></div>}
                        <h2>{product.company_name}</h2>
                        {!this.state.showParts ?
                            <form action='/' onSubmit={this.onSubmitCarsInfo}>
                                <div className='formFlex'>
                                    {this.keys.map((key, index) => <InputE
                                        key={index}
                                        label={this.labels[index]}
                                        name={product[this.keys[index]]}
                                        change={this.getDataFromInput}
                                        ki={key}
                                    />)}
                                </div>
                                {this.state.alert && <div className='alert'>Pleas fill all the fields </div>}
                                <button>Submit</button>
                            </form> :
                            <form action='/ubaid' onSubmit={this.onSubmitPartsData}>
                                {this.state.product.parts.map((part, index) => (
                                    <div className='partsInfo' key={index}>
                                        <InputEA
                                            label='Part Name or Number'
                                            name={part.name}
                                            className='PartName'
                                            ki='name'
                                            change={this.onPartsChange}
                                            index={index}
                                        />
                                        <InputEA
                                            label='Qty'
                                            name={part.qty}
                                            className='PartQty'
                                            ki='qty'
                                            change={this.onPartsChange}
                                            index={index}
                                        />
                                        <InputEA
                                            label='Amount'
                                            name={part.amount}
                                            className='PartAmount'
                                            ki='amount'
                                            change={this.onPartsChange}
                                            index={index}
                                            keyDown={this.onAddParts}
                                        />
                                    </div>
                                ))}
                                {localStorage.setItem('partIndex', product.parts.length - 1)}
                                <button>Save Record</button>
                                <div className='green btn' onClick={this.onAddParts}>Add More Parts</div>
                            </form>
                        }
                    </div>
                }
            </Fragment>
        )
    }
    index = 0;
    componentDidMount() {
        const product = this.props.AllData.find((pro, index) => {
            this.index = index;
            return pro.id === this.props.match.params.id
        });
        this.setState({ product: product });
    }
    getDataFromInput = (event, key) => {
        const product = this.state.product;
        product[key] = event.target.value;
        this.setState({ product: product });
    }
    onSubmitCarsInfo = (event) => {
        event.preventDefault();
        for (let key of this.keys) {
            if (this.state.product[key] === '') {
                this.setState({ alert: true })
                return false;
            }
        }
        this.setState({ showParts: true });
    }
    keys = ['model', 'year', 'reg', 'enginno', 'chasesno', 'suveryor', 'surveyorCo']
    labels = ['Model', 'Year', 'Registration#', 'Engine#', 'Chassis#', 'Surveyor Name', 'Surveyor Company']
}

const mapStateToProps = store => {
    return {
        AllData: store.AllData,
        AuthReducer: store.AuthReducer,
    }
}

export default connect(mapStateToProps)(Edit);
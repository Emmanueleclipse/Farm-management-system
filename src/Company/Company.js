import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

class Company extends Component {
    getRecords() {
        let records = []
        let params = this.props.match.params.id;
        for (let record of this.props.AllData) {
            record.company_name.split(' ').join('') === params && records.push(record);
        }
        if (records[0]) {
            return (
                <div className='container card home'>
                    <h2>{records[0].company_name}</h2>
                    <div className='table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr#</th>
                                    <th>Model</th>
                                    <th>Reg#</th>
                                    <th>Surveyor</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Cleared</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map(record =>
                                    <tr key={record.id} onClick={() => { this.props.history.push('/product#' + record.id) }}>
                                        <td>{record.sr}</td>
                                        <td>{record.model + ' ' + record.year}</td>
                                        <td>{record.reg}</td>
                                        <td>{record.suveryor}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.time}</td>
                                        <td>{record.approved}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <Fragment>
                {this.getRecords()}
            </Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        AllData: store.AllData
    }
}
export default connect(mapStateToProps)(Company);
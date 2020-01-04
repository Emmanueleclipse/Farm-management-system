import React from 'react';
import { connect } from 'react-redux';
import './Home.css';

const Home = props => {
    return (
        <div className='container card home'>
            <h2>All Records</h2>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Company Name</th>
                            <th>Model</th>
                            <th>Reg#</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Cleared</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.AllData.map(record => (
                            <tr key={record.id} onClick={() => { props.history.push('/product#' + record.id) }}>
                                <td>{record.sr}</td>
                                <td>{record.company_name}</td>
                                <td>{record.model + ' ' + record.year}</td>
                                <td>{record.reg}</td>
                                <td>{record.amount}</td>
                                <td>{record.time}</td>
                                <td>{record.approved}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
const mapStateToProps = (store) => {
    return {
        AllData: store.AllData
    }
}
export default connect(mapStateToProps)(Home);
import React, { useEffect, Fragment } from 'react';
import './Print.css';
import { connect } from 'react-redux';

const Print = props => {
    const product = props.AllData.find(p => p.id === props.match.params.id)
    useEffect(() => {
        if (product) {
            document.title = product.sr + '. ' + product.company_name + ' ' + product.time.split('/').join('_');
            window.print()
        }
    }, [])
    return (
        <Fragment>
            {product ? <div className='Print'>
                <div id='invoice'>Sr.# {product.sr}</div>
                <h1>Core Center</h1>
                <div>
                    Shoaib Bilal Market, near General Bus Stand
                    <p>Faisalabad</p>
                    <p><b>Cell#</b> 0321-7575111</p>
                    <p><b>NTN#</b> 2502497-3</p>
                </div>
                <div className="companyNa">
                    <b>Insurance Company:</b>
                    <h3 id="companyNa">{product.company_name}</h3>
                </div>
                <h3>Vehicle & Serveyor Information</h3>
                <div className='table'>
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>Make/Model</th>
                                <th>Year</th>
                                <th>Reg#</th>
                                <th>Engine#</th>
                                <th>Chassis</th>
                                <th>Surveyor Name</th>
                                <th>Surveyor Co</th>
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
                <h3>Parts Information</h3>
                <div>
                    <table border='1'>
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
                <footer>
                    <div id="date"><b>Date: {product.time}</b></div>
                    <div className=''><b>Stemp & Signature: </b> <div className="sign"></div> </div>
                </footer>
            </div> : props.history.push('/')}
        </Fragment>
    )
}

const mapStateToProps = (store) => {
    return {
        AllData: store.AllData
    }
}
export default connect(mapStateToProps)(Print);
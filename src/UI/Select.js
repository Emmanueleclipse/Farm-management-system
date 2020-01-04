import React, { Fragment, useState } from 'react';
import './Select.css';

const Select = props => {
    const [className, setClassName] = useState('Select')
    let label;
    props.label === '' ? label = 'Select a Company' : label = props.label;
    const dropMenuHandler = () => {
        setClassName('Select selectOpen selectFocused')
    }
    const onSelect = () => {
        setClassName('Select selectOpen')
    }
    return (
        <Fragment>
            <div className={className} onClick={dropMenuHandler}>
                <label>{label}</label>
                {props.value}
                <span></span>
            </div>
            {className !== 'Select' && className !== 'Select selectOpen' &&
                <div className='selectFooter'>
                    <div className='dropMenu' onClick={onSelect}>
                        {props.children}
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Select;
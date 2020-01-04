import React, { useState } from 'react';
import './Input.css';

const InputA = props => {
    const [className, setClassName] = useState('');
    const onBlur = (event) => {
        event.target.value === '' ? setClassName('') : setClassName('inputBlur');
    }
    const onFocus = () => {
        setClassName('inputFocus');
    }
    const onInput = (event) => {
        props.input(event.target.value);
    }
    const onKeyDown = (event) => {
        const i = +localStorage.getItem('addIndex');
        if (props.i === i && event.keyCode === 9) {
            props.keyDown()
        }
    }
    return (
        <label className={props.className + ' input-field ' + className}>
            <p>{props.label}</p>
            <input type={props.type}
                onFocus={onFocus}
                onInput={onInput}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
        </label>
    )
}

export default InputA;
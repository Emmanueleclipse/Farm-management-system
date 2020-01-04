import React, { useState, useEffect } from 'react';

const Input = props => {
    const [className, setClassName] = useState('');
    const onBlur = (event) => {
        event.target.value === '' ? setClassName('') : setClassName('inputBlur');
    }
    const onInput = (event) => {
        props.blur && props.blur(event.target.value, props.k)
    }
    return (
        <label className={props.className + ' input-field ' + className}>
            <p>{props.label}</p>
            <input type={props.type}
                onFocus={() => { setClassName('inputFocus') }}
                onBlur={onBlur}
                onInput={onInput}
                ref={props.refe}
            />
        </label>
    )
}

export default Input;
import React, { Component } from 'react';

class InputEA extends Component {
    state = {
        className: 'inputBlur',
        check: true
    }
    onChange = (event) => {
        this.props.change(event, this.props.ki, this.props.index)
    }
    render() {
        return (
            <label className={this.props.className + ' input-field ' + this.state.className}>
                {<p>{this.props.label}</p>}
                <input type='text' value={this.props.name}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    ref='input'
                    onKeyDown={this.onKeyDown}
                />
            </label>
        )
    }
    onFocus = () => {
        this.setState({ className: 'inputFocus' });
    }
    onBlur = (event) => {
        event.target.value !== '' ? this.setState({ className: 'inputBlur' }) : this.setState({ className: '' })
    }
    onKeyDown = (event) => {
        const index = +localStorage.getItem('partIndex');
        if (this.props.keyDown && index === this.props.index && event.keyCode === 9) {
            this.props.keyDown(event);
        }
    }
    componentDidMount() {
        this.props.name === '' && this.setState({ className: '' });
    }
}

export default InputEA;
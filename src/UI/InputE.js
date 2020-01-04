import React, { Component } from 'react';

class InputE extends Component {
    state = {
        className: 'inputBlur'
    }
    onChange = (event) => {
        this.props.change(event, this.props.ki)
    }
    render() {
        return (
            <label className={'input-field ' + this.state.className}>
                {<p>{this.props.label}</p>}
                <input type='text' value={this.props.name}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
            </label>
        )
    }
    onFocus = () => {
        this.setState({ className: 'inputFocus' })
    }
    onBlur = (event) => {
        event.target.value !== '' ? this.setState({ className: 'inputBlur' }) : this.setState({ className: '' })
    }
}

export default InputE;
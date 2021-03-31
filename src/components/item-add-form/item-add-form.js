import React, { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {

    state = {
        label: ""
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAdded( this.state.label );
        this.setState({
            label: ""
        })
    }

    render() {
        const { label } = this.state;

        return (
            <form 
                className="item-add-form"
                onSubmit={ this.onSubmit }
                >
                <input 
                    type="text"
                    className="form-control"
                    onChange={ this.onLabelChange }
                    placeholder="New task"
                    value={ label }
                    ></input>
                <button 
                    className="btn btn-info"
                >
                    Add Task
                </button>
            </form>
        );
    };
};
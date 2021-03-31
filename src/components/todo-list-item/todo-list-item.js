import React, { Component } from "react";
import "./todo-list-item.css"

export default class ToDoListItem extends Component {

    render() {
        const { 
            label, 
            done, 
            important, 
            onDeleted, 
            onToggleImportant, 
            onToggleDone 
        } = this.props;

        let classNames = "todo-list-item";
        if (done) {
            classNames += " done";
        }

        if (important) {
            classNames += " important";
        }

        return (
            <div className={ classNames }>
                <span 
                    className="todo-list-item-label"
                    onClick={ onToggleDone }>
                    { label }
                </span>
    
                <div>
                    <button 
                        className="btn btn-outline-success btn-sm"
                        onClick={ onToggleImportant }
                        >
                        <i className="fa fa-exclamation"/>
                    </button>
    
                    <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={ onDeleted }>
                        <i className="fas fa-minus"/>
                    </button>
                </div>
            </div>
        );
    };
};
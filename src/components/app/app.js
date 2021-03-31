import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ToDoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {

  newItemId = 1;

  state = {
    todoData: [
      this.createItem("Do smth"),
      this.createItem("???"),
      this.createItem("Profit!")
    ],
    term: "",
    filter: "all" // all, active, done    
  }

  createItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.newItemId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => item.id !== id);
      return {
        todoData: newTodoData
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData
      }
    });

  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)
    ];
  } 

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = this.toggleProperty(todoData, id, "important");

      return {
        todoData: newTodoData
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = this.toggleProperty(todoData, id, "done");

      return {
        todoData: newTodoData
      }
    })
  }

  search(items, term) {

    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => item.label
      .toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  filter(items, filter) {
    switch(filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const countDone = todoData.filter((el) => el.done).length;
    const countToDo = todoData.length - countDone;

    return (
      <div className="todo-app">
        <AppHeader toDo={countToDo} done={countDone}/>
        <div className="top-panel d-flex">
          <SearchPanel  
            onSearchChange={ this.onSearchChange }
          />
          <ItemStatusFilter
            filter={ filter }
            onFilterChange={ this.onFilterChange }
          />
        </div>
  
        <ToDoList 
          todoItems = { visibleItems }
          onDeleted = { this.deleteItem }
          onToggleImportant = { this.onToggleImportant }
          onToggleDone = { this.onToggleDone }
        />

        <ItemAddForm 
          onAdded = { this.addItem }
        />
      </div>
    );
  }
}
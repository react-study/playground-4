import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.isEditing && !prevProps.isEditing) {
      this.inputElem.value = this.props.text;
      this.inputElem.focus();
    }
  }

  handleKeyDown(e){
    // 엔터를 눌렀을 때, 텍스트 내용이 있을 때 
    const text = e.target.value;
    if( !text || e.keyCode !== 13 ) return;
    this.props.saveTodo(text);
    e.target.value='';
  }

  render(){
    const {
      text,
      isDone,
      isEditing,
      deleteTodo,
      editTodo,
      cancelEdit,
      saveTodo,
      toggleTodo
    } = this.props;

    return (
      <li className={ClassNames(
        'todo-item',
        {
            editing: isEditing,
            completed: isDone
        }
      )}>
        <div className="toggle" 
            onClick={toggleTodo}
        />
        <div className="todo-item__view">
          <div 
            className="todo-item__view__text"
            onDoubleClick={editTodo}
          >
            {text}
          </div>
          <button 
            className="todo-item__destroy" 
            onClick = {deleteTodo}
          />
        </div>
        <input
          type="text"
          ref={ref => this.inputElem = ref}
          className="todo-item__edit"
          onBlur={cancelEdit}
          onKeyDown={e => this.handleKeyDown(e)}
        />
      </li>
    );
  }
}

export default Todo;
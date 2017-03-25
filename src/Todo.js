import React from "react";

class Todo extends React.Component {


    componentDidUpdate(prevProps) {
        if (this.props.isEditing && !prevProps.isEditing) {
            this.inputElem.value = this.props.text;
            this.inputElem.focus();
        }
    }

    handleKeyDown(e) {
        const text = e.target.value;
        if (!text || e.keyCode !== 13) return;

        this.props.saveTodo(text);
        e.target.value = "";
    }

    render() {
        const {
            text,
            isEditing,
            deleteTodo,
            editTodo,
            cancelEdit,
            saveTodo
        } = this.props;

        return (
            <li className={
                [
                    "todo-item",
                    isEditing ? " editing" : ""
                ].join("") // 배열을 문자열로 합치기
            }>
                <div className="toggle"></div>
                <div className="todo-item__view">
                    <div
                        className="todo-item__view__text"
                        onDoubleClick={editTodo}
                    >
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
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
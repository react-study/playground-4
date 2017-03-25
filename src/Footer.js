import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
            <span className="todo-count">
                <strong>0</strong>{' '}
                <span>items</span>{' '}
                left
            </span>
                <ul className="todo-filters">
                    <li>
                        <a>All</a>
                    </li>
                    <li>
                        <a>Active</a>
                    </li>
                    <li>
                        <a>Completed</a>
                    </li>
                </ul>
                <button
                    className="todo-delete-completed"
                    onClick={this.props.deleteCompleted}
                >
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;
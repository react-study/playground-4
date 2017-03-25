import React from 'react';
import ClassNames from 'classnames';

class Footer extends React.Component {
    render() {
        const {
            filterName,
            activeLength,
            selectFilter,
            deleteCompleted
        } = this.props;

        const filters = ['All', 'Active', 'Completed'];

        return (
            <div className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>{' '}
                    <span>item{activeLength === 1 ? '' : 's'}</span>{' '}
                    left
                </span>
                <ul className="todo-filters">
                    {filters.map(f => (
                        <li key={`filter_${f}`}>
                            <a
                                className={ClassNames({
                                    selected: f === filterName
                                })}
                                onClick={() => selectFilter(f)}
                            >{f}</a>
                        </li>
                    ))}
                </ul>
                <button className="todo-delete-completed" onClick={deleteCompleted}>
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;

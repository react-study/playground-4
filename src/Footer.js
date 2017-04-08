import React from 'react';
import ClassNames from 'classnames';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
  render() {
    const {
      filterName,
      activeLength,
      deleteCompleted
    } = this.props;
    const filter = ['', 'active', 'completed'];
    return (
      <div className="footer">
        <span className="todo-count">
          <strong>{activeLength}</strong>{' '}
          <span>item{activeLength === 1 ? '' : 's'}</span>{' '}
          left
        </span>
        <ul className="todo-filters">
          {
            filter.map(f => (
              <li key={`filter_${f}`}>
                <Link
                  className={ClassNames({
                    selected: f === filterName
                  })}
                  to={`/${f}`}
                >
                  {f ? f.replace(/^\w/, v => v.toUpperCase()) : 'All'}
              </Link>
              </li>
            ))
          }
        </ul>
        <button
          className="todo-delete-completed"
          onClick={deleteCompleted}
        >
          Clear Completed
        </button>
      </div>
    );
  }
}

export default Footer;

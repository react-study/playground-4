import React from 'react';

class Book extends React.Component {

    render() {
        const {
            deposit,
            withdraw,
            total
        } = this.props;

        return (
            <tr>
                <td>{deposit}</td>
                <td>{withdraw}</td>
                <td>{total}</td>
            </tr>
        );
    }
}

export default Book;

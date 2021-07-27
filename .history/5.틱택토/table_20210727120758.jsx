const React = require('react');
const Tr = require('./tr');
const Table = ({onClickS}) => {
    return (
        <table onClick = {onClickS}>
            <Tr>{''}</Tr>
        </table>
    );
};

module.exports = Table;
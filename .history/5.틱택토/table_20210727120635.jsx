const React = require('react');
const Tr = require('./tr');
const Table = ({onClick}) => {
    return (
        <table onClick = {onClick}>
            <Tr>{''}</Tr>
        </table>
    );
};

module.exports = Table;
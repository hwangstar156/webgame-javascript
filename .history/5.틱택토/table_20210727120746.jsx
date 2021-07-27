const React = require('react');
const Tr = require('./tr');
const Table = ({onClickSS}) => {
    return (
        <table onClick = {onClickSS}>
            <Tr>{''}</Tr>
        </table>
    );
};

module.exports = Table;
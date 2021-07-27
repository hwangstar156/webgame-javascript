const React = require('react');
const Tr = require('./tr');
const Table = ({onClickTable}) => {
    return (
        <table onClick = {onClickTable}>
            <Tr>{''}</Tr>
        </table>
    );
};

module.exports = Table;
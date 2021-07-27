const React = require('react');
const Td = require('./td');

const Tr = (rowData) => {
    return (
        console.log(rowData);
        <tr>
            <Td>{''}</Td>
        </tr>
    );
};

module.exports = Tr;
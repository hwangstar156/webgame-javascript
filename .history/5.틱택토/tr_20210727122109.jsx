const React = require('react');
const Td = require('./td');

const Tr = (rowData) => {
    console.dir(rowData);
    return (
        <tr>
            {Array(rowData.length)}
        </tr>
    );
};

module.exports = Tr;
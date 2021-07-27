const React = require('react');
const Td = require('./td');

const Tr = ({rowData,rowIndex}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td,i) => (<Td cellIndex={i}>{''}</Td>))}
        </tr>
    );
};

module.exports = Tr;
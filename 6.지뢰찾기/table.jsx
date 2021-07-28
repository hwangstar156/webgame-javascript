import React,{memo, useContext} from 'react';
import { TableContext } from './Minesearch';
import Tr from './tr';
const Table = memo(() => {
    const {tableData} = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr,i)=> <Tr rowIndex={i} key={i}/>)}
        </table>
    )
});

export default Table;
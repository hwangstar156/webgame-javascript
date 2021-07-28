import React,{useContext} from 'react';
import { TableContext } from './Minesearch';
import Tr from './tr';
const Table = () => {
    const {tableData} = useContext(TableContext);
    return (
        <table>
            {Array(tableData.length).fill().map((tr,i)=> <Tr rowIndex={i} key={i}/>)}
        </table>
    )
}

export default Table;
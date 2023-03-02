import React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box} from '@mui/material';

const MyDataGrid= ({rows,columns,rowsPerPageOptions,setSelectedStudents,setDataGridData,getStudentList})=> {



    
  return (
<Box sx={{pb:2, height: 400,width: '100%'}}>
    <DataGrid
        rows={rows} 
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection
        onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            console.log(ids)
            const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id)
            );
            setSelectedStudents(selectedRowData)
        }}
    />
</Box>
  )
}

export default MyDataGrid;
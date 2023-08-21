import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'isbn', headerName: 'ISBN Number', flex: 1},
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1},
  { field: 'pages', headerName: 'No of Pages', flex: 1},
  { field: 'year', headerName: 'Year', flex: 1},
]


function DataTable(props) {
  return (
    <>
        <div className={"container mx-10 my-5 flex flex-col"}
          style={{ height: 500, width: '100%' }}
          >
            <h2 className="flex p-3 bg-slate-300 justify-items-center items-center h-auto w-auto  my-2 rounded">My Books</h2>
            <DataGrid 
              autoHeight
              rows={props.myBooks} 
              columns={columns}  
              checkboxSelection={true}
              getRowId={(row) => row.isbn}
              onRowSelectionModelChange={ (item) => {
                props.setSelectionModel(item);
              }
              }
            />
        </div>
    </>
  )
}

export default DataTable;

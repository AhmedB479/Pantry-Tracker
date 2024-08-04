'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { getDatabase } from "firebase/database";
import { collection, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import Button from '@mui/material/Button'

async function fetchData() {
  const querySnapshot = await getDocs(collection(firestore,'pantry'))
  const rows =[];
  querySnapshot.forEach((doc) =>{
    const data = doc.data();
    rows.push({
      id:doc.id,
      item_id:data.item_id,
      item_name:data.item_name,
      category:data.category,
      units:data.units,
      Date_added:data.Date_added?.toDate(),
      Expiration_Date:data.Expiration_Date?.toDate(),
    });
  });
  return rows;
}

export default function DataGridUsed() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function loadRows() {
      const fetchedRows = await fetchData();
      setRows(fetchedRows);
    }

    loadRows();
  }, []);
  
  const columns = [
    {field:'item_id',headerName:'Item ID',width: 90},
    {field:'item_name',headerName:'Item Name',width: 150},
    {field:'category',headerName:'Category',editable: true},
    {field:'units',headerName:'Units',width:110,editable: true},
    { field: 'Date_added', headerName: 'Date Added', width: 160, editable: true, type: 'date' },
    { field: 'Expiration_Date', headerName: 'Expiration Date', width: 160, editable: true, type: 'date' },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <Button variant='contained' color='secondary' onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    }
    ];

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore,'pantry',id));
    setRows((prevRows) => prevRows.filter((row) => row.id != id));
  };
  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Box sx={{ height: 400, width: '80%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

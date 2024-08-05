'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { getDatabase } from "firebase/database";
import { getFirestore,collection, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { firestore } from '@/firebase';
import Button from '@mui/material/Button'
import { Timestamp } from 'firebase/firestore';

async function fetchData() {
  const parentDocRef = doc(firestore, 'pantry', 'vY4PwrxLzVjI9caFi2tA');
  const subcollectionRef = collection(parentDocRef, 'Pantry Item');
  const querySnapshot = await getDocs(subcollectionRef);
  const rows = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    rows.push({
      id: doc.id, // Ensure there's an 'id' field for DataGrid
      item_id: data.item_id,
      item_name: data.item_name,
      category: data.category,
      units: data.units,
      Date_added: data.Date_added ? data.Date_added.toDate() : null,
      Expiration_Date: data.Expiration_Date ? data.Expiration_Date.toDate() : null,
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
    {field:'category',headerName:'Category',editable: false},
    {field:'units',headerName:'Units',width:110,editable: false},
    {field: 'Date_added', headerName: 'Date Added', width: 160, editable: false, type: 'date' },
    {field: 'Expiration_Date', headerName: 'Expiration Date', width: 160, editable: false, type: 'date' },
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
      const db = getFirestore();
      
      try {
        // Reference to the specific document to be deleted
        const docRef = doc(db, 'pantry/vY4PwrxLzVjI9caFi2tA/Pantry Item', id);
    
        // Delete the document
        await deleteDoc(docRef);
    
        // Update the state to remove the deleted row
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    
        console.log("Document successfully deleted");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
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

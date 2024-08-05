"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { getFirestore, collection, addDoc, updateDoc, doc  } from 'firebase/firestore';
import { firestore } from '@/firebase';
const Add = () => {
  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("");
  const [Date_added, setDateAdded] = useState("");
  const [Expiration_Date, setExpirationDate] = useState("");
  const db = firestore;

  const addData = async (item_id, item_name, category, units, Date_added, Expiration_Date) => {
    const db = getFirestore();
  
    // Convert date strings to Date objects if not null
    const formatDate = (date) => {
      return date ? new Date(date) : null;
    };
    const currentTime = new Date();
    // Prepare data with validation and default values
    const data = {
      item_id: item_id || "",
      item_name: item_name || "",
      category: category || "",
      units: units || "",
      Date_added: formatDate(currentTime),
      Expiration_Date: formatDate(Expiration_Date),
    };
  
    try {
      // Reference to the 'Pantry Item' collection
      const docRef = collection(db, "pantry", "vY4PwrxLzVjI9caFi2tA", "Pantry Item");
      // Add a new document to the 'Pantry Item' collection
      const newDocRef = await addDoc(docRef, data);
      await updateDoc(newDocRef, { item_id: newDocRef.id });
      console.log("Document written with ID: ", newDocRef.id);
      return true;
    } catch (error) {
      console.log("Error adding document: ", error);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields to ensure no undefined or null values are passed
    const item_id = ""; // Default or provide value if available
    const add = await addData(item_id, item_name, category, units, Date_added, Expiration_Date);
    
    if (add) {
      // Clear form fields after successful submission
      setItemName("");
      setCategory("");
      setUnits("");
      setDateAdded("");
      setExpirationDate(""); // Don't forget to reset this field
  
      alert("Data added successfully to DB");
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        width: '100%',
        padding: 2,
        margin: '2vh',
      }}
    >
      <TextField
        id="item-name"
        label="Item name"
        variant="outlined"
        value={item_name}
        onChange={(e) => setItemName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />


<FormControl variant="outlined" sx={{ marginBottom: 2, marginLeft: '2vh', width:'20vh' }}>
  <InputLabel id="category-label">Category</InputLabel>
  <Select
    labelId="category-label"
    id="category"
    label="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <MenuItem value={"grains_and_cereals"}>Grains and Cereals</MenuItem>
    <MenuItem value={"canned_goods"}>Canned Goods</MenuItem>
    <MenuItem value={"spices_and_seasonings"}>Spices and Seasonings</MenuItem>
    <MenuItem value={"baking_supplies"}>Baking Supplies</MenuItem>
    <MenuItem value={"condiments_and_sauces"}>Condiments and Sauces</MenuItem>
    <MenuItem value={"oils_and_vinegars"}>Oils and Vinegars</MenuItem>
    <MenuItem value={"snacks"}>Snacks</MenuItem>
    <MenuItem value={"dried_goods"}>Dried Goods</MenuItem>
    <MenuItem value={"beverages"}>Beverages</MenuItem>
    <MenuItem value={"breakfast_items"}>Breakfast Items</MenuItem>
    <MenuItem value={"prepared_foods"}>Prepared Foods</MenuItem>
    <MenuItem value={"baking_mixes"}>Baking Mixes</MenuItem>
    <MenuItem value={"sweeteners"}>Sweeteners</MenuItem>
    <MenuItem value={"dairy_alternatives"}>Dairy Alternatives</MenuItem>
    <MenuItem value={"miscellaneous"}>Miscellaneous</MenuItem>
  </Select>
</FormControl>

      <TextField
        id="units"
        label="Units of item"
        variant="outlined"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
        sx={{ marginBottom: 2, marginLeft: '2vh' }}
      />
      <TextField
        id="expiration"
        label="Expiration Date"
        variant="outlined"
        type='date'
        value={Expiration_Date}
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input
        }}
        onChange={(e) => setExpirationDate(e.target.value)}
        sx={{ marginBottom: 2, marginLeft: '2vh' }}
      />
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginBottom: 2, marginLeft: '2vh' }}
        type='submit'
      >
        Add
      </Button>
    </Box>
  );
};
export default Add;
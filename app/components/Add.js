import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


export default function Add() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        width: '100%',
        padding: 2
      }}
    >
      <TextField
        id="outlined-basic"
        label="Enter Data"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="outlined-basic"
        label="Enter Data"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="secondary"
        sx={{ padding: '2vh' }}
      >
        Add
      </Button>
    </Box>
  );
}
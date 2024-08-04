import Image from "next/image";
import React from "react";
import Table from "./components/table.js";
import Add from "./components/add.js";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
    <Add />
    <Table />
    </Box>
  );
}

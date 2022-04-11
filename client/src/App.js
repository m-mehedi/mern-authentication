import React from "react";
import Layout from "./core/Layout";
import Box from '@mui/material/Box';

const App = () => {
  return (
    <Layout>
      <Box sx={{ p:2 }} m="auto" alignItems="center"
        justifyContent="center" >
      <h1 className="text-center">DASHBOARD</h1>
      </Box>
      
    </Layout>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import Products from './components'
import { Stack } from '@mui/system';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
function App() {
  return (
    <Stack>
    <Products/>
  </Stack>
  );
}

export default App;

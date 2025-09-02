// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Asap', sans-serif",
  },
  palette: {
    primary: {
      main: "#00AEEF", // azul aero
    },
    secondary: {
      main: "#C7F464", // verde-limão
    },
  },
});

export default theme;

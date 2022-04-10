import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: teal,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: teal[50],
        },
      },
    },
  },
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc404",
    },
    secondary: {
      main: "#d9e2f1",
    },
    background: {
      default: "linear-gradient(#29251c, #2c2306)",
      paper: "#1d1a16",
    },
    text: {
      primary: "#d9e2f1",
      secondary: "#46443c",
    },
    error: {
      main: "rgb(221, 176, 176)",
    },
  },
  typography: {
    fontFamily: '"Raleway", "Lato", sans-serif',
    h1: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "0.2rem",
      textTransform: "uppercase",
      color: "#ffc404",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    body1: {
      color: "#d9e2f1",
    },
    button: {
      fontFamily: '"Lato", sans-serif',
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
        },
        contained: {
          backgroundColor: "#ffc404",
          color: "#1f1a09",
          "&:hover": {
            backgroundColor: "#ffab04",
          },
        },
        text: {
          color: "#ffc404",
          "&:hover": {
            color: "#ffab04",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1d1a16",
          borderRadius: "6px",
          padding: "1rem",
          boxShadow: "0 1px 6px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          "& input": {
            color: "#d9e2f1",
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          "&::backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
        container: {
          width: "90%",
          maxWidth: "70rem",
          margin: "2rem auto",
          rowGap: "1rem",
          columnGap: "1rem",
        },
        item: {
          textAlign: "center",
        },
      },
    },
  },
});

export default theme;

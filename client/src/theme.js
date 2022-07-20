import { createTheme } from "@mui/material/styles";
// import shadows from '@mui/material/styles/shadows';
import palette from "../src/global-style/_config.scss";
// import './global-style/_config.scss';

const Colors = {
  // primary: "#9100b5",
  // primary: "#00adb5",
  // primary: "#19d29f",
  // secondary: "#04a8e9",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    black: {
      main: Colors.black,
    },
    white: {
      main: Colors.white,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        // disableRipple: true
      },
      styleOverrides: {
        // root: {
        //     fontSize: '1rem',
        //     boxShadow: '0px 3px 1px -2px rgb(0,0,0,0.2), 0px 2px 2px 0px rgb(0,0,0,0.14), 0px 1px 5px 0px rgb(0,0,0,0.12)',
        // }
        // root: ({ ownerState }) => ({
        //   ...(ownerState.variant === "contained" &&
        //     ownerState.color === "black" && {
        //       color: "#fff",
        //     }),
        //   fontSize: "1rem",
        // }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.white,
        },
      },
    },
  },
  // shadows: shadows.map(() => 'none'),
});

export default theme;

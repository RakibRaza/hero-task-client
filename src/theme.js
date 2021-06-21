import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundImage: "linear-gradient(90deg, #f95fb2 0%, #fc796c 100%)",
        "&:hover": {
          backgroundImage: "linear-gradient(90deg,#fc796c 100%, #f95fb2 0%)",
        },
      },
    },
  },
  typography: {
    h4: {
      fontWeight: "bold",
      color: "#15287d",
      marginTop: '10px'
    },
  },
});

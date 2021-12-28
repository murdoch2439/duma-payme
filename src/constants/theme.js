import { responsiveFontSizes } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'

let theme = {
    "typography": {
      "fontFamily": [
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",

        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ]
    },
    "palette": {
      "common": {
        "black": "#000",
        "white": "#fff"
      },
      "background": {
        "paper": "#fff",
        "default": "#fafafa"
      },
      "primary": {
        "light": "#7dafc2",
        "main": "#000000",
        "dark": "#416d7d",
        "contrastText": "#fff"
      },
      "secondary": {
        "light": "#ff4081",
        "main": "#f50057",
        "dark": "#c51162",
        "contrastText": "#fff"
      },
      "error": {
        "light": "#e57373",
        "main": "#f44336",
        "dark": "#d32f2f",
        "contrastText": "#fff"
      },
      "text": {
        "primary": "rgba(10, 0, 0, 0.87)",
        "secondary": "rgba(0, 0, 0, 0.54)",
        "disabled": "rgba(0, 0, 0, 0.38)",
        "hint": "rgba(0, 0, 0, 0.38)"
      },
      fontSize: {

      },borderWidth:0.3
    },
  };

  theme = createTheme(theme);
  theme = responsiveFontSizes(theme);
  export default theme

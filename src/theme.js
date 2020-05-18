import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#8b37ff' },
  },
  typography: {
    // fontFamily: '"Roboto", sans-serif',
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontSize: window.innerHTML > 600 ? 15 : 12,
  },
});

export default theme;

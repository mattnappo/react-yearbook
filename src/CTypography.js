import { Typography, withStyles } from '@material-ui/core';

const CTypography = withStyles({
  root: {
    // border: '1px solid red',
    'text-align': 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
})(Typography);

export default CTypography;

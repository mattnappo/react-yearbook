import { Typography, withStyles } from '@material-ui/core';

const CTypography = withStyles({
  root: {
    'text-align': 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
})(Typography);

export default CTypography;

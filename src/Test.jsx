import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
    width: 1000,
  },
}));

const StateTextFields = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: '',
  });
  // const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setState({ name: event.target.value });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="standard-name" label="Name" value={state.name} onChange={handleChange} />
      </div>
      <div>
        <TextField
          id="filled-name"
          label="Name"
          value={state.name}
          onChange={handleChange}
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="outlined-name"
          label="Name"
          value={state.name}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
    </form>
  );
};

export default StateTextFields;

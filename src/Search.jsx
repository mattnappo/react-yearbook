import React, { useState, useEffect } from 'react';
import {
  Container, makeStyles, Typography, Grid,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles(() => ({
  centered: {
    'text-align': 'center',
  },
  wide: {
    width: '100%',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
}));

const Search = () => {
  const classes = useStyles();
  const [usernames, setUsernames] = useState([]);

  const getUsernames = () => {
    
  };

  useEffect(getUsernames, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Search</Typography>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={usernames}
              getOptionLabel={(username) => username}
              renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
            />
          </Grid>

        </Grid>
      </Container>
      <BottomBar />
    </div>
  );
};

export default Search;

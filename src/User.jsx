import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Paper, Container, Divider, makeStyles,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { apiEndpoint } from './utils';
import TopBar from './Bar';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const User = (props) => {
  const cookies = new Cookies();
  const [userData, setUserData] = useState('');
  const classes = useState();
  const { username } = props.match.params;

  const getUserData = () => {
    fetch(
      apiEndpoint(`getUser/${username}`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          // eslint-disable-next-line no-console
          console.log(res);
        }

        setUserData(res.data);
      });
  };

  useEffect(getUserData, []);

  return (
    <div>
      {/* <TopBar loginText="Logout" /> */}
      <Container maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>username</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>profile pic</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>grade</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}># posts</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}># congratulations</Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>bio</Paper>
          </Grid>

          <Divider className={classes.divider} />

          <Grid item xs={12}>
            <Paper className={classes.paper}>will</Paper>
          </Grid>

        </Grid>
        {JSON.stringify(userData)}
      </Container>
    </div>
  );
};

// User.proptypes = {
//   username: PropTypes.string.isRequired,
// }

export default User;

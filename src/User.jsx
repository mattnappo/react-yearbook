import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Paper, Container, Divider, makeStyles,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { apiEndpoint } from './utils';
// import TopBar from './Bar';

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
  const [user, setUser] = useState('');
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
          // window.location.href = '/';
        }

        setUser(res.data);
      });
  };

  const getGrade = () => {
    switch (user.grade) {
      case 0:
        return 'Freshman';
      case 1:
        return 'Sophomore';
      case 2:
        return 'junior';
      case 3:
        return 'Senior';
      default:
        return 'Error';
    }
  };

  useEffect(getUserData, []);

  return (
    <div>
      {/* <TopBar loginText="Logout" /> */}
      <Container maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>{user.username}</Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <img alt="profile_pic" src={`data:image/png;base64, ${user.profile_pic}`} />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>{getGrade()}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}># posts</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}># congratulations</Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>{user.bio}</Paper>
          </Grid>

          <Divider className={classes.divider} />

          <Grid item xs={12}>
            <Paper className={classes.paper}>{user.will}</Paper>
          </Grid>

        </Grid>
        {JSON.stringify(user)}
      </Container>
    </div>
  );
};

// User.proptypes = {
//   username: PropTypes.string.isRequired,
// }

export default User;

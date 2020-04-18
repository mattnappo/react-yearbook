import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Avatar, Container, Divider,
  makeStyles, withStyles,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { apiEndpoint, capitalize } from './utils';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  pfp: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  test: {
    border: '1px solid blue',
  },
}));

const CTypography = withStyles({
  root: {
    'text-align': 'center',
    border: '1px solid red',
  },
})(Typography);

const User = (props) => {
  const cookies = new Cookies();
  const [user, setUser] = useState('');
  const classes = useStyles();
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

  const genHeaderText = () => {
    if (user.nickname === '') {
      return `${capitalize(user.firstname)} ${capitalize(user.lastname)} (@${user.username})`;
    }
    return `${user.nickname} ${user.lastname} (@${user.username})`;
  };

  const getBioText = () => {
    if (user.bio === '') {
      return 'No bio';
    }
    return user.bio;
  };

  useEffect(getUserData, []);

  return (
    <div>
      <TopBar loginText="Logout" />
      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <CTypography>{genHeaderText()}</CTypography>
          </Grid>

          <Grid item xs={3} className={classes.test}>
            <Avatar alt={user.username} src={user.profile_pic} className={classes.pfp} />
          </Grid>
          <Grid item xs={3} className={classes.test}>
            <CTypography>{getGrade()}</CTypography>
          </Grid>
          <Grid item xs={3} className={classes.test}>
            <CTypography># posts</CTypography>
          </Grid>
          <Grid item xs={3} className={classes.test}>
            <CTypography># congratulations</CTypography>
          </Grid>

          <Grid item xs={12} className={classes.test}>
            <Typography>{getBioText()}</Typography>
          </Grid>

          <Divider className={classes.divider} />

          {/* Will only show if they are a senior */}
          <Grid item xs={12} className={classes.test}>
            <Typography>{user.will}</Typography>
          </Grid>

        </Grid>
        {JSON.stringify(user)}
      </Container>
      <BottomBar />
    </div>
  );
};

// User.proptypes = {
//   username: PropTypes.string.isRequired,
// }

export default User;

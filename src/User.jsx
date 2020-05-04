import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Avatar, Container, Divider,
  makeStyles, withStyles,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import { apiEndpoint, capitalize } from './utils';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles((theme) => ({
  pfp: {
    width: '100%',
    height: '100%',
    maxWidth: 100,
    maxHeight: 100,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  item: {
    // border: '1px solid blue',
    position: 'relative',
  },
  centered: {
    'text-align': 'center',
  },
}));

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

const User = (props) => {
  const cookies = new Cookies();
  const [user, setUser] = useState('');
  const [n, setn] = useState({
    inbound: 0,
    outbound: 0,
  });
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

        setn({
          ...n,
          inbound: (res.data.inbound_posts == null) ? 0 : res.data.inbound_posts.length,
        }); // Congrats

        setn({
          ...n,
          outbound: (res.data.outbound_posts == null) ? 0 : res.data.outbound_posts.length,
        }); // Posts
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
    return `${capitalize(user.nickname)} ${capitalize(user.lastname)} (@${user.username})`;
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
            <Typography className={classes.centered}>{genHeaderText()}</Typography>
          </Grid>

          <Grid item xs={3} className={classes.item}>
            <Avatar
              alt={user.username}
              src={user.profile_pic}
              className={classes.pfp}
            />
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <CTypography>{getGrade()}</CTypography>
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <CTypography>{`${n.outbound} ${n.outbound > 1 ? 'Posts' : 'Post'}`}</CTypography>
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <CTypography>{`${n.inbound} Congratulations`}</CTypography>
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography>{getBioText()}</Typography>
          </Grid>

          <Divider className={classes.divider} />

          {/* Will only show if they are a senior */}
          <Grid item xs={12} className={classes.item}>
            <Typography>{user.will}</Typography>
          </Grid>

        </Grid>

      </Container>
      <BottomBar />
    </div>
  );
};

export default User;

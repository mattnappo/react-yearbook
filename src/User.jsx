import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Avatar, Container,
  Button, makeStyles, withStyles,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PostsTabs from './PostsTabs';
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
  const classes = useStyles();
  const cookies = new Cookies();

  const [user, setUser] = useState('');
  const [nInbound, setnInbound] = useState(0);
  const [nOutbound, setnOutbound] = useState(0);

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
          console.log(res);
        }

        setUser(res.data);

        setnInbound(
          (res.data.inbound_posts == null) ? 0 : res.data.inbound_posts.length,
        ); // Congrats

        setnOutbound(
          (res.data.outbound_posts == null) ? 0 : res.data.outbound_posts.length,
        ); // Posts
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

  const renderSeniorWill = () => {
    if (user.grade === 3) {
      return (
        <Grid item xs={12} className={classes.item}>
          <Typography>{user.will}</Typography>
        </Grid>
      );
    }

    return <span />;
  };

  const renderEditButton = () => {
    if (cookies.get('username') === username) {
      return (
        <Link to="/settings" className="link">
          <Button startIcon={<SettingsIcon />} variant="outlined" color="primary">
            Edit Account
          </Button>
        </Link>
      );
    }
    return <span />;
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
            <CTypography>{`${nOutbound} Posts`}</CTypography>
          </Grid>
          <Grid item xs={3} className={classes.item}>
            <CTypography>{`${nInbound} Congrats`}</CTypography>
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography>{getBioText()}</Typography>
          </Grid>

          {renderSeniorWill()}

          <Grid item xs={12} className={classes.item}>
            {renderEditButton()}
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <PostsTabs />
          </Grid>

        </Grid>

      </Container>

      <BottomBar />
    </div>
  );
};

export default User;

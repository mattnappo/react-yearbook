import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
  Typography, Grid, Avatar, Container,
  Button, Box, makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import CTypography from './CTypography';
import PostsTabs from './PostsTabs';
import { apiEndpoint, capitalize, handleError } from './utils';
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

const User = (props) => {
  const classes = useStyles();
  const cookies = new Cookies();

  const [user, setUser] = useState('');
  const [nInbound, setnInbound] = useState(0);
  const [nOutbound, setnOutbound] = useState(0);

  const { username } = props.match.params;

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

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
        const err = handleError(res.errors);
        // if (err) { toast(err, 'error'); return; }
        if (err) { console.log(err); }

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
        return 'Grade';
    }
  };

  const genHeaderText = () => {
    if (!user.firstname) return '';
    if (user.nickname === '') {
      return `${capitalize(user.firstname)} ${capitalize(user.lastname)} (@${user.username})`;
    }
    return `${capitalize(user.nickname)} ${capitalize(user.lastname)} (@${user.username})`;
  };

  const getBioText = () => {
    if (!user) return '';
    if (!user.registered) return `@${user.username} hasn't made an account yet. Tell them to log in!`;
    if (user.bio === '') return 'No bio';
    return user.bio;
  };

  const renderSeniorWill = () => {
    if (user.grade === '3') {
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
      <TopBar />
      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Box className="header">{genHeaderText()}</Box>
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
            <PostsTabs username={username} />
          </Grid>

        </Grid>

      </Container>
      {console.log(`COOKIE USERNAME: ${cookies.get('username')}\nregular USERNAME: ${user.username}`)}
      {
        user.username == cookies.get('username') ? <BottomBar defaultValue="me" /> : <BottomBar />
      }
    </div>
  );
};

export default User;

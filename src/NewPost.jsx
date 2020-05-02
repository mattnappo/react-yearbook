import React, { useState } from 'react';
import {
  TextField, Button, NativeSelect, Container,
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import TopBar, { BottomBar } from './Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    width: 1000,
    border: '1px solid red',
  },
  border: {
    border: '1px solid red',
  },
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

const NewPost = () => {
  const [state, setState] = useState({
    sender: '',
    recipients: [],
    message: '',
    images: [],
  });

  const classes = useStyles();

  return (
    <div>
      <TopBar loginText="Logout" />

      <Container className="main-content" maxWidth="sm">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography className={classes.centered}>Edit Account Settings</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              className={classes.wide}
              label="Nickname"
              value={state.nickname}
              onChange={(e) => { setState({ ...state, nickname: e.target.value }); }}
            />
          </Grid>
          <Grid item xs={6}>
            <NativeSelect
              className={classes.fill}
              variant="standard"
              value={gradeIntToString(state.grade)}
              onChange={(e) => { setState({ ...state, grade: gradeStringToInt(e.target.value) }); }}
            >
              <option aria-label="none" value="" />
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
            </NativeSelect>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              className={classes.wide}
              multiline
              value={state.bio}
              onChange={(e) => { setState({ ...state, bio: e.target.value }); }}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={save}
          >
            Save Changes
          </Button>

        </Grid>

      </Container>

      <BottomBar />
    </div>
  );
};

export default NewPost;

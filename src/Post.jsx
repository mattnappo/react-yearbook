import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
  apiEndpoint, formatTime, handleError,
} from './utils';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    'margin-top': '24px',
  },
  media: {
    width: '100%',
    position: 'relative',
  },
  deleteButton: {
    float: 'right',
    marginBottom: 12,
  },
}));

const Post = ({ postData, single }, key) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [profilePic, setProfilePic] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const toast = (text, variant) => {
    enqueueSnackbar(text, {
      variant, autoHideDuration: 3000,
    });
  };

  const deletePost = () => {
    fetch(
      apiEndpoint(`deletePost/${postData.post_id}`),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${cookies.get('token')}`,
        },
      },
    ).then((res) => res.json())
      .then((res) => {
        const err = handleError(res.errors);
        if (err) { toast(err, 'error'); return; }

        toast('Deleted post', 'success');
        window.location.replace('/feed');
      });
  };

  const renderImages = () => {
    if (postData.images !== null) {
      return postData.images.map(
        (image) => (
          <img
            className={classes.media}
            alt={postData.post_id}
            src={`data:image/png;base64, ${image}`}
            key={postData.id}
          />
        ),
      );
    }
    return <span />;
  };

  const renderRecipients = () => (
    postData.recipients.map((recipient, index) => (
      index === postData.recipients.length - 1 ? (
        <Link to={`/accounts/${recipient}`} className="link" key={index}>
          {`@${recipient}`}
        </Link>
      ) : (
        <Link to={`/accounts/${recipient}`} className="link" key={index}>
          {`@${recipient}, `}
        </Link>
      )
    ))
  );

  const getSenderProfilePic = () => {
    fetch(
      apiEndpoint(`getUserProfilePic/${postData.sender}`),
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
        if (err) { toast(err, 'error'); return; }

        setProfilePic(res.data);
      });
  };

  useEffect(getSenderProfilePic, []);

  return (
    <Card className={classes.root} id={key}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" src={profilePic}>
            {postData.sender[0].toUpperCase()}
          </Avatar>
        )}
        title={(
          <Link to={`/accounts/${postData.sender}`} className="link">
            {postData.sender}
          </Link>
        )}
        subheader={(
          <span>
            {`To: `}
            { renderRecipients() }
          </span>
        )}
      />

      {renderImages()}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postData.message}
        </Typography>
        <br />
        <Typography color="textSecondary" component="p">
          {formatTime(postData.timestamp)}
        </Typography>
        {
          single && cookies.get('username') === postData.sender ? (
            <Button onClick={deletePost} color="secondary" className={classes.deleteButton}>Delete Post</Button>
          ) : <span />
        }
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  postData: PropTypes.object.isRequired,
  single: PropTypes.bool,
};
Post.defaultProps = {
  single: false,
};

export default Post;

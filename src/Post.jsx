import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { apiEndpoint, formatTime, formatRecipients } from './utils';

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
}));

const Post = ({ postData }, key) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const [profilePic, setProfilePic] = useState('');

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

  const getSenderProfilePic = () => {
    fetch(
      apiEndpoint(`getUser/${postData.sender}`),
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

        setProfilePic(res.data.profile_pic);
      });
  };

  useEffect(getSenderProfilePic, []);

  return (
    <Card className={classes.root} id={key}>
      <Link
        className="link"
        to={`/accounts/${postData.sender}`}
      >
        <CardHeader
          avatar={(
            <Avatar aria-label="recipe" src={profilePic}>
              {postData.sender[0].toUpperCase()}
            </Avatar>
          )}
          title={postData.sender}
          subheader={`To: ${formatRecipients(postData.recipients)}`}
        />
      </Link>

      {renderImages()}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postData.message}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" component="p">
          {formatTime(postData.timestamp)}
        </Typography>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  postData: PropTypes.object.isRequired,
};

export default Post;

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
import { apiEndpoint, formatTime } from './utils';

// https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css/10441480#answer-10441480
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    'margin-top': '24px',
  },
  media: {
    // 'object-fit': 'cover',
    width: '100%',
    // 'padding-top': '100%',
    position: 'relative',
    // maxHeight: 600,
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
          // eslint-disable-next-line no-console
          console.log(res);
          // window.location.href = '/';
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
  // eslint-disable-next-line react/forbid-prop-types
  postData: PropTypes.object.isRequired,
};

export default Post;

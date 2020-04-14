import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

// https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css/10441480#answer-10441480
const useStyles = makeStyles((theme) => ({
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const Post = ({ postData }) => {
  const classes = useStyles();
  console.log(postData);

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

  return (
    <Card className={classes.root}>
      <Link
        className="link"
        to={`/accounts/${postData.sender}`}
      >

        <CardHeader
          avatar={(
            <Avatar aria-label="recipe" className={classes.avatar}>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  postData: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
};

export default Post;

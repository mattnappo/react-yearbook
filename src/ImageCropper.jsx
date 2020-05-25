import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ handleImageCallback }) => {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    setImgRef(img);
  }, []);

  const createCropPreview = async (image, newCrop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = newCrop.width;
    canvas.height = newCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      newCrop.x * scaleX,
      newCrop.y * scaleY,
      newCrop.width * scaleX,
      newCrop.height * scaleY,
      0,
      0,
      newCrop.width,
      newCrop.height,
    );

    handleImageCallback(canvas.toDataURL('image/jpeg').substring(23));
  };

  const makeClientCrop = async (clientCrop) => {
    if (imgRef && clientCrop.width && clientCrop.height) {
      createCropPreview(imgRef, clientCrop, 'newFile.jpeg');
    }
  };

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <Typography>Zoom out before uploading an image</Typography>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={makeClientCrop}
      />
    </div>
  );
};
ImageCropper.propTypes = {
  handleImageCallback: PropTypes.func.isRequired,
};

export default ImageCropper;

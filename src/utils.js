// import { Date } from 'datejs';
import React from 'react';
import { useSnackbar } from 'notistack';

const moment = require('moment');

// authEndpoint returns an authorization endpoint to the API.
export const authEndpoint = (endpoint) => `/oauth/${endpoint}`;

// apiEndpoint returns an endpoint to the API.
export const apiEndpoint = (endpoint) => `/api/${endpoint}`;

// parseURL parses a url.
export const parseURL = () => {
  const url = window.location.href;
  const question = url.indexOf('?');
  let hash = url.indexOf('#');
  if (hash === -1 && question === -1) return {};
  if (hash === -1) hash = url.length;
  const query = question === -1 || hash === question + 1 ? url.substring(hash)
    : url.substring(question + 1, hash);
  const result = {};
  query.split('&').forEach((parts) => {
    if (!parts) return;
    const part = parts.split('+').join(' '); // replace every + with space, regexp-free version
    const eq = part.indexOf('=');
    let key = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    const from = key.indexOf('[');
    if (from === -1) result[decodeURIComponent(key)] = val;
    else {
      const to = key.indexOf(']', from);
      const index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
};

// capitalize capitalizes the first letter of a string.
export const capitalize = (s) => {
  if (s === '') return '';
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatTime = (t) => (moment(t).format('ddd, MMM. YYYY'));

export const gradeIntToString = (gradeInt) => {
  switch (gradeInt) {
    case 0:
      return 'freshman';
    case 1:
      return 'sophomore';
    case 2:
      return 'junior';
    case 3:
      return 'senior';
    default:
      return 'invalid grade';
  }
};

export const gradeStringToInt = (gradeString) => {
  switch (gradeString) {
    case 'freshman':
      return 0;
    case 'sophomore':
      return 1;
    case 'junior':
      return 2;
    case 'senior':
      return 3;
    default:
      return 'invalid grade';
  }
};

// handleError returns the error message to render with toast.
export const handleError = (errs) => {
  if (errs == null) return null;
  const e = errs[0];
  if (e.toLowerCase() === 'invalid credentials to query google api') {
    window.location.replace('/?err=sessionExpired');
  }

  // could use a switch here

  return 'An error occurred.';
};

export const formatRecipients = (recipients) => {
  let s = '';
  for (let i = 0; i < recipients.length - 1; i++) {
    s += `@${recipients[i]}, `;
  }
  s += `@${recipients[recipients.length - 1]}`;
  return s;
};

// rename to errorSnacks
export const errors = {
  sessionExpired: {
    message: 'You have been logged out. Please log in again.',
    type: 'info',
  },
  logout: {
    message: 'Logged out',
    type: 'info',
  },
  flag: {
    message: 'hi zach',
    type: 'info',
  },
};

export const Toast = ({ text, variant }) => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(text, {
    variant, autoHideDuration: 3000,
  });
};

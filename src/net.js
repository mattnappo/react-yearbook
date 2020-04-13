const conf = {
  ip: 'localhost',
  port: 8081,
  protocol: 'http',
};

// authEndpoint returns an authorization endpoint to the API.
export const authEndpoint = (endpoint) => `/oauth/${endpoint}`;

// apiEndpoint returns an endpoint to the API.
export const apiEndpoint = (endpoint) => `${conf.protocol}://${conf.ip}:${conf.port}/api/${endpoint}`;

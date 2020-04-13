const conf = {
  ip: 'localhost',
  port: 8081,
  protocol: 'http',
};

// APIEndpoint returns an endpoint to the API.
export const APIEndpoint = (endpoint) => `${conf.protocol}://${conf.ip}:${conf.port}/api/${endpoint}`;
// AuthEndpoint returns an authorization endpoint to the API.
export const AuthEndpoint = (endpoint) => `${conf.protocol}://${conf.ip}:${conf.port}/oauth/${endpoint}`;

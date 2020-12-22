const APP_NAME = 'Tour of Heroes';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : process.env.DEV_API_URL;

export { APP_NAME, API_URL };

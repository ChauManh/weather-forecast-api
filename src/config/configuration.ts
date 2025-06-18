export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expiration: parseInt(process.env.JWT_EXPIRATION || '900', 10), // seconds
    refreshExpiration: parseInt(
      process.env.REFRESH_TOKEN_EXPIRATION || '604800',
      10
    ),
  },

  adminPassword: process.env.ADMIN_PASSWORD,

  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
});

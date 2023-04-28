export const jwtConstants = {
  secret: process.env.secretJwt,
  access_token_expiration: 900000,
  refresh_token_expiration: 2592000000,
};

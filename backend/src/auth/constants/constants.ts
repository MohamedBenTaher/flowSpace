export const jwtConstants = {
  secret: process.env.secretJwt,
  access_token_expiration: 60 * 15 * 50,
  refresh_token_expiration: 60 * 60 * 24 * 7,
};

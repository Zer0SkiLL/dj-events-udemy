module.exports = ({ env }) => ({
  url: env("HEROKU_URL"),
  port: env.int("PORT", 1337),
});

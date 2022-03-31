module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'caf2781e32816039593a8f910247a4df'),
  },
});

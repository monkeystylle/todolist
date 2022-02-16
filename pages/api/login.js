import auth0 from './utils/Auth0';

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}

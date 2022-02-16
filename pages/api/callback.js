import auth0 from './utils/Auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' });
  } catch (err) {
    console.error(`Error message: ${err}`);
    res.status(err.status || 400).end(err.message);
  }
}

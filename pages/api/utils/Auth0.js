import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: 'dev-xo39ljhe.us.auth0.com',
  clientId: 'bTGVaOoedJG3Uwz3zFoHzn465IOQWevt',
  clientSecret:
    'IxKYnHoUZtQKMpO00-wHebVwzgQgcJinKawdmfDu7vZNXOyxlWL8vRm4kVhPP3Af',
  redirectUri:
    'https://jam-stack-next-js-tailwind-auth0-todo-app.vercel.app/api/callback',
  postLogoutRedirectUri:
    'https://jam-stack-next-js-tailwind-auth0-todo-app.vercel.app',
  scope: 'openid profile',
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret:
      'asdasdasdasdadasdasdasdasdasdasdasdasdasdasdasdasdasdasdaasd',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false,
  },
});

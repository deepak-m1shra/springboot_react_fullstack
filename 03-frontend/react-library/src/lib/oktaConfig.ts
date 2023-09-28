export const oktaConfig = {
    clientId: '0oablqjm6aBtyeu3m5d7',
    issuer: 'https://dev-44807817.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes:['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
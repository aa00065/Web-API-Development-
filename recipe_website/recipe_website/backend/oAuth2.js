const oauth2 = require('oauth2-server');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://fakotrako321:pass123@recipes.dv2fhw8.mongodb.net/recipedB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// Client schema
const ClientSchema = new mongoose.Schema({
  clientId: String,
  clientSecret: String,
  grants: [String],
  redirectUris: [String]
});
const Client = mongoose.model('Client', ClientSchema);

// AccessToken schema
const AccessTokenSchema = new mongoose.Schema({
  token: String,
  clientId: String,
  userId: String,
  scope: String,
  expiresAt: Date
});
const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

// RefreshToken schema
const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  clientId: String,
  userId: String,
  scope: String
});
const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

// Custom model
const model = {
  getClient: async (clientId, clientSecret) => {
    const client = await Client.findOne({ clientId: clientId });
    if (!client) return;

    if (clientSecret && !await bcrypt.compare(clientSecret, client.clientSecret)) return;

    return {
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      grants: client.grants,
      redirectUris: client.redirectUris,
    };
  },

  generateAccessToken: async (client, user, scope) => {
    const tokenValue = Math.random().toString(36).substr(2);
    const token = new AccessToken({
      token: tokenValue,
      clientId: client.clientId,
      userId: user.id,
      scope: scope,
      expiresAt: new Date(Date.now() + 3600000) // 1 hour expiry
    });
    await token.save();
    return tokenValue;
  },

  generateRefreshToken: async (client, user, scope) => {
    const tokenValue = Math.random().toString(36).substr(2);
    const token = new RefreshToken({
      token: tokenValue,
      clientId: client.clientId,
      userId: user.id,
      scope: scope,
    });
    await token.save();
    return tokenValue;
  },

  getAccessToken: async (accessToken) => {
    const token = await AccessToken.findOne({ token: accessToken });
    if (!token) return;
    return {
      accessToken: token.token,
      clientId: token.clientId,
      expires: token.expiresAt,
      userId: token.userId,
      scope: token.scope,
    };
  },

  getUser: async (username, password) => {
    const user = await User.findOne({ username: username });
    if (!user) return;
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return;
    return { id: user.id };
  },

  revokeToken: async (token) => {
    await RefreshToken.deleteOne({ token: token });
  }
};

// Initialize OAuth2 server
const oauthServer = new oauth2({
  model: model,
  accessTokenLifetime: 3600 // 1 hour expiry
});

// Middleware to parse OAuth2 requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(oauthServer.token());

// Route to handle authorization requests
app.post('/oauth/token', async (req, res) => {
  const request = new oauth2.Request(req);
  const response = new oauth2.Response(res);

  try {
    const token = await oauthServer.token(request, response);
    res.json(token);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
});

// Example protected route
app.get('/api/protected', oauthServer.authenticate(), (req, res) => {
  res.json({ message: 'Protected resource accessed' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

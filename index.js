const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const BASE_URL = '/api/v1';

const UserRouter = require('./router/UserRouter');
app.use(BASE_URL + '/user', UserRouter);

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

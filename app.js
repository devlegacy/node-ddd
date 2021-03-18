const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app
  .set('port', port)
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.get('/', (req, res) => {
  res.send('Hellooooo!!!');
});

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${port}`);
});

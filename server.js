let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

app.use((request, response, next) => {  
  console.log(request.method, "request:", request.get('host') + request.originalUrl);
  console.log("body:", request.body);
  next();
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use((err, request, response, next) => {  
  console.log(err);
  response.status(500).send('Server Error');
});

app.listen(3000, function () {
  console.log('Inventory App listening on port 3000');
});

module.exports = app;

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');


app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up on port!`);
});






// const express = require("express");
// const path = require("path");

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const PORT = process.env.PORT || 8080;

// app.get("*", function(request, response) {
//   response.sendFile(path.join(__dirname, "build/index.html"));
// });

// app.listen(PORT, function() {
//   console.log("server listening on port: " + PORT);
// });

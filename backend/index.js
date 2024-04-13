const connectToMomgo = require("./db");
const express = require("express");

connectToMomgo();

const app = express();
const port = 5000;

app.use(express.json())

// Available Routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

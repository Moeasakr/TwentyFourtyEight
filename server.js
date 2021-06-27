const express = require("express");
var path = require("path");
var serverStatic = require("serve-static");

app = express();
app.use(serverStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started at port: ${port}`);

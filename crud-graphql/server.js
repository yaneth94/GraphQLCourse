const express = require("express");

const app = express();

app.get("/", function(req, res) {
    res.send("Bienvenido");
});

app.listen(8080, function() {
    console.log("Servidor iniciado");
});
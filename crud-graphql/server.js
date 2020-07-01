const express = require("express");
const { buildSchema } = require("graphql");

const app = express();

let courses = require("./courses");

const schema = buildSchema(`
    type Course{
        id: ID!
        title: String!
        views: Int
    }

    type Query{
        getCourses: [Course] 
    }
`);

app.get("/", function(req, res) {
    res.json(courses);
});

app.listen(8080, function() {
    console.log("Servidor iniciado");
});
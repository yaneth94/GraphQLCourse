const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");

const app = express();

let courses = require("./courses");

//schema definition language
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

const root = {
    getCourses() {
        return courses;
    },
};

app.get("/", function(req, res) {
    res.json(courses);
});

//middleware
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(8080, function() {
    console.log("Servidor iniciado");
});
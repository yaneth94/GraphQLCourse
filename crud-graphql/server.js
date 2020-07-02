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
        getCourse(id: ID!) : Course
    }

    type Mutation {
        addCourse(title:String!,views:Int): Course
    }

`);

const root = {
    getCourses() {
        return courses;
    },
    getCourse({ id }) {
        console.log(id);
        return courses.find((course) => id == course.id);
    },
    addCourse({ title, views }) {
        const id = String(courses.length + 1);
        const course = { id, title, views };
        courses.push(course);
        return course;
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
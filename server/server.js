var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo.js');
var {User} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());

//First POST route
// app.post('/todos', (req, res)=>{
//     var todo = new Todo({
//         text: req.body.text,
//     })

//     todo.save().then((doc)=>{
//         res.send(doc);
//     },(err)=>{
//         res.status(400).send(err);
//     })
// });

//Second GET route
app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.listen(3000, ()=>{
    console.log('started server');
});

module.exports = {
    app: app,
}
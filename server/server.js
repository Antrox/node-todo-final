var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo.js');
var {User} = require('./models/todo.js');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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
// app.get('/todos',(req, res)=>{
//     Todo.find().then((todos)=>{
//         res.send({todos});
//     }, (err)=>{
//         res.status(400).send(err);
//     });
// });

//Third GET by ID route
app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    else{
        Todo.findById(id).then((todo)=>{
            res.send(todo);
        }, (err)=>{
            res.status(400).send();
        })
    }

})

app.listen(port, ()=>{
    console.log('started server at ', port);
});

module.exports = {
    app: app,
}
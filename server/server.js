const _ = require('lodash');
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
app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text,
    })

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});

//Second GET route
app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (err)=>{
        res.status(400).send(err);
    });
});

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

//Fourth DELETE by ID route
app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    else{
        Todo.findByIdAndRemove(id).then((todo)=>{
            if(todo){
                res.send(todo);
            }
            else{
                res.status(404).send();
            }
        }, (err)=>{
            res.status(400).send();
        })
    }
})

//Fifth PATCH by ID route
app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);


    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);

    }).catch((e)=>{
        res.status(400).send();
    });
})

app.listen(port, ()=>{
    console.log('started server at ', port);
});

module.exports = {
    app: app,
}
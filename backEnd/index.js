const express = require("express");
const app = express();
const port = 3000;
const {createdTodo, updatedTodo} = require("./types");
const Todo = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/todos", async(req, res) => {
    const todos = await Todo.find({});
    res.json({
        todos
    });
});

app.post("/todo", async(req, res) => {
    const createPayLoad = req.body;
    const parsedPayLoad = createdTodo.safeParse(createPayLoad);

    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "you sent the wrong input"
        })
        return;
    }

    await Todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false,
    });

    res.json({
        msg: "Todo created"
    })

});

app.put("/completed", async(req,res) => {
    const updatePayLoad = req.body;
    const parsedPayLoad = updatedTodo.safeParse(updatePayLoad);

    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }

    await Todo.update({
        _id : req.body.id
    }, {
        completed: true
    });

    res.json({
        msg: "Todo is done"
    })
});

app.listen(port, (req, res) => {
    console.log("we are on server 3000")
});
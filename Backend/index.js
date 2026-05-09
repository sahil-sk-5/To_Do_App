const express = require("express");
const app = express();
const {todo} = require("../Backend/db")
const {createTodo, updateTodo} = require("../Backend/types")

app.use(express.json());

// title - string and description - string
app.post("/todo", async(req,res) => {            // Route to enter a new TODO
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }

    await todo.create({
        title: createPayload.title,
        desciption: createPayload.desciption,
        completed: false
    })
    res.json({
        msg:"Todo created"
    })
})

app.get("/todos",async (req,res) => {            // Route to get all the todos present
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.put("/completed", async (req,res) => {            // Route to mark the task done as completed
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.update({
        _id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "Todo marked as completed"
    })

})

app.listen(3000, () =>{
    console.log("Running on port 3000");
})
const express = require('express');

const app = express();

/* /notes => {title, content} */

app.use(express.json());//allow to read json data that come from frontend

let notes = [];

app.get('/', (req, res)=>{
    res.send("Hii Sakshi");
})

app.post('/notes',(req,res)=>{
    console.log(req.body);

    notes.push(req.body);
    res.json({message:"Note added successfully"});
    
});

app.get('/notes',(req,res)=>{
    res.json(notes);
});
// Delete /notes/:index => delete note at that index

app.delete('/notes/:index',(req,res)=>{
    const ind = req.params.index;
    delete notes[ind];
    res.json({
        message:"Note deleted successfully"
    })

})

// update -> PATCH /notes/:index => {title}

app.patch("/notes/:index", (req,res)=>{
    const ind = req.params.index;
    const {content} =req.body;
    notes[ind].content = content;
    res.json({
        message: "Note Updated successfully"
    })
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
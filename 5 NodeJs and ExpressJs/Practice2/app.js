
const express = require('express');

const fs = require('fs');
const parseBody = require('body-parser');



const app = express();

app.use(parseBody.urlencoded());

app.use((req,res,next)=>{

    console.log("Path", req.path);
    next();

});

app.use((req,res,next)=>{
    console.log("Method",req.method);
    next();
});

app.use("/info", (req,res,next)=>{
    console.log("Form Data Received",req.body);
    fs.writeFile("contact.json", JSON.stringify(req.body), (err)=>{
        if(err){
            console.log("Error writing file:", err);
            return res.status(500)/send("Server Error");
        }
        console.log("File Saved Successfully!");
    });
    console.log(req.body);

    res.redirect("/");

})

app.use("/contact-us", (req,res,next)=>{
    res.send(`
        <h1>Contact Us</h1>
        <form action="/info" method="POST">
            <input type="text" name="name" placeholder="Enter your Name" required><br><br>
            <input type="email" name="email" placeholder="Enter your Email" required><br><br>
            <button type="submit">Submit</button>
        </form>
    `);

});

app.use("/",(req,res,next)=>{
    res.send(`<h1>Welcome to the Home Page</h1>
        <p>Need Help? reach out to us!</p>
        <a href="/contact-us">Go to Contact Us Page</a>
        `);
    


});





app.use((req,res,next)=>{
    res.status(404).send(`<h1>404: Page Not Found</h1>`);
})

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
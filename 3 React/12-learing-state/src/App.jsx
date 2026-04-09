import { useState } from "react";
import Create from "./components/Create";
import Render from "./components/Render";
import List from "./components/List";

function App() {

  const [studentArr, setStudentArr] = useState([
    {name : "Nirmala", age:12},
    {name : "Aman", age:14},
    {name : "Akash", age:15},
    {name : "Amanullah", age:13},
    {name : "Abhijeet", age:16},
    {name : "Gopi", age:14}
  ]);

  const [fullname, setFullname] = useState("");
  const [age,setAge] = useState();
  

 
      

  

  return (
    <>
    <div style={{width:"80%", margin:"auto", backgroundColor:"lightgray",
       padding:"20px", borderRadius:"10px", 
       // 1. Position the box relative to the browser window
        position: "absolute", 
        top: "50%", 
        left: "50%",
        
        // 2. Shift the box back by half of its own width/height
        transform: "translate(-50%, -50%)", 
        
        // 3. Your original styling
        // width: "80%", 
        maxWidth: "500px", // Added to keep it from stretching too much
        backgroundColor: "lightgray",
        padding: "20px", 
        borderRadius: "10px",
       
       }}>
      <Create studentArr={studentArr}/>
      <hr/>
      <Render studentArr={studentArr} setStudentArr={setStudentArr} setFullname={setFullname} setAge={setAge}/>  
      <hr/>
      <List studentArr={studentArr}/> 
    </div>
     
  </>

  )
}

export default App

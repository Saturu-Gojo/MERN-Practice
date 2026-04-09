import React from 'react'

const Render = ({studentArr, setStudentArr, setFullname, setAge}) => {

    const addHandler = (e)=>{
        e.preventDefault();
        let newName= e.target[0].value;
        let Age = e.target[1].value;
        if(!newName || !Age)return;
        setFullname(newName);
        setAge(Age);

   
        console.log(e.target[0].value,e.target[1].value);
    
        const newStudent = {name :newName, age:Age };
        setStudentArr([...studentArr, newStudent]);
        e.target.reset();

  }

  return (
    <div>
        <form className="flex flex-col gap-3 mt-5" onSubmit={addHandler}>
            <input type = "text"
                placeholder ="Enter name"
     
            ></input>
            <input type ="number" 
                placeholder="Enter age" 
     
            ></input>
            <button type="submit" >Add Student</button>
        </form>
      
    </div>
  )
}

export default Render;

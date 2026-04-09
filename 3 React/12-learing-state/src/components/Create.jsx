import React from 'react'

const Create = ({studentArr}) => {
    const renderuser = studentArr.map((user,index)=>{
        return <li key={index}>name:{user.name}, age:{user.age}</li>;
    });
  return (
    <div>
        <h1 className="text-5xl">
            Learners of MERN Stack
        </h1>
        <ol>
            {renderuser}
        </ol>
    </div>
  )
}

export default Create;

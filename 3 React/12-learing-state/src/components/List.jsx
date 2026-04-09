import React from 'react'

const List = ({studentArr}) => {

    const arr = studentArr.map((user,index)=>{
        return <li key={index}>{user.name}</li>;
    })

  return (
    <div>
        <h1 className="text-5xl">
            List of Learners        
        </h1>
        <ol className="text-2xl">
            {arr}
        </ol>
    </div>
  )
}

export default List

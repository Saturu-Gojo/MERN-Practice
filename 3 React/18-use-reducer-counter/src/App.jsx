import { useState, useReducer, useRef } from "react";

const CounterReducer = (currState, action) => {
  

  let newState = currState;
  console.log(`In Reducer, ${currState}, ${action}`);
  // if(action.type === "Increment"){
  //   newState+=1;
  // }else if(action.type === "Decrement"){
  //   newState-=1;
  // }
  switch(action.type){
    case 'Increment': 
      newState+=1;
      break;
    case 'Decrement':
      newState-=1;
      break;
    case 'Reset':
      newState = 0;
      break;
    case 'Double':
      newState*=2;
      break;
    case 'changeBy':
      newState = newState + parseInt(action.payload.num);
    default:
      break;
  }

  return newState;

}


function App() {


  // const [Counter, setCounter] = useState(0);

  const initialState = 0;
  const changeByInput = useRef(0);

  const [counterVal, counterDispatch] = useReducer(CounterReducer,initialState);

 
  
  const handleIncrement = () => {
    console.log("Increment Clicked");
    // setCounter(curr => curr+1);
    counterDispatch({
      type: "Increment"
    });
  }
  const handleDecrement = () => {
    console.log("Decrement Clicked");
    // setCounter(curr => curr+1);
    counterDispatch({
      type: "Decrement"
    });
  }

  const handleChangeBy = () => {
    const num = changeByInput.current.value;
    changeByInput.current.value=0;
    console.log("Change By");
    counterDispatch({
      type: "changeBy",
      payload: {num}   
    })

  }

  return (
    <>
      <h1>Count: {counterVal}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={()=>counterDispatch({type:"Reset"})}>Reset</button>
      <button onClick={()=>counterDispatch({type:"Double"})}>Double</button>
      <button onClick={handleChangeBy}>Change By</button>
      <input type="text" ref={changeByInput} placeholder="Number" />
    </>
  )
}

export default App

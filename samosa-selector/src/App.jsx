import './App.css';
import samosaimg from './assets/samosaimg.png';
import {useState} from 'react';


{/* <img src={samosaimg} alt="Samosa" className="samosa" onClick={updateCount} />
<h2> Count: {count} </h2> */}

// // also: 
// import React from 'react';
// const [count, setCount] = React.useState(0);
// // is the same as
// import { useState } from 'react';
// const [count, setCount] = useState(0);


const App = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const updateCount = () => setCount(count + multiplier);

  const buyDoubleStuffed = () => {
    if (count >= 10) {
      setMultiplier(multiplier * 2);
      setCount(count - 10);
    }
  }

  const buyPartyPack = () => {
    if (count >= 100) {
      setMultiplier(multiplier * 5);
      setCount(count - 100);
    }
  }

  const buyFullFeast = () => {
    if (count >= 1000) {
      setMultiplier( multiplier * 10);
      setCount(count - 1000);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="upgrade"> 
          <h3> Double Stuffed </h3>
          <p> 2x per click </p>
          <button onClick={buyDoubleStuffed}> Cost: 10 Samosas </button>
        </div>

        <div className="upgrade"> 
          <h3> Party Pack </h3>
          <p> 5x per click </p>
          <button onClick={buyPartyPack}> Cost: 100 Samosas </button>
        </div>

        <div className="upgrade"> 
          <h3> Full Feast </h3>
          <p> 10x per click </p>
          <button onClick={buyFullFeast}> Cost: 1000 Samosas </button>
        </div>


      </div>
      <div className="header">
        <h1> Samosa Selector </h1>
        <h2> Count: {count} </h2>
        <img src={samosaimg} alt="Samosa" className="samosa" onClick={updateCount} />
      </div>
    </div>
  )
}


export default App
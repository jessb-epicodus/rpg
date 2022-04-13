const storeState = () => { 
  console.log("State created.");

  let currentState = {};
  return (stateChangeFunction = state => state) => { // FUNCTION 2
    console.log("STATE AS IT IS NOW: ", currentState);
    // console.log((stateChangeFunction = state => state));
    console.log(stateChangeFunction);
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    console.log("STATE AFTER POSSIBLE CHANGE: ", currentState);
    return newState;
  }
}

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}


console.log("Creating state.");
const Plant = storeState();

console.log("A");
Plant(changeState("ding dongs")(100))
console.log("B");
const blueFood = changeState("soil")(5);
console.log("C");
const newState = Plant(blueFood);
console.log("D");
console.log("GETTING STATE SNAP SHOT");
const stateSnapShot = Plant();
console.log("State Snap Shot: ", stateSnapShot);
console.log("E");
const newState2 = Plant(blueFood);


/*

Creating state.
plant.js:2 State created.
plant.js:29 A
plant.js:6 STATE AS IT IS NOW:  {}
plant.js:8 (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
plant.js:11 STATE AFTER POSSIBLE CHANGE:  {ding dongs: 100}
plant.js:31 B
plant.js:33 C
plant.js:6 STATE AS IT IS NOW:  {ding dongs: 100}
plant.js:8 (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
plant.js:11 STATE AFTER POSSIBLE CHANGE:  {ding dongs: 100, soil: 5}
plant.js:35 D
plant.js:36 GETTING STATE SNAP SHOT
plant.js:6 STATE AS IT IS NOW:  {ding dongs: 100, soil: 5}
plant.js:8 state => state
plant.js:11 STATE AFTER POSSIBLE CHANGE:  {ding dongs: 100, soil: 5}
plant.js:38 State Snap Shot:  {ding dongs: 100, soil: 5}
plant.js:39 E
plant.js:6 STATE AS IT IS NOW:  {ding dongs: 100, soil: 5}
plant.js:8 (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
plant.js:11 STATE AFTER POSSIBLE CHANGE:  {ding dongs: 100, soil: 10}

*/
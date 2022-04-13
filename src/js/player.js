import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

////  BUS. LOGIC  -------------------------------------
// this function creates functions that alter the objects properties

// const changeState = (property) => {
//   return (value) => {
//     return (state) => ({
//       ...state,
//       [property] : () => {
//         (state[property] || 0) + value;
//         if (state[property] > state[`Max${property}`]) {
//           state[property] = state[`Max${property}`]
//         }
//       }
//     });
//   };
// };

const changeState = (property) => {
  return (value) => {
    return (state) => ({
      ...state,
      [property] : (state[property] || 0) + value
    });
  };
};

// this function returns a snapshot of the object
const storeState = () => {
  let currentState = { MaxHP: 100, HP: 100, Level : 1 };
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState};
    return newState;
  };
};

////  USER LOGIC  -------------------------------------
const player1 = storeState();
const player2 = storeState();

const heal = changeState("HP")(+5);
const superHeal = changeState("HP")(+10);

$(document).ready(function() {
  $('#p1-combat').click(function() {
    const newState = player2(changeState("HP")(Math.floor((Math.random() * -8) - 1)));
    $('#p2-health-value').text(`Health: ${newState.HP}`);
  });
  $('#p1-heal').click(function() {
    const newState = player1(heal);
    $('#p1-health-value').text(`Health: ${newState.HP}`);
  });
  $('#p1-superHeal').click(function() {
    const newState = player1(superHeal);
    $('#p1-health-value').text(`Health: ${newState.HP}`);
  });
  $('#p2-combat').click(function() {
    const newState = player1(changeState("HP")(Math.floor((Math.random() * -8) - 1)));
    $('#p1-health-value').text(`Health: ${newState.HP}`);
  });
  $('#p2-heal').click(function() {
    const newState = player2(heal);
    $('#p2-health-value').text(`Health: ${newState.HP}`);
  });
  $('#p2-superHeal').click(function() {
    const newState = player2(superHeal);
    $('#p2-health-value').text(`Health: ${newState.HP}`);
  });
});
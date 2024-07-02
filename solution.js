const data = require("./data.json");
const zero = {
  middle: [
    [250, 150],
    [410, 150],
  ],
  inner: 55,
  outer: 75,
};
let one = { begin: [145, 75], width: 20, height: 150 };

function countPointsInOne() {
  let count = 0;

  data.coords.forEach(([x, y]) => {
    if (
      x > one.begin[1] &&
      x < one.begin[1] + one.height &&
      y > one.begin[0] &&
      y < one.begin[0] + one.width
    ) {
      count++;
    }
  });

  return count;
}
function countPointsInRings() {
  let count = 0;

  data.coords.forEach(([x, y]) => {
    zero.middle.forEach((point) => {
      let abstand = calcDistance(x, y, point[0], point[1]);
      checkDistance(abstand, zero.inner, zero.outer) ? count++ : null;
    });
  });
  return count;
}

function calcDistance(x, y, x0, y0) {
  return Math.sqrt((x - x0) ** 2 + (y - y0) ** 2);
}

function checkDistance(distance, inner, outer) {
  if (inner <= distance && distance <= outer) {
    return true;
  }
  return false;
}

function overallCount() {
  return countPointsInOne() + countPointsInRings();
}

console.log("overall: " + overallCount());

return overallCount();

/*
i checked the one and the zeros seperatly: 
1: i checked if the given x and y coordinates are greater than the minimum and less than the maximum vertically and horizontally
0: i checked the other puzzles some time ago and implemted a solution similar to the santas chimney puzzle. i calculated the distance of the given x and y to the middle of the zero und checked if its within the radius. 

1 function for the 1
1 function for the zero, to avoid code duplications i extrated some of the code in seperate functions cause in the 0-function i'm calculating both zeros

i also made an object for the 1 and one object for both zeros, to have the keydata somewhere central. 

i thought about having the count outside the functions, but i wanted to know how many are in the zeros and how many are in 1. 

*/

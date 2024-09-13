const min_age = 18;
const canVote = (age) => {
  if (age >= min_age) {
    console.log(min_age);
    return true;
  }
  return false;
};
canVote(22);
canVote(10);

function Example() {
  const page = "hello world";
  console.log(page);
  console.log(window.document);
}
Example();

function curriedSum(a) {
  return function (b) {
    return a + b;
  };
}
const sumFive = curriedSum(5);
sumFive(2);
sumFive(10);

// for looop...

// for arrays----
const people = ["sam", "elex", "rene"];

for (const test of people) {
  // console.log(test)
}
const P = [1, 2, 3, 4, 5];
for (const i of P) {
  // console.log(i)
}

const items = [1, 2, 3, 4];
for (const ite of items) {
  if (ite % 2 === 0) {
    console.log("even number, skip the iteration");
    continue;
  }

  console.log("odd Number", ite);
}

const createShape = (shape) => {
  for (const i in shape) {
    console.log(shape[i]);
  }
};

createShape({
  type: "square",
  dimensions: [10, 10],
});
createShape({
  type: "rectangle",
  dimensions: [20, 15],
});

/////////
//remain code
import FetchWrapper from "./fetch-wrapper.js";

const select = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const https =
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/......";

fetch(https)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.documents);
  });

select.addEventListener("change", (e) => {
  console.log(e.target.value);
});

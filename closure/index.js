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

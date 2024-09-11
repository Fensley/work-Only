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

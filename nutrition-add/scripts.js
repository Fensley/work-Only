import FetchWrapper from "./fetchWrapper.js";

const select = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const https =
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/";
const form = document.querySelector("#create-form");
const total = document.querySelector("#total-calories");
// console.log(form)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const api = new FetchWrapper(https);
  api
    .post("fensley", {
      fields: {
        name: { stringValue: `${select.value}` },
        carbs: { integerValue: `${carbs.value}` },
        protein: { integerValue: `${protein.value}` },
        fat: { integerValue: `${fat.value}` },
      },
    })
    .then((data) => {
      // console.log(data)
      if (data.error) {
        return;
      }
      namefail();
    });
  total.innerHTML =
    Number(carbs.value) + Number(protein.value) + Number(fat.value);
});

function namefail() {
  select.value = "";
  carbs.value = "";
  protein.value = "";
  fat.value = "";
}

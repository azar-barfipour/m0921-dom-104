const API_URL = "https://randomuser.me/api?results=50";
const result = document.getElementById("result");
const filter = document.getElementById("filter");

async function getData() {
  const response = await fetch(API_URL);
  const { results } = await response.json();

  //clear result
  result.innerHTML = "";

  console.log(results);
  results.forEach((element) => {
    const li = document.createElement("li");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.src = `${element.picture.thumbnail}`;
    img.style.marginRight = "10px";
    const divTitle = document.createElement("div");
    const name = document.createElement("p");
    name.textContent = `${element.name.first} ${element.name.last}`;
    name.style.marginBottom = "10px";
    const city = document.createElement("p");
    city.textContent = `${element.location.country} ${element.location.city}`;
    li.append(divImg);
    li.append(divTitle);
    divImg.append(img);
    divTitle.append(name);
    divTitle.append(city);
    result.append(li);
  });

  filter.addEventListener("keyup", function (e) {
    const items = document.querySelectorAll("li");
    const enteredValue = e.target.value.toLowerCase();
    items.forEach((item) => {
      const fullName =
        item.childNodes[1].childNodes[0].textContent.toLowerCase();
      const fullAddress =
        item.childNodes[1].childNodes[1].textContent.toLowerCase();
      if (
        fullName.indexOf(enteredValue) !== -1 ||
        fullAddress.indexOf(enteredValue) !== -1
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
}

getData();

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".input-group-text");
  const searchInput = document.querySelector(".form-control");
  // Event listener for button click
  searchButton.addEventListener("click", () => {
    let text = searchInput.value.trim();
    if (text) {
      getCocktail(text);
    }
  }); // Event listener for Enter key press
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      let text = searchInput.value.trim();
      if (text) {
        getCocktail(text);
      }
    }
  });
});

function getCocktail(cocktail) {
  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
  );
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const cardContainer = document.querySelector(".card-cocktail");
    if (data.drinks) {
      renderCocktail(data.drinks[0]);
    } else {
      document.querySelector(".card-cocktail").innerHTML =
        "<p> No cocktail found </p>";
    }
  });
  request.addEventListener("error", function () {
    document.querySelector(".card-cocktail").innerHTML =
      "<p>Error fetching data</p>";
  });
}
function renderCocktail(data) {
  const cardContainer = document.querySelector(".card-cocktail");
  let ingredients = "";
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `<li class="list-group-item">${
        data[`strIngredient${i}`]
      }</li>`;
    } else {
      break;
    }
  }

  let html = `
          <div class="card" >
          <img style="width:50%"  src="${data.strDrinkThumb}" class="card-img-top  mb-2"  alt="${data.strDrink}"  /> 
            <div class="card-body">
              <h2 class="card-title py-2 mb-2">${data.strDrink}</h2>
             
              <div class="recipe">
                <h5 class="card-title">Ingredients</h5>
                <ul class="list-group mb-3">
                 ${ingredients}
                </ul>

                <h5 class="card-title">Instructions:</h5>
                <p class="card-text">
                  "${data.strInstructions}"
                </p>
              </div>
            </div>
          </div>
        `;
  cardContainer.innerHTML = html;
}

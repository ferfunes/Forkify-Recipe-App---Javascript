import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

//Clearing input area after submiting
export const clearInput = () => {
  elements.searchInput.value = "";
};

// clearing the results after searching for other type of food
export const clearResults = () => {
  elements.searchResList.innerHTML = "";
};

//Limiting the amount of text display in the recipe title
const limitRecipeTitle = (title, limit = 17) => {
  let newTitle = [];

  if (title.lentgh > limit) {
    title.split("  ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join("  ")} ...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};

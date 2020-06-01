import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

import Recipe from "./modules/Recipe";
import { elements, renderLoader, clearLoader } from "../js/views/base";

/* Global State of the App
 * - Search object
 * - Current recipe object
 * - Shopping list Object
 * - Liked Recipes
 */
const state = {};
/**
 * Search Controller
 */

const controlSearch = async () => {
  // 1) Get query from view
  //const query = searchView.getInput(); //Todo
  const query = "pizza";
  if (query) {
    // 2) New search object and add to start
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something Wrong with the search..");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

// Testing
window.addEventListener("load", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * Recipe Controller
 */

const controlRecipe = async () => {
  //Get ID from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // prepare ui for changes
    renderLoader(elements.recipe);
    //create new recipe object
    state.recipe = new Recipe(id);

    // Testing
    window.r = state.recipe;

    try {
      //get recipe data
      await state.recipe.getRecipe();
      //calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("Opps something went wrong processing the recipe");
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);

search.getResults();

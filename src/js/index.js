import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements } from "../js/views/base";

/* Global State of the App
 * - Search object
 * - Current recipe object
 * - Shopping list Object
 * - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput(); //Todo
  if (query) {
    // 2) New search object and add to start
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

search.getResults();

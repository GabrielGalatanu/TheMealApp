import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE} from '../actions/meals';
import {SET_FILTERS} from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};
//TO DO
//UNION TYPE PENTRU TOGGLE_FAVORITE SA AIBE MEAL ID SI SET_FILETERS SA AIBE FILTERS
//is state is undefined, then initialState will take its place

/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
// function sayHello(somebody) {
//   if (!somebody) {
//       somebody = 'John Doe';
//   } else if (Array.isArray(somebody)) {
//       somebody = somebody.join(', ');
//   }
//   alert('Hello ' + somebody);
// }

// /**
//  * @typedef {'error' | 'success'} ResultType
//  */
// /** @type {ResultType} */
// let x = 'error'; // this is a valid value
// x = 'success'; // this is also a valid value
// x = 'something'; // this is not a valid value for x !!!

const mealsReducer = (state = initialState, action) => {


  switch (action.type) {
    case TOGGLE_FAVORITE:
      console.log('i am here');
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId,
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {...state, favoriteMeals: updatedFavMeals};
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
      }

    case SET_FILTERS:
        const appliedFilters = action.filters;
        const updatedFilteredMeals = state.meals.filter(meal => {
            if(appliedFilters.glutenFree && !meal.isGlutenFree){
                return false;
            }
            if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                return false;
            }
            if(appliedFilters.vegetarian && !meal.isVegetarian){
                return false;
            }
            if(appliedFilters.vegan && !meal.isVegan){
                return false;
            }

            return true;
        })
        return {...state, filteredMeals: updatedFilteredMeals}

    default:
      return state;
  }

  return state;
};

export default mealsReducer;

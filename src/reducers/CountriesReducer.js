import Constants from '../constants'
import {calculateTotalPages, sortCountries} from '../utilities'

const CountriesReducer = (state, action) => {
  switch (action.type) {
      case 'SET_COUNTRIES':
          return {
              ...state,
              results: sortCountries(action.payload),
              currentPageNumber: 1,
              totalPages: calculateTotalPages(Constants.PAGE_SIZE, action.payload.length)
          };
      case 'SET_CURRENT_PAGE_NUMBER':
          return {
            ...state,
            currentPageNumber: action.payload
          }
      case 'SET_SEARCH_PHRASE':
        return {
          ...state,
          searchPhrase: action.payload
        }
      default:
          return state;
  }
};

export default CountriesReducer;
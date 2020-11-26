// this function will calculate total number of pages based on page size (e.g., 10) and total items in the results array
export const calculateTotalPages = (pageSize, totalItems) => {
  return Math.ceil(totalItems / pageSize)
}

// this function will return the slice from original array based on page number and page size
export const getCurrentPage = (resultSet, pageNumber, pageSize) => {
  if(!resultSet)
  {
    return []
  }
  
  const startIndex = (pageNumber-1) * pageSize
  const endIndex = startIndex + pageSize
  return resultSet.slice(startIndex,endIndex)
}

/*
This method is not used. It is for reference only if needed in future.
Currently, search functionality is achieved through the API call itself which RestCountries API provides
*/
export const sortCountries = (sourceCountries) => {
  const tempCountries = [...sourceCountries]

  return tempCountries.sort(function(countryA, countryB){
    let countryALowerCase = normalizeString(countryA.name.toLowerCase());
    let countryBLowerCase = normalizeString(countryB.name.toLowerCase());
    if (countryALowerCase < countryBLowerCase) {return -1;}
    if (countryALowerCase > countryBLowerCase) {return 1;}
    return 0;
  });
}

// this function should convert special characters to ascii characters for sorting purpose.
// current application only requires one character but we can add more here if we need to
const normalizeString = (str) => {
  str.replace('Å','A')
}
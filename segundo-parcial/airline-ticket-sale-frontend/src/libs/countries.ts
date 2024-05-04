export const getAllCountries = async () => {
  // define url
  const url = "http://localhost:8080/countries";
  
  // make request
  const response = await fetch(url);

  // get data from response
  const data = response.json()

  // return values
  return data
};

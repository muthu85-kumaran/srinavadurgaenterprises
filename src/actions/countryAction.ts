import { Country, State, City } from "country-state-city";

export const getAllCountries = async () => {
  return Country.getAllCountries();
};

export const getAllStatesOfIndia = async () => {
  return State.getStatesOfCountry("IN");
};

export const getAllCitiesOfState = async (stateCode: string) => {
  return City.getCitiesOfState("IN", stateCode);
};

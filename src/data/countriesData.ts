import { Country, State } from '@/types/address';
import countriesJson from './countries.json';

export const countries: Country[] = countriesJson as Country[];

export const getCountryByIso2 = (iso2: string): Country | undefined => {
  return countries.find((country) => country.iso2 === iso2);
};

export const getCountryByName = (name: string): Country | undefined => {
  return countries.find((country) => country.name === name);
};

export const getStatesByCountry = (countryName: string): State[] => {
  const country = getCountryByName(countryName);
  return country?.states || [];
};

export const getCitiesByState = (
  countryName: string,
  stateName: string,
): string[] => {
  const states = getStatesByCountry(countryName);
  const state = states.find((s) => s.name === stateName);
  return state?.cities || [];
};

export const getAllCitiesByCountry = (countryName: string): string[] => {
  const states = getStatesByCountry(countryName);
  const allCities = states.flatMap((state) => state.cities);
  return [...new Set(allCities)].sort(); // Remove duplicates and sort
};

export const validatePhoneNumber = (
  phone: string,
  countryName: string,
): boolean => {
  if (!phone || !countryName) return false;

  const country = getCountryByName(countryName);
  if (!country?.phone?.regex) return true; // If no regex, consider valid

  try {
    const regex = new RegExp(country.phone.regex);
    return regex.test(phone.trim());
  } catch {
    return true; // If regex is invalid, consider valid
  }
};

export const validatePostalCode = (
  postalCode: string,
  countryName: string,
): boolean => {
  if (!postalCode || !countryName) return false;

  const country = getCountryByName(countryName);
  if (!country?.postal?.regex) return true; // If no regex, consider valid

  try {
    const regex = new RegExp(country.postal.regex);
    return regex.test(postalCode.trim());
  } catch {
    return true; // If regex is invalid, consider valid
  }
};

export const formatPhoneNumber = (
  phone: string,
  countryName: string,
): string => {
  const country = getCountryByName(countryName);
  if (!country?.phone?.code) return phone;

  // Basic formatting - add country code if not present
  const cleanPhone = phone.replace(/\D/g, '');
  const countryCode = country.phone.code.replace('+', '');

  if (!cleanPhone.startsWith(countryCode)) {
    return `${country.phone.code} ${phone}`;
  }

  return phone;
};

export const hasStates = (countryName: string): boolean => {
  const country = getCountryByName(countryName);
  return (country?.states?.length || 0) > 0;
};

export const hasPostalCode = (countryName: string): boolean => {
  const country = getCountryByName(countryName);
  return !!country?.postal;
};

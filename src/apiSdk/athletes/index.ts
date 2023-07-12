import axios from 'axios';
import queryString from 'query-string';
import { AthleteInterface, AthleteGetQueryInterface } from 'interfaces/athlete';
import { GetQueryInterface } from '../../interfaces';

export const getAthletes = async (query?: AthleteGetQueryInterface) => {
  const response = await axios.get(`/api/athletes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAthlete = async (athlete: AthleteInterface) => {
  const response = await axios.post('/api/athletes', athlete);
  return response.data;
};

export const updateAthleteById = async (id: string, athlete: AthleteInterface) => {
  const response = await axios.put(`/api/athletes/${id}`, athlete);
  return response.data;
};

export const getAthleteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/athletes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAthleteById = async (id: string) => {
  const response = await axios.delete(`/api/athletes/${id}`);
  return response.data;
};

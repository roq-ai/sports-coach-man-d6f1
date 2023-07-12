import axios from 'axios';
import queryString from 'query-string';
import { VenueInterface, VenueGetQueryInterface } from 'interfaces/venue';
import { GetQueryInterface } from '../../interfaces';

export const getVenues = async (query?: VenueGetQueryInterface) => {
  const response = await axios.get(`/api/venues${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVenue = async (venue: VenueInterface) => {
  const response = await axios.post('/api/venues', venue);
  return response.data;
};

export const updateVenueById = async (id: string, venue: VenueInterface) => {
  const response = await axios.put(`/api/venues/${id}`, venue);
  return response.data;
};

export const getVenueById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/venues/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVenueById = async (id: string) => {
  const response = await axios.delete(`/api/venues/${id}`);
  return response.data;
};

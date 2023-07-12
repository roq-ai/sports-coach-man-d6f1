import axios from 'axios';
import queryString from 'query-string';
import { TrainingDayInterface, TrainingDayGetQueryInterface } from 'interfaces/training-day';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingDays = async (query?: TrainingDayGetQueryInterface) => {
  const response = await axios.get(`/api/training-days${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingDay = async (trainingDay: TrainingDayInterface) => {
  const response = await axios.post('/api/training-days', trainingDay);
  return response.data;
};

export const updateTrainingDayById = async (id: string, trainingDay: TrainingDayInterface) => {
  const response = await axios.put(`/api/training-days/${id}`, trainingDay);
  return response.data;
};

export const getTrainingDayById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-days/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingDayById = async (id: string) => {
  const response = await axios.delete(`/api/training-days/${id}`);
  return response.data;
};

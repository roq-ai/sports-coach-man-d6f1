import * as yup from 'yup';

export const trainingDayValidationSchema = yup.object().shape({
  date: yup.date().required(),
  venue_id: yup.string().nullable(),
  training_group_id: yup.string().nullable(),
});

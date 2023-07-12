import * as yup from 'yup';

export const trainingGroupValidationSchema = yup.object().shape({
  schedule: yup.string().required(),
  club_id: yup.string().nullable(),
});

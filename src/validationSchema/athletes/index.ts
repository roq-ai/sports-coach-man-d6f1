import * as yup from 'yup';

export const athleteValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});

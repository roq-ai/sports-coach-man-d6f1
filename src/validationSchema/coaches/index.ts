import * as yup from 'yup';

export const coachValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});

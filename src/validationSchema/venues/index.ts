import * as yup from 'yup';

export const venueValidationSchema = yup.object().shape({
  name: yup.string().required(),
  club_id: yup.string().nullable(),
});

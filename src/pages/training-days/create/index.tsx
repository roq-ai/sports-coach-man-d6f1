import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTrainingDay } from 'apiSdk/training-days';
import { Error } from 'components/error';
import { trainingDayValidationSchema } from 'validationSchema/training-days';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { VenueInterface } from 'interfaces/venue';
import { TrainingGroupInterface } from 'interfaces/training-group';
import { getVenues } from 'apiSdk/venues';
import { getTrainingGroups } from 'apiSdk/training-groups';
import { TrainingDayInterface } from 'interfaces/training-day';

function TrainingDayCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingDayInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingDay(values);
      resetForm();
      router.push('/training-days');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingDayInterface>({
    initialValues: {
      date: new Date(new Date().toDateString()),
      venue_id: (router.query.venue_id as string) ?? null,
      training_group_id: (router.query.training_group_id as string) ?? null,
    },
    validationSchema: trainingDayValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Training Day
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.date ? new Date(formik.values?.date) : null}
                onChange={(value: Date) => formik.setFieldValue('date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<VenueInterface>
            formik={formik}
            name={'venue_id'}
            label={'Select Venue'}
            placeholder={'Select Venue'}
            fetcher={getVenues}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<TrainingGroupInterface>
            formik={formik}
            name={'training_group_id'}
            label={'Select Training Group'}
            placeholder={'Select Training Group'}
            fetcher={getTrainingGroups}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.schedule}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'training_day',
    operation: AccessOperationEnum.CREATE,
  }),
)(TrainingDayCreatePage);
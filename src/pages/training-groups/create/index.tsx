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
import { createTrainingGroup } from 'apiSdk/training-groups';
import { Error } from 'components/error';
import { trainingGroupValidationSchema } from 'validationSchema/training-groups';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ClubInterface } from 'interfaces/club';
import { getClubs } from 'apiSdk/clubs';
import { TrainingGroupInterface } from 'interfaces/training-group';

function TrainingGroupCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingGroup(values);
      resetForm();
      router.push('/training-groups');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingGroupInterface>({
    initialValues: {
      schedule: '',
      club_id: (router.query.club_id as string) ?? null,
    },
    validationSchema: trainingGroupValidationSchema,
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
            Create Training Group
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="schedule" mb="4" isInvalid={!!formik.errors?.schedule}>
            <FormLabel>Schedule</FormLabel>
            <Input type="text" name="schedule" value={formik.values?.schedule} onChange={formik.handleChange} />
            {formik.errors.schedule && <FormErrorMessage>{formik.errors?.schedule}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ClubInterface>
            formik={formik}
            name={'club_id'}
            label={'Select Club'}
            placeholder={'Select Club'}
            fetcher={getClubs}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
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
    entity: 'training_group',
    operation: AccessOperationEnum.CREATE,
  }),
)(TrainingGroupCreatePage);

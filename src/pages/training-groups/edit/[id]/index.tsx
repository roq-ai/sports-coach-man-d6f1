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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTrainingGroupById, updateTrainingGroupById } from 'apiSdk/training-groups';
import { Error } from 'components/error';
import { trainingGroupValidationSchema } from 'validationSchema/training-groups';
import { TrainingGroupInterface } from 'interfaces/training-group';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ClubInterface } from 'interfaces/club';
import { getClubs } from 'apiSdk/clubs';

function TrainingGroupEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrainingGroupInterface>(
    () => (id ? `/training-groups/${id}` : null),
    () => getTrainingGroupById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrainingGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrainingGroupById(id, values);
      mutate(updated);
      resetForm();
      router.push('/training-groups');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TrainingGroupInterface>({
    initialValues: data,
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
            Edit Training Group
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrainingGroupEditPage);

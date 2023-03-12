import React, { FC, ReactElement, useRef } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { CollectionRequestDto } from '../../store/CollectionsStore/service';
import { object, string } from 'yup';
import { useLoading } from '../../hooks/useLoading';
import { FormikHelpers, useFormik } from 'formik';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues: CollectionRequestDto = {
  title: '',
};

const validationSchema = object().shape({
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(30, 'E-mail must be maximum 30 characters'),
});

const CreateCollectionModal: FC<Props> = observer((props): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const { isOpen, onClose } = props;
  const { isLoading, setIsLoading } = useLoading();
  const titleRef = useRef(null);

  const submitHandler = async (payload: CollectionRequestDto, formikHelpers: FormikHelpers<CollectionRequestDto>) => {
    setIsLoading(true);

    try {
      await collectionsStore.createCollection(payload);
      formikHelpers.setSubmitting(false);
      onClose();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });
  const { touched, dirty, errors, getFieldProps } = formik;

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={titleRef} size={'3xl'}>
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>Create collection</ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <form id={'create-collection-form'} onSubmit={formik.handleSubmit}>
            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.title && dirty && Boolean(errors.title)}>
              <FormLabel>Title</FormLabel>

              <Input ref={titleRef} placeholder={'Enter collection title'} type="text" {...getFieldProps('title')}/>

              {touched.title && dirty && Boolean(errors.title) && <FormErrorMessage>{touched.title && dirty && errors.title}</FormErrorMessage>}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button form={'create-collection-form'} isLoading={isLoading} colorScheme={'telegram'} variant={'outline'} type={'submit'} mr={4}>Create</Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CreateCollectionModal;

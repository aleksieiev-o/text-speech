import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
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
import { Collection } from '../../store/CollectionsStore';

enum UpdateCollectionMode {
  CREATE = 'create',
  UPDATE = 'update',
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCollection: Collection;
}

const initialValues: CollectionRequestDto = {
  title: '',
};

const validationSchema = object().shape({
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(30, 'Title must be maximum 30 characters'),
});

const UpdateCollectionModal: FC<Props> = observer((props): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const { isOpen, onClose, currentCollection } = props;
  const { isLoading, setIsLoading } = useLoading();
  const titleRef = useRef(null);
  const [mode, setMode] = useState<UpdateCollectionMode>(UpdateCollectionMode.CREATE);

  const submitHandler = async (payload: CollectionRequestDto, formikHelpers: FormikHelpers<CollectionRequestDto>) => {
    setIsLoading(true);

    try {
      switch (mode) {
        case UpdateCollectionMode.CREATE: {
          await collectionsStore.createCollection(payload);
          formikHelpers.setSubmitting(false);
          onClose();
          break;
        }
        case UpdateCollectionMode.UPDATE: {
          if (currentCollection.title !== payload.title) {
            await collectionsStore.updateCollection(currentCollection.id, payload);
            formikHelpers.setSubmitting(false);
            onClose();
          } else {
            formikHelpers.setFieldError('title', 'Existing title is the same as new title. Please, change title.');
          }
          break;
        }
        default: break;
      }
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
  const { touched, dirty, errors, getFieldProps, setFieldValue } = formik;

  const setInitialFiledValues = async () => {
    await setFieldValue('title', currentCollection.title || '');
  };

  useEffect(() => {
    setMode(currentCollection.id ? UpdateCollectionMode.UPDATE : UpdateCollectionMode.CREATE);
    setInitialFiledValues();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={titleRef} size={'3xl'}>
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          {mode === UpdateCollectionMode.UPDATE ? 'Update collection' : 'Create collection'}
        </ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <form id={'update-collection-form'} onSubmit={formik.handleSubmit}>
            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.title && dirty && Boolean(errors.title)}>
              <FormLabel>Title</FormLabel>

              <Input ref={titleRef} placeholder={'Enter collection title'} type="text" {...getFieldProps('title')}/>

              {touched.title && dirty && Boolean(errors.title) && <FormErrorMessage>{touched.title && dirty && errors.title}</FormErrorMessage>}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button form={'update-collection-form'} isLoading={isLoading} colorScheme={'telegram'} variant={'outline'} type={'submit'} mr={4}>
            {mode === UpdateCollectionMode.UPDATE ? 'Update' : 'Create'}
          </Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default UpdateCollectionModal;

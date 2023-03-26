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
import { useTranslation } from 'react-i18next';

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
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(100, 'Title must be maximum 100 characters'),
});

const UpdateCollectionModal: FC<Props> = observer((props): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const { isOpen, onClose, currentCollection } = props;
  const { isLoading, setIsLoading } = useLoading();
  const titleRef = useRef(null);
  const [mode, setMode] = useState<UpdateCollectionMode>(UpdateCollectionMode.CREATE);
  const { t } = useTranslation(['common', 'collectionsList']);

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
          if (currentCollection.title === payload.title) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            formikHelpers.setFieldError('title', t('cards_list_update_modal_same_data_error', { ns: 'cardsList' })!);
          } else {
            await collectionsStore.updateCollection(currentCollection.id, payload);
            formikHelpers.setSubmitting(false);
            onClose();
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

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalContent>
        <ModalHeader>
          {mode === UpdateCollectionMode.UPDATE
            ? t('collections_list_update_modal_title', { ns: 'collectionsList' })
            : t('collections_list_create_modal_title', { ns: 'collectionsList' })}
        </ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <form id={'update-collection-form'} onSubmit={formik.handleSubmit}>
            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.title && dirty && Boolean(errors.title)}>
              <FormLabel>
                {t('common_input_title_label')}
              </FormLabel>

              <Input
                ref={titleRef}
                placeholder={t('collections_list_update_modal_collection_title_placeholder', { ns: 'collectionsList' })!}
                type="text"
                {...getFieldProps('title')}/>

              {touched.title && dirty && Boolean(errors.title) && <FormErrorMessage>{touched.title && dirty && errors.title}</FormErrorMessage>}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            form={'update-collection-form'}
            isLoading={isLoading}
            colorScheme={'telegram'}
            variant={'outline'}
            type={'submit'}
            title={mode === UpdateCollectionMode.UPDATE ? t('common_update_btn')! : t('common_create_btn')!}
            mr={4}>
            {mode === UpdateCollectionMode.UPDATE ? t('common_update_btn') : t('common_create_btn')}
          </Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'} title={t('common_close_btn')!}>
            {t('common_close_btn')}
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* eslint-enable */}
    </Modal>
  );
});

export default UpdateCollectionModal;

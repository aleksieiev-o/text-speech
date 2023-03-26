import React, { FC, ReactElement, useContext, useEffect, useRef, useState } from 'react';
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
  ModalOverlay, Select,
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { useLoading } from '../../hooks/useLoading';
import { FormikHelpers, useFormik } from 'formik';
import { useCollectionsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Collection, CreateCollectionRequestDto } from '../../store/CollectionsStore';
import { useTranslation } from 'react-i18next';
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';

enum UpdateCollectionMode {
  CREATE = 'create',
  UPDATE = 'update',
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCollection: Collection;
}

const initialValues: CreateCollectionRequestDto = {
  title: '',
  defaultLang: '',
  voiceURI: '',
};

const validationSchema = object().shape({
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(100, 'Title must be maximum 100 characters'),
  voiceURI: string().required('Default collection language is required'),
});

const UpdateCollectionModal: FC<Props> = observer((props): ReactElement => {
  const collectionsStore = useCollectionsStore();
  const { isOpen, onClose, currentCollection } = props;
  const { isLoading, setIsLoading } = useLoading();
  const { voicesList } = useContext(SpeechUtteranceContext);
  const titleRef = useRef(null);
  const [mode, setMode] = useState<UpdateCollectionMode>(UpdateCollectionMode.CREATE);
  const { t } = useTranslation(['common', 'collectionsList']);

  const submitHandler = async (payload: CreateCollectionRequestDto, formikHelpers: FormikHelpers<CreateCollectionRequestDto>) => {
    setIsLoading(true);

    try {
      const {title, voiceURI} = payload;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const {lang} = voicesList.find((voice) => voice.voiceURI === voiceURI)!;

      const collectionDto: CreateCollectionRequestDto = {
        title,
        defaultLang: lang,
        voiceURI,
      };

      switch (mode) {
        case UpdateCollectionMode.CREATE: {
          await collectionsStore.createCollection(collectionDto);
          formikHelpers.setSubmitting(false);
          onClose();
          break;
        }
        case UpdateCollectionMode.UPDATE: {
          if (currentCollection.title === payload.title && currentCollection.voiceURI === voiceURI) {
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            formikHelpers.setFieldError('title', t('common_update_same_data_error')!);
            formikHelpers.setFieldError('voiceURI', t('common_update_same_data_error')!);
            /* eslint-enable */
          } else {
            await collectionsStore.updateCollection(currentCollection.id, collectionDto);
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
            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.title && dirty && Boolean(errors.title)} mb={2}>
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

            <FormControl isRequired={true} isReadOnly={isLoading}>
              <FormLabel>Card text language</FormLabel>

              <Select placeholder={t('collections_list_update_modal_collection_default_lang_placeholder', { ns: 'collectionsList' })!} {...getFieldProps('voiceURI')}>
                {
                  voicesList.map((voice) => <option value={voice.voiceURI} key={voice.voiceURI}>{voice.name}</option>)
                }
              </Select>

              {touched.voiceURI && dirty && Boolean(errors.voiceURI) && <FormErrorMessage>{touched.voiceURI && dirty && errors.voiceURI}</FormErrorMessage>}
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

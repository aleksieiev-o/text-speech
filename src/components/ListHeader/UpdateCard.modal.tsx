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
  ModalOverlay, Select, Textarea,
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { useLoading } from '../../hooks/useLoading';
import { FormikHelpers, useFormik } from 'formik';
import { useCardsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { Card, CreateCardRequestDto } from '../../store/CardsStore';
import { useCurrentCollectionId } from '../../hooks/useCurrentCollectionId';
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';

enum UpdateCardMode {
  CREATE = 'create',
  UPDATE = 'update',
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentCard: Card;
}

const initialValues: CreateCardRequestDto = {
  parentId: '',
  title: '',
  text: '',
  textLang: '',
};

const validationSchema = object().shape({
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(30, 'E-mail must be maximum 30 characters'),
  text: string().required('Text is required').min(1, 'Text must be at least 1 character').max(240, 'Text must be maximum 200 characters'),
  textLang: string().required('Card text language is required'),
});

const UpdateCardModal: FC<Props> = observer((props): ReactElement => {
  const cardsStore = useCardsStore();
  const currentCardId = useCurrentCollectionId();
  const { voicesList } = useContext(SpeechUtteranceContext);
  const { isOpen, onClose, currentCard } = props;
  const { isLoading, setIsLoading } = useLoading();
  const titleRef = useRef(null);
  const [mode, setMode] = useState<UpdateCardMode>(UpdateCardMode.CREATE);

  const submitHandler = async (payload: CreateCardRequestDto, formikHelpers: FormikHelpers<CreateCardRequestDto>) => {
    setIsLoading(true);

    try {
      const {title, text, textLang} = payload;

      const cardDto: CreateCardRequestDto = {
        parentId: currentCardId,
        title: title,
        text: text,
        textLang: textLang,
      };

      switch (mode) {
        case UpdateCardMode.CREATE: {
          await cardsStore.createCard(cardDto);
          formikHelpers.setSubmitting(false);
          onClose();
          break;
        }
        case UpdateCardMode.UPDATE: {
          if (currentCard.title === title && currentCard.text === text && currentCard.textLang === textLang) {
            formikHelpers.setFieldError('title', 'Existing data is the same as new data. Please, change some field.');
            formikHelpers.setFieldError('textLang', 'Existing data is the same as new data. Please, change some field.');
            formikHelpers.setFieldError('text', 'Existing data is the same as new data. Please, change some field.');
          } else {
            await cardsStore.updateCard(currentCard.id, cardDto);
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
    await setFieldValue('title', currentCard.title || '');
    await setFieldValue('text', currentCard.text || '');
    await setFieldValue('textLang', currentCard.textLang || '');
  };

  useEffect(() => {
    setMode(currentCard.id ? UpdateCardMode.UPDATE : UpdateCardMode.CREATE);
    setInitialFiledValues();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={titleRef} size={'3xl'}>
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          {mode === UpdateCardMode.UPDATE ? 'Update card' : 'Create card'}
        </ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <form id={'update-card-form'} onSubmit={formik.handleSubmit}>
            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.title && dirty && Boolean(errors.title)} mb={2}>
              <FormLabel>Title</FormLabel>

              <Input ref={titleRef} placeholder={'Enter card title'} type="text" {...getFieldProps('title')}/>

              {touched.title && dirty && Boolean(errors.title) && <FormErrorMessage>{touched.title && dirty && errors.title}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired={true} isReadOnly={isLoading} mb={2}>
              <FormLabel>Card text language</FormLabel>

              <Select placeholder={'Select card text language'} {...getFieldProps('textLang')}>
                {
                  voicesList.map((voice) => <option value={voice.lang} key={voice.voiceURI}>{voice.name}</option>)
                }
              </Select>

              {touched.textLang && dirty && Boolean(errors.textLang) && <FormErrorMessage>{touched.textLang && dirty && errors.textLang}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired={true} isReadOnly={isLoading} isInvalid={touched.text && dirty && Boolean(errors.text)}>
              <FormLabel>Text</FormLabel>

              <Textarea placeholder={'Enter card text'} rows={7} {...getFieldProps('text')}/>

              {touched.text && dirty && Boolean(errors.text) && <FormErrorMessage>{touched.text && dirty && errors.text}</FormErrorMessage>}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button form={'update-card-form'} isLoading={isLoading} colorScheme={'telegram'} variant={'outline'} type={'submit'} mr={4}>
            {mode === UpdateCardMode.UPDATE ? 'Update' : 'Create'}
          </Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default UpdateCardModal;

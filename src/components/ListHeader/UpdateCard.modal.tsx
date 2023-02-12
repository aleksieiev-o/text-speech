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
  ModalOverlay, Textarea,
} from '@chakra-ui/react';
import { object, string } from 'yup';
import { useLoading } from '../../hooks/useLoading';
import { FormikHelpers, useFormik } from 'formik';
import { useCardsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { CreateCardRequestDto } from '../../store/CardsStore';
import { useCurrentCollectionId } from '../../hooks/useCurrentCollectionId';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues: CreateCardRequestDto = {
  parentId: '',
  title: '',
  text: '',
};

const validationSchema = object().shape({
  title: string().required('Title is required').min(1, 'Title must be at least 1 character').max(30, 'E-mail must be maximum 30 characters'),
  text: string().required('Text is required').min(1, 'Text must be at least 1 character'),
});

const UpdateCardModal: FC<Props> = observer((props): ReactElement => {
  const cardsStore = useCardsStore();
  const currentCollectionId = useCurrentCollectionId();
  const { isOpen, onClose } = props;
  const { isLoading, setIsLoading } = useLoading();
  const titleRef = useRef(null);

  const submitHandler = async (payload: CreateCardRequestDto, formikHelpers: FormikHelpers<CreateCardRequestDto>) => {
    setIsLoading(true);

    try {
      await cardsStore.createCard({
        parentId: currentCollectionId,
        title: payload.title,
        text: payload.text,
      });
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
        <ModalHeader>Create card</ModalHeader>

        <ModalCloseButton/>

        <ModalBody>
          <form id={'create-card-form'} onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>

              <Input ref={titleRef} placeholder={'Enter card title'} type="text" {...getFieldProps('title')}/>

              {touched.title && dirty && Boolean(errors.title) && <FormErrorMessage>{touched.title && dirty && errors.title}</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel>Text</FormLabel>

              <Textarea placeholder={'Enter card text'} rows={7} {...getFieldProps('text')}/>

              {touched.text && dirty && Boolean(errors.text) && <FormErrorMessage>{touched.text && dirty && errors.text}</FormErrorMessage>}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button form={'create-card-form'} isLoading={isLoading} colorScheme={'facebook'} variant={'outline'} type={'submit'} mr={4}>Create</Button>

          <Button onClick={onClose} colorScheme={'gray'} variant={'outline'}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default UpdateCardModal;

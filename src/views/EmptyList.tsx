import React, { ElementType, FC, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Stack, Text } from '@chakra-ui/react';

interface Props {
  emptyListMessage: string;
  buttonText: string;
  buttonIcon: ElementType;
  buttonHandler: () => void;
}

const EmptyList: FC<Props> = observer((props): ReactElement => {
  const { emptyListMessage, buttonText, buttonHandler, buttonIcon } = props;

  return (
    <Stack
    w={'full'}
    h={'full'}
    direction={'column'}
    alignItems={'center'}
    justifyContent={'center'}>
      <Text mb={4}>{emptyListMessage}</Text>

      <Button
      onClick={buttonHandler}
      colorScheme={'facebook'}
      variant={'outline'}
      leftIcon={<Icon as={buttonIcon}/>}>
        {buttonText}
      </Button>
    </Stack>
  );
});

export default EmptyList;

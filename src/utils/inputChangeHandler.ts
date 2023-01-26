import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function inputChangeHandler(e: inputChangeEventType, setStateHandler: Dispatch<SetStateAction<string>>): void {
  setStateHandler(e.target.value);
}

export type inputChangeEventType = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

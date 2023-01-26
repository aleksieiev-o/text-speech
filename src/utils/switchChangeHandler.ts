import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function switchChangeHandler(e: switchChangeEventType, setStateHandler: Dispatch<SetStateAction<boolean>>): void {
  setStateHandler(e.target.checked);
}

export type switchChangeEventType = ChangeEvent<HTMLInputElement>;

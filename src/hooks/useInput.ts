import { ChangeEvent, useState } from "react";
import { useValidation } from "./useValidations";

export interface IUseInput {
  empty: boolean;
  minLength: boolean;
  maxLength: boolean;
  inputValid: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  dirty: boolean;
}

export const useInput = (initValue: string, valids: object) => {
  const [value, setValue] = useState<string>(initValue);
  const [dirty, setDirty] = useState<boolean>(false);
  const valid = useValidation(value, valids);

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  const setValueExternally = (newValue: string) => {
    setValue(newValue);
    setDirty(false); // Сбрасываем "грязное" состояние, если нужно
  };

  return { value, onChange, onBlur, dirty, setValueExternally, ...valid };
};

import {ChangeEvent, useState} from 'react';

export const useForm = <T extends Object>(initialValue: T) => {
  const [form, setForm] = useState(initialValue);

  const onChange = (value: ChangeEvent<HTMLInputElement>) => {
    const {target} = value;
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return {
    ...form,
    form,
    onChange,
  };
};
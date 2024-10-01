import { useState } from "react";

type FormValues = {
  [key: string]: any;
};

const useForm = <T extends FormValues> (
  initialValues: T,
  onSubmit: (values: T) => void
) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue = e.target.type === 'number' ? Number(value) : value;

    setFormValues({
      ...formValues,
      [name]: newValue
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return {
    formValues,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;

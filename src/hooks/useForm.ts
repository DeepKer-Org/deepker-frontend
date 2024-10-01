import { useState } from "react";

type FormValues = {
  [key: string]: string;
};

const useForm = (
  initialValues: FormValues,
  onSubmit: (values: FormValues) => void
) => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
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

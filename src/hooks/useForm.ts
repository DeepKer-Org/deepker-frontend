import { useState } from "react";

type FormValues = {
  [key: string]: any;
};

// Use a generic hook to allow for flexible form types
const useForm = <T extends FormValues>(
    initialValues: T,
    onSubmit: (values: T) => void
) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    // If the input type is 'number', convert value to a number
    const newValue = type === 'number' ? Number(value) : value;

    // Always use the callback form of setFormValues to avoid stale state issues
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues); // Trigger the provided onSubmit function with current form values
  };

  return {
    formValues,
    handleInputChange,
    handleSubmit,
    setFormValues, // Expose setFormValues if needed for direct updates (like the doctor select case)
  };
};

export default useForm;

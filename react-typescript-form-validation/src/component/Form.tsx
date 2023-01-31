import React, { useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

const Form: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = (values: FormValues) => {
    const error = initialValues;
    if (!values.name) {
      error.name = 'Name is required';
    }
    if (!values.email) {
      error.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = 'Email is invalid';
    }
    if (!values.password) {
      error.password = 'Password is required';
    }
    console.log("values", values)
    return error;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return (
    <>
       { console.log(errors)}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange} />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
    </>
  )
};

export default Form;

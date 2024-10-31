import React from 'react';
import { Field } from 'formik';

const TextInput = ({ name, label, type, placeholder }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <Field name={name} type={type} placeholder={placeholder} />
  </>
);

export default TextInput;

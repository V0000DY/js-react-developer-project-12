/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { useField } from 'formik';
import { Form, FloatingLabel } from 'react-bootstrap';

const FormikInput = forwardRef((props, ref) => {
  const {
    name,
    label,
    className,
    ...rest
  } = props;
  const [field, meta] = useField(name);
  return (
    <Form.Group>
      <FloatingLabel label={label} className={className}>
        <Form.Control
          name={name}
          id={name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={meta.error && meta.touched}
          ref={ref}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {meta.error}
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form.Group>
  );
});

export default FormikInput;

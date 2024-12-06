/* eslint-disable react/display-name */
import React, { forwardRef, memo, useEffect } from 'react';
import { useField } from 'formik';
import { FloatingLabel, Form } from 'react-bootstrap';

const TextInput = forwardRef((props, ref) => {
  const {
    label,
    className,
    controlId,
    type,
    autoComplete,
    placeholder,
    value,
  } = props;
  const [field, meta, helpers] = useField(controlId);

  console.log(`В инпут пришла ошибка = ${meta.error}`);
  useEffect(() => {
    if (value) {
      const { setValue } = helpers;
      setValue(value);
    }
  }, [helpers, value]);

  return (
    <Form.Group>
      <FloatingLabel
        controlId={controlId}
        label={label}
        className={className}
      >
        <Form.Control
          name={controlId}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={meta.error && meta.touched}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required
          ref={ref}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {meta.error}
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form.Group>
  );
});

export default memo(TextInput);

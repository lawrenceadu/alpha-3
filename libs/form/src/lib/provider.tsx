'use client';

import React, { Dispatch, FormEvent, JSX, SetStateAction, useEffect, useRef, useState } from 'react'; // prettier-ignore
import { FieldErrors, useForm, FormProvider, UseFormReset, UseFormSetValue, UseFormTrigger, Path, DefaultValues, UseFormRegister } from 'react-hook-form'; // prettier-ignore
import { AnyObjectSchema, ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEqual } from 'lodash';

export interface FormProps<T extends Record<string, any>> {
  initialValues: T;
  enableReinitialize?: boolean;
  validationSchema?: ObjectSchema<any>;
  onSubmit: (
    values: T,
    actions: {
      setErrors: (errors: Partial<Record<keyof T, string | string[]>>) => void;
      resetForm: UseFormReset<T>;
      setSubmitting: Dispatch<SetStateAction<boolean>>;
    },
    callback?: () => void
  ) => void;
  children: (props: {
    values: T;
    register: UseFormRegister<T>;
    isValid: boolean;
    isTouched: boolean;
    isSubmitting: boolean;
    handleSubmit: (e?: FormEvent<HTMLFormElement>) => void;
    errors: FieldErrors<T>;
    resetForm: UseFormReset<T>;
    setFieldValue: UseFormSetValue<T>;
    setFieldTouched: UseFormTrigger<T>;
  }) => React.ReactNode;
}

export function HookForm<T extends Record<string, any>>({
  children,
  onSubmit,
  initialValues: _initialValues,
  validationSchema,
  enableReinitialize,
}: FormProps<T>): JSX.Element {
  /**
   * ref
   */
  const initialValues = useRef(_initialValues);
  const isMounted = React.useRef<boolean>(false);

  /**
   * form
   */
  const methods = useForm<T>({
    resolver: validationSchema
      ? yupResolver(validationSchema as AnyObjectSchema)
      : undefined,
    defaultValues: initialValues.current as DefaultValues<T>,
  });

  /**
   * state
   */
  const [isSubmitting, setSubmitting] = useState(false);

  /**
   * variables
   */
  const {
    reset,
    trigger,
    setError,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods;

  /**
   * functions
   */
  const setErrors = (
    formErrors: Partial<Record<keyof T, string | string[]>>
  ) => {
    Object.entries(formErrors).forEach(([key, value]) => {
      setError(key as Path<T>, {
        type: 'manual',
        message: Array.isArray(value) ? value.join(', ') : value,
      });
    });
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      isMounted.current === true &&
      !isEqual(initialValues.current, _initialValues)
    ) {
      if (enableReinitialize) {
        initialValues.current = _initialValues;
        reset(initialValues.current);
      }
    }
  }, [enableReinitialize, _initialValues, reset]);

  return (
    <FormProvider {...methods}>
      {children({
        errors,
        isValid,
        register,
        isSubmitting,
        resetForm: reset,
        isTouched: isDirty,
        values: getValues() as T,
        setFieldTouched: trigger,
        setFieldValue: methods.setValue,
        handleSubmit: handleSubmit((data) => {
          setSubmitting(true);
          onSubmit(data, { setErrors, resetForm: reset, setSubmitting });
        }),
      })}
    </FormProvider>
  );
}

export default HookForm;

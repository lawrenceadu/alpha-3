'use client';

import {
  string,
  number,
  mixed,
  array,
  StringSchema,
  NumberSchema,
  MixedSchema,
} from 'yup';
import {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from 'react-phone-number-input';

/**
 * regex
 */
const urlRegex =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w?[a-zA-Z-_%/@?]+)*([^/\w?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const stringRegex = /^[-a-zA-Z_ ]+$/;

/**
 * injectors
 */
let t: (...props: any) => string;

const injectTranslate = (_t: typeof t) => {
  t = _t;
};

/**
 * validation object for string
 */
const requireAlpha = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .matches(stringRegex, t?.('onlyStrings'))
    .min(2, t?.('minimum', { length: 2 }))
    .trim();
  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

/**
 * validation object for number
 */
const requireNumber = (
  field: string,
  required = true,
  schema: NumberSchema = number()
) => {
  schema = schema.typeError(t?.('onlyNumbers'));
  return required
    ? schema
        .min(0, 'Cannot be less than zero')
        .required(t?.('isRequired', { field }))
    : schema;
};

const requireString = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.trim();
  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

/**
 * validation object for phone number
 */
const requirePhoneNumber = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  return schema.test('isValidPhone', t?.('enterValid', { field }), (value) =>
    value
      ? isValidPhoneNumber(value) && isPossiblePhoneNumber(value)
      : !required
  );
};

/**
 * validation object for conditions
 */
const requireWhen = (dependencyField: string, field: string) =>
  string().when(`${dependencyField}`, (fld, schema) =>
    fld ? schema.required(t?.('isRequired', { field })) : schema
  );

/**
 * validation object for test conditions
 */
const requireTest = (
  field: string,
  condition: (value: string | undefined) => boolean
) =>
  string().test('require', t?.('isRequired', { field }), (value) =>
    condition(value)
  );

/**
 * validation object for email
 */
const requireEmail = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.email(t?.('enterValid', { field }));
  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

/**
 * validation object for array
 */
const requireArray = (field: string, required = true, schema = array()) => {
  return required
    ? schema.min(1).required(t?.('isRequired', { field }))
    : schema;
};

/**
 * validation object for file upload
 */
const requireFile = ({
  field,
  size = 5,
  type = [],
  schema = mixed(),
  required = true,
}: {
  field: string;
  size?: number;
  type?: ('image' | 'pdf' | 'csv' | 'docs')[];
  schema?: MixedSchema;
  required?: boolean;
}) => {
  const format: string[] = (() => {
    let format: string[] = [];

    if (type.includes('image')) {
      format = [
        ...format,
        ...['image/jpg', 'image/jpeg', 'image/png', 'image/webp'],
      ];
    }

    if (type.includes('pdf')) {
      format = [...format, 'application/pdf'];
    }

    if (type.includes('csv')) {
      format = [
        ...format,
        'text/csv',
        'text/x-csv',
        'application/vnd.ms-excel',
      ];
    }

    if (type.includes('docs')) {
      format = [
        ...format,
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
    }

    return format;
  })();

  return schema
    .test(
      'fileName',
      t?.('isRequired', { field }),
      (value: any) => !!value?.name || !required
    )
    .test('fileSize', t?.('file.tooLarge', { field }), (value: any) => {
      return value?.size ? value.size <= size * 1000000 : !required;
    })
    .test('fileType', t?.('file.unsupported'), (value: any) =>
      value?.type
        ? format.length === 0
          ? true
          : format.includes(value?.type)
        : !required
    );
};

/**
 * password validation schema
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @returns
 */
const requirePassword = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, t?.('password.format'))
    .min(8, t?.('password.minimum', { length: 8 }));

  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

/**
 * Full name validator
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @returns
 */
const requireFullName = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .test('name', t('fullname.format'), (value) => {
      const name = value?.trim()?.split(' ');
      if (name && name?.length <= 1) {
        return false;
      }

      return true;
    })
    .test('length', t('fullname.minimum'), (value) => {
      const name = value?.trim()?.split(' ');

      if (name && name?.find((i) => i.length < 2)) {
        return false;
      }

      return true;
    });

  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

/**
 * OTP code validator
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @param {*} length
 * @returns
 */
const requireOTP = (
  field: string,
  length = 6,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .matches(/^[0-9]+$/, t?.('otp.format'))
    .min(length, t?.('otp.minimum', { length }))
    .max(length, t?.('otp.minimum', { length }));

  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

const requireUrl = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(urlRegex, t?.('enterValid', { field: 'url' }));
  return required ? schema.required(t?.('isRequired', { field })) : schema;
};

export default Object.assign(
  {},
  {
    requireAlpha,
    injectTranslate,
    requireString,
    requireNumber,
    requireArray,
    requireEmail,
    requirePhoneNumber,
    requireFile,
    requireWhen,
    requireTest,
    requirePassword,
    requireFullName,
    requireOTP,
    requireUrl,
  }
);

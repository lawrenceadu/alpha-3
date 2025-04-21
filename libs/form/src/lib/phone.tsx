'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { countries, helper } from '@alpha-3/utils';
import { parsePhoneNumber } from 'react-phone-number-input';
import { useFormContext } from 'react-hook-form';
import { Input, Select } from '@alpha-3/ui';
import { CountryCode } from 'libphonenumber-js';
import PhoneInput from 'react-phone-number-input/react-hook-form-input';
import Image from 'next/image';

const DEFAULTCOUNTRY = 'KE';

export interface PhoneProps {
  name?: string;
  defaultCountry?: CountryCode;
  onCountryChange?: (country: CountryCode) => void;
}

export function Phone({
  name,
  onCountryChange,
  defaultCountry = DEFAULTCOUNTRY,
}: PhoneProps) {
  /**
   * form
   */
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  /**
   * variables
   */
  const hasError = !!helper.getNestedValue(errors, name as string);
  const { input } = Input.inputVariants();

  /**
   * states
   */
  const [country, setCountry] = useState<CountryCode>(() => {
    const value = getValues(name as string);

    if (value) {
      const phoneNumber = parsePhoneNumber(value);
      if (phoneNumber?.country) {
        return phoneNumber.country;
      }
    }

    return defaultCountry;
  });

  return (
    <Input.Root {...{ hasError }}>
      <Input.Wrapper>
        <Selector
          initialCountry={country}
          onChange={(country) => {
            setCountry(country);
            onCountryChange?.(country as CountryCode);
          }}
        />
        <PhoneInput
          international
          control={control}
          country={country}
          name={name as string}
          className={input()}
        />
      </Input.Wrapper>
    </Input.Root>
  );
}

function Selector({
  name,
  onChange,
  initialCountry,
}: PhoneProps & {
  initialCountry: CountryCode;
  onChange: Dispatch<SetStateAction<CountryCode>>;
}) {
  /**
   * states
   */
  const [country, setCountry] = useState<CountryCode>(initialCountry);

  return (
    <Select.Root
      onValueChange={(value) => {
        setCountry(value as CountryCode);
        onChange(value as CountryCode);
      }}
      defaultValue={country}
      variant="inline"
    >
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {countries
          .filter((i) => i.dial_code)
          .map((item, key) => (
            <Select.Item key={key} value={item.iso2}>
              <Image
                width={20}
                height={20}
                alt={`${item.name} flag`}
                className="w-[18px] h-3 aspect-square object-cover rounded"
                src={
                  process.env.NEXT_PUBLIC_FLAG_URL?.replace(
                    '[country]',
                    item.iso2
                  ) as string
                }
              />
              <span className="group-has-[&]/trigger:hidden">
                {item.name} {item.dial_code}
              </span>
            </Select.Item>
          ))}
      </Select.Content>
    </Select.Root>
  );
}

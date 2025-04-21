'use client';

import { countries } from '@alpha-3/utils';
import { Select } from '@alpha-3/ui';

export interface CountryProps {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: unknown) => void;
}

export function Country({
  value,
  onChange,
  disabled,
  placeholder,
}: CountryProps) {
  return (
    <Select.Root
      disabled={disabled}
      defaultValue={value}
      onValueChange={(value) =>
        onChange(countries.find((i) => i.iso2 === value))
      }
    >
      <Select.Trigger>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Select.Content>
        {countries.map((country, key) => (
          <Select.Item key={key} value={country.iso2}>
            <Select.ItemIcon
              className="bg-no-repeat bg-cover rounded-full"
              style={{
                backgroundImage: process.env.NEXT_PUBLIC_FLAG_URL?.replace(
                  '[country]',
                  country.iso2
                ),
              }}
            />
            {country.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

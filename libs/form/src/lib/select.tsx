'use client';

import { useState } from 'react';
import { Select as UiSelect, Input } from '@alpha-3/ui';
import { RemixiconComponentType } from '@remixicon/react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { cn, helper } from '@alpha-3/utils';

export interface SelectProps {
  icon?: any;
  name?: string;
  value?: string;
  withIcon?: boolean;
  placeholder?: string;
  withSearch?: boolean;
  triggerClassName?: string;
  options: {
    label: string;
    value: string;
    icon?: RemixiconComponentType;
  }[];
  onChange: (value: unknown) => void;
}

export function Select({
  icon,
  name,
  value,
  options,
  onChange,
  withIcon,
  dsiabled,
  placeholder,
  triggerClassName,
  withSearch = false,
  ...props
}: SelectProps & { [x: string]: any }) {
  /**
   * form
   */
  const {
    formState: { errors },
  } = useFormContext();

  /**
   * states
   */
  const [search, setSearch] = useState<string>();

  /**
   * translations
   */
  const c = useTranslations('common');

  /**
   * variables
   */
  const hasError = !!helper.getNestedValue(errors, name as string);
  const localOptions = (() => {
    if (search) {
      return options.filter((i) =>
        i.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    return options;
  })();

  return (
    <UiSelect.Root
      value={value}
      disabled={dsiabled}
      onValueChange={(value) =>
        onChange(options.find((i) => i.value === value))
      }
      {...{ ...props, hasError }}
    >
      <UiSelect.Trigger className={cn(triggerClassName)}>
        {icon && <UiSelect.TriggerIcon variant="Bold" as={icon} />}
        <UiSelect.Value placeholder={placeholder} />
      </UiSelect.Trigger>
      <UiSelect.Content>
        {withSearch && (
          <Input.Root
            size="xsmall"
            className={cn('pb-1 mb-1', 'sticky top-0 z-[1]')}
          >
            <Input.Wrapper>
              <Input.Input
                autoFocus
                placeholder={c('search')}
                onChange={({ currentTarget: { value } }) => setSearch(value)}
              />
            </Input.Wrapper>
          </Input.Root>
        )}
        {localOptions.map((option, key) => (
          <UiSelect.Item key={key} value={option.value}>
            {option?.icon && <UiSelect.ItemIcon as={option.icon} />}
            {option.label}
          </UiSelect.Item>
        ))}
      </UiSelect.Content>
    </UiSelect.Root>
  );
}

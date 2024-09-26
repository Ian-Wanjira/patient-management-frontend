'use client';

import Image from 'next/image';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, ControllerRenderProps } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { FormFieldTypes } from '@/components/forms/PatientForm';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import 'react-datepicker/dist/react-datepicker.css';

type CustomFormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  renderSkeleton?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<any, string>,
  ) => React.ReactNode;
};

type RenderFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
  props: CustomFormFieldProps;
};

const RenderField = ({ field, props }: RenderFieldProps) => {
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    children,
    disabled,
    name,
    label,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={disabled}
          />
        </FormControl>
      );

    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md  border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              showTimeSelect={showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              dateFormat={dateFormat}
              closeOnScroll={true}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

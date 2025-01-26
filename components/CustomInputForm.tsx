import React from "react";
import { TypeOf, z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { FormFieldType } from "./form/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";

type CustomProps = {
  control: Control<any>;
  name: FieldPath<any>;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
};
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    control,
    name,
    fieldType,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${iconAlt}`}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={`${placeholder}`}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="NG"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    default:
      break;
  }
};

const CustomInputForm = (props: CustomProps) => {
  const {
    control,
    name,
    fieldType,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
  } = props;
  return (
    <div>
      <FormField
        control={control}
        name={`${name}`}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomInputForm;

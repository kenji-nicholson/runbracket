import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { PropsWithChildren } from "react";
import { FieldValues } from "react-hook-form";
import { Controller, UseControllerProps } from "react-hook-form";

interface FormTextFieldProps<T> extends UseControllerProps<T> {
  [x: string]: any;
}

interface FormCheckboxProps<T> extends UseControllerProps<T> {
  [x: string]: any;
  label?: string;
}

export const FormTextField = <T extends FieldValues>(
  props: PropsWithChildren<FormTextFieldProps<T>>
) => {
  const { name, control, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          id={name}
          error={Boolean(error?.message)}
          helperText={error?.message}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export const FormCheckbox = <T extends FieldValues>(
  props: PropsWithChildren<FormCheckboxProps<T>>
) => {
  const { name, control, label, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              color="secondary"
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
              {...rest}
            />
          }
        />
      )}
    />
  );
};

import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { PropsWithChildren } from "react";
import { FieldValues } from "react-hook-form";
import { Controller, UseControllerProps } from "react-hook-form";

interface FormTextFieldProps {
  name: string;
  [x: string]: any;
}

interface FormCheckboxProps {
  [x: string]: any;
  label?: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = (props) => {
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
      defaultValue=""
    />
  );
};

export const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const { name, control, label, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={true}
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

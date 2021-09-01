import { TextField } from "@material-ui/core";
import { PropsWithChildren } from "react";
import { FieldValues } from "react-hook-form";
import { Controller, UseControllerProps } from "react-hook-form";

interface FormTextFieldProps<T> extends UseControllerProps<T> {
  label?: string;
  autoComplete?: string;
  type?: string;
  autoFocus?: boolean;
}

export const FormTextField = <T extends FieldValues>(
  props: PropsWithChildren<FormTextFieldProps<T>>
) => {
  const { name, control, label, autoComplete, type, children } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          fullWidth
          id={name}
          label={label}
          autoComplete={autoComplete}
          error={Boolean(error?.message)}
          helperText={error?.message}
          type={type}
          {...field}
          {...children}
        />
      )}
    />
  );
};

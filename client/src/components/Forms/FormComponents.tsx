import { TextField } from "@material-ui/core";
import { PropsWithChildren } from "react";
import { FieldValues } from "react-hook-form";
import { Controller, UseControllerProps } from "react-hook-form";

interface FormTextFieldProps<T> extends UseControllerProps<T> {
  [x: string]: any;
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
          variant="outlined"
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

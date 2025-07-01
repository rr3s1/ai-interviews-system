import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define a generic interface for the component props to ensure type safety.
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
}

// A reusable FormField component using React Hook Form's Controller.
const FormField = <T extends FieldValues>({
                                              control,
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                          }: FormFieldProps<T>) => {
    return (
        // The Controller component bridges the UI input with the form's state.
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="label">{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="input"
                            type={type}
                            placeholder={placeholder}
                            {...field} // Spreads onChange, onBlur, value, and ref into the input.
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormField;
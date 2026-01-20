import * as React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "~/lib/utils";

export interface FormFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  id?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, error, label, id, ...props }, ref) => {
    // Use React's useId hook for SSR-safe ID generation
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-2">
        {label && (
          <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : "false"}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {error && (
          <p className="text-destructive text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };

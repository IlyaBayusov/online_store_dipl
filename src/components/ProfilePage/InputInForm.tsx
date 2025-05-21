import React, { forwardRef } from "react";

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const InputInForm = forwardRef<HTMLInputElement, Props>(({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="py-1.5 px-4 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
      {...rest}
    />
  );
});

InputInForm.displayName = "InputInForm";

export default InputInForm;

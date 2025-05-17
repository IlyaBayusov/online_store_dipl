import React, { forwardRef } from "react";

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const InputInForm = forwardRef<HTMLInputElement, Props>(({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="py-2 px-4 rounded-md mt-1 w-full text-white bg-transparent border border-[#6F00FF]"
      {...rest}
    />
  );
});

InputInForm.displayName = "InputInForm";

export default InputInForm;

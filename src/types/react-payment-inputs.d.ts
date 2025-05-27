declare module "react-payment-inputs" {
  interface InputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    "aria-label"?: string;
  }

  interface InputPropsWithHandlers extends InputProps {
    onChange?: (event: { target: { value: string } }) => void;
    onBlur?: () => void;
    value?: string;
  }

  export function usePaymentInputs(): {
    getCardNumberProps: (props?: InputPropsWithHandlers) => InputProps;
    getExpiryDateProps: (props?: InputPropsWithHandlers) => InputProps;
    getCVCProps: (props?: InputPropsWithHandlers) => InputProps;
  };
}

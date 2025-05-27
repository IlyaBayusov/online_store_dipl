declare module "react-payment-inputs" {
  interface InputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
    "aria-label": string;
  }

  export function usePaymentInputs(): {
    getCardNumberProps: () => InputProps;
    getExpiryDateProps: () => InputProps;
    getCVCProps: () => InputProps;
  };
}

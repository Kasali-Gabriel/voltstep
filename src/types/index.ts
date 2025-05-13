export interface AuthHeaderProps {
  title: string;
  description?: string;
  isSemibold?: boolean;
}

export interface AuthContinueBtnProps {
  BtnText?: string;
  isSignUp?: boolean;
  isGlobalLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export interface AuthOptionProps {
  text: string;
  btnText: string;
  href: string;
}

export interface EmailState {
  email: string;
  setEmail: (value: string) => void;
}

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
}


export interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  isMobile: boolean;
}

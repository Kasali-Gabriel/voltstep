import { UseFormReturn } from "react-hook-form";

export interface DeliveryAddress {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDeliveryAddressInput {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface UpdateDeliveryAddressInput {
  id: string;
  title?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface AddressFormProps {
  formData: CreateDeliveryAddressInput;
  setFormData: (data: CreateDeliveryAddressInput) => void;
  editingAddress: DeliveryAddress | null;
  isSubmitting: boolean;
  onSubmit: (data: CreateDeliveryAddressInput) => void;
  onCancel?: () => void;
  hideDefaultOption?: boolean;
  maxHeight?: boolean;
}

export interface AddressDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingAddress: DeliveryAddress | null;
  formData: CreateDeliveryAddressInput;
  setFormData: (data: CreateDeliveryAddressInput) => void;
  isSubmitting: boolean;
  onSubmit: (data: CreateDeliveryAddressInput & { id?: string }) => void;
  onCancel: () => void;
}

export interface checkoutDeliveryAddressProps {
  userId?: string;
  deliveryAddresses: DeliveryAddress[];
  selectedDeliveryAddress: string;
  setSelectedDeliveryAddress: (id: string) => void;
  guestDeliveryData: CreateDeliveryAddressInput;
  setGuestDeliveryData: (data: CreateDeliveryAddressInput) => void;
  handleGuestDeliverySubmit: (data: CreateDeliveryAddressInput) => void;
  refreshAddresses: () => Promise<void>;
}

export interface AddressListProps {
  addresses: DeliveryAddress[];
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
}

export interface AddressDisplayProps {
  address: DeliveryAddress | null | undefined;
  isSubmitting?: boolean;
  isAccountPage?: boolean;
  onEdit?: (address: DeliveryAddress) => void;
  onDelete?: (id: string) => void;
}

export interface AddressFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldPrefix?: string;
  isSubmitting?: boolean;
}


export interface Country {
  name: string;
  iso2: string;
  capital: string | null;
  currency: {
    currency?: string;
    name?: string;
    symbol: string;
  };
  region: string;
  subregion?: string;
  nationality: string;
  phone?: {
    code: string;
    format?: string;
    regex?: string;
  };
  postal?: {
    format?: string;
    regex?: string;
  };
  timezone: {
    zoneName?: string;
    gmtOffsetName: string;
  };
  states: State[];
}

export interface State {
  name: string;
  type: string;
  cities: string[];
}

'use client';

import { ComboboxFormField } from '@/components/ui/combobox';
import { FloatingLabelInputField } from '@/components/ui/floating-input';
import {
  countries,
  getAllCitiesByCountry,
  getCitiesByState,
  getStatesByCountry,
  hasPostalCode,
  hasStates,
} from '@/data/countriesData';
import { AddressFieldsProps, Country } from '@/types/address';
import { useEffect, useMemo, useState } from 'react';
import { CityInput } from './CityInput';
import { PhoneInput } from './PhoneInput';

export default function AddressFields({
  form,
  fieldPrefix = '',
  isSubmitting,
}: AddressFieldsProps) {
  const getFieldName = (fieldName: string) =>
    fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName;

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');

  // Watch for country and state changes
  const watchedCountry = form.watch(getFieldName('country'));
  const watchedState = form.watch(getFieldName('state'));

  useEffect(() => {
    setSelectedCountry(watchedCountry || '');
  }, [watchedCountry]);

  useEffect(() => {
    setSelectedState(watchedState || '');
  }, [watchedState]);

  // Country options
  const countryOptions = useMemo(() => {
    return countries.map((country: Country) => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  // State options based on selected country
  const stateOptions = useMemo(() => {
    if (!selectedCountry) return [];
    const states = getStatesByCountry(selectedCountry);
    return states.map((state) => ({
      label: state.name,
      value: state.name,
    }));
  }, [selectedCountry]);

  // City options based on selected country and state
  const cityOptions = useMemo(() => {
    if (!selectedCountry) return [];

    if (selectedState) {
      return getCitiesByState(selectedCountry, selectedState);
    }

    return getAllCitiesByCountry(selectedCountry);
  }, [selectedCountry, selectedState]);

  // Handle country change
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);

    // Reset dependent fields when country changes
    form.setValue(getFieldName('state'), '');
    form.setValue(getFieldName('city'), '');
    form.setValue(getFieldName('zipCode'), '');
    form.setValue(getFieldName('phone'), '');
    setSelectedState('');
  };

  // Handle state change
  const handleStateChange = (value: string) => {
    setSelectedState(value);

    // Reset city when state changes
    form.setValue(getFieldName('city'), '');
  };

  // Check if fields should be disabled
  const isStateDisabled = !selectedCountry || !hasStates(selectedCountry);
  const isCityDisabled = !selectedCountry;
  const isZipDisabled = !selectedCountry || !hasPostalCode(selectedCountry);
  const isPhoneDisabled = !selectedCountry;

  return (
    <div
      className={`space-y-4 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="flex flex-col space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
        <FloatingLabelInputField
          form={form}
          name={getFieldName('firstName')}
          label="First Name *"
          type="text"
        />

        <FloatingLabelInputField
          form={form}
          name={getFieldName('lastName')}
          label="Last Name *"
          type="text"
        />
      </div>

      <FloatingLabelInputField
        form={form}
        name={getFieldName('email')}
        label="Email Address *"
        type="email"
      />

      <FloatingLabelInputField
        form={form}
        name={getFieldName('addressLine1')}
        label="Street Address *"
        type="text"
      />

      <FloatingLabelInputField
        form={form}
        name={getFieldName('addressLine2')}
        label="Address Line 2"
        type="text"
      />

      <div className="flex flex-col space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
        <ComboboxFormField
          control={form.control}
          name={getFieldName('country')}
          options={countryOptions}
          placeholder="Country *"
          searchPlaceholder="Search countries..."
          emptyText="No country found."
          className="h-full w-full"
          onValueChange={handleCountryChange}
        />

        <ComboboxFormField
          control={form.control}
          name={getFieldName('state')}
          options={stateOptions}
          placeholder={isStateDisabled ? 'State/Province' : 'State/Province *'}
          searchPlaceholder="Search states..."
          emptyText="No state found."
          disabled={isStateDisabled}
          className="h-full w-full"
          onValueChange={handleStateChange}
        />
      </div>

      <div className="flex flex-col space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
        <CityInput
          form={form}
          name={getFieldName('city')}
          label="City *"
          suggestions={cityOptions}
          disabled={isCityDisabled}
          className="h-full w-full"
        />

        <FloatingLabelInputField
          form={form}
          name={getFieldName('zipCode')}
          label={isZipDisabled ? 'ZIP/Postal Code' : 'ZIP/Postal Code *'}
          type="text"
          disabled={isZipDisabled}
        />
      </div>

      <PhoneInput
        form={form}
        name={getFieldName('phone')}
        countryName={selectedCountry}
        disabled={isPhoneDisabled}
        label="Phone Number *"
      />
    </div>
  );
}

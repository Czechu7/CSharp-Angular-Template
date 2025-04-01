export type AutocompleteBasic = 'on' | 'off';

export type IAutocompletePassword = 'new-password' | 'current-password' | 'one-time-code';

export type IAutocompletePersonalInfo =
  | AutocompleteBasic
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'organization-title'
  | 'organization';

export type IAutocompleteAddress =
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'country'
  | 'country-name'
  | 'postal-code';

export type IAutocompleteTelephone =
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension';

export type IAutocompleteCreditCard =
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type';

export type IAutocompleteDate = 'bday' | 'bday-day' | 'bday-month' | 'bday-year';

export type IAutocompleteTransaction = 'transaction-currency' | 'transaction-amount' | 'language';

export type IAutocompleteMisc = 'sex' | 'photo' | 'url' | 'impp';

export type IAutocomplete =
  | IAutocompletePassword
  | AutocompleteBasic
  | IAutocompletePersonalInfo
  | IAutocompleteAddress
  | IAutocompleteTelephone
  | IAutocompleteCreditCard
  | IAutocompleteDate
  | IAutocompleteTransaction
  | IAutocompleteMisc;

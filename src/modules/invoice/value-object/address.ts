export interface AddressProps {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export default class Address {
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(addressProps: AddressProps) {
    this._street = addressProps.street;
    this._number = addressProps.number;
    this._complement = addressProps.complement;
    this._city = addressProps.city;
    this._state = addressProps.state;
    this._zipCode = addressProps.zipCode;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get state(): string {
    return this._state;
  }

  get city(): string {
    return this._city;
  }

  get zipCode(): string {
    return this._zipCode;
  }
}

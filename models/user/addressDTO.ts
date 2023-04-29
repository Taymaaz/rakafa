export interface AddressDTO {
  id: number;
  province: string;
  city: string;
  postal_code: string;
  address: string;
  receiver_phone: string;
  receiver_name: string;
  receiver_family: string;
  receiver_national_code: string;
}

export interface CreateAddressDTO {
  province: string;
  city: string;
  postal_code: string;
  address: string;
  receiver_phone: string;
  receiver_name: string;
  receiver_family: string;
  receiver_national_code: string;
}

export interface EditAddressDTO {
  id: number;
  province: string;
  city: string;
  postal_code: string;
  address: string;
  receiver_phone: string;
  receiver_name: string;
  receiver_family: string;
  receiver_national_code: string;
}

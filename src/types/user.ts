import { Document } from 'mongoose';

interface Address {
  addr1: string;
  addr2: string;
  city: string;
  country: string;
  zip: number;
}
export interface User extends Document {
  username: string;
  password: string;
  seller: boolean;
  address: Address;
  created: Date;
} 
import { ObjectId } from "mongodb";

export interface DbCustomer {
  _id: ObjectId;
  username: string;
  name: string;
  address: string;
  birthdate: Date;
  email: string;
  accounts: number[];
  tier_and_details: { [id: string]: DbTierAndDetails };
}

interface DbTierAndDetails {
  tier: string;
  benefits: string[];
  active: boolean;
  id: string;
}

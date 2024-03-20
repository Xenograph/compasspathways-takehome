import { ObjectId } from "mongodb";

export interface DbAccount {
    _id: ObjectId;
    account_id: number;
    limit: number;
    products: string[];
}
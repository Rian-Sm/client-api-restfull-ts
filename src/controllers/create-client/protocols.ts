import { Client } from "../../models/client";

export interface CreateClientParams {
  email: string;
  password: string;
}
export interface CreateClientBody {
  email: string;
  password: string;
  accessToken: string;
}

export interface CreateClientResponse {
  id: string;
  email: string;
}

export interface ICreateClientRepository {
  createClient(params: CreateClientBody): Promise<CreateClientResponse>;
}

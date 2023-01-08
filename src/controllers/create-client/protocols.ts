import { Client } from "../../models/client";

export interface CreateClientParams {
  email: string;
  password: string;
  accessToken: string;
}

export interface CreateClientResponse {
  id: string;
  email: string;
}

export interface ICreateClientRepository {
  createClient(params: CreateClientParams): Promise<CreateClientResponse>;
}

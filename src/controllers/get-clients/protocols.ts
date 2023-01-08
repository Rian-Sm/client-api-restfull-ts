import { Client } from "../../models/client";

export interface GetClientParams {
  email: string;
  password: string;
}
export interface GetClientResponse {
  id: string;
  email: string;
  accessToken: string;
}
export interface ClientQueryParam {
  email: string;
}

export interface IGetClientsRepository {
  getClients(): Promise<Client[]>;
  getClient(params: ClientQueryParam): Promise<Client[]>;
}

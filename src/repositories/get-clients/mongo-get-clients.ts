import {
  GetClientParams,
  IGetClientsRepository,
} from "../../controllers/get-clients/protocols";
import { MongoClient } from "../../database/mongo";
import { Client } from "../../models/client";

export class MongoGetClientsRepository implements IGetClientsRepository {
  async getClient(params: GetClientParams): Promise<Client[]> {
    const clients = await MongoClient.db
      .collection<Omit<Client, "id">>("clients")
      .find({ email: params.email })
      .toArray();

    return clients.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
  async getClients(): Promise<Client[]> {
    const clients = await MongoClient.db
      .collection<Omit<Client, "id">>("clients")
      .find({})
      .toArray();

    return clients.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}

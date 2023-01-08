import {
  CreateClientParams,
  CreateClientResponse,
  ICreateClientRepository,
} from "../../controllers/create-client/protocols";
import { MongoClient } from "../../database/mongo";
import { Client } from "../../models/client";

export class MongoCreateClientRepository implements ICreateClientRepository {
  async createClient(
    params: CreateClientParams
  ): Promise<CreateClientResponse> {
    const { insertedId } = await MongoClient.db
      .collection("clients")
      .insertOne(params);

    const client = await MongoClient.db
      .collection<Omit<Client, "id">>("clients")
      .findOne({ _id: insertedId });

    if (!client) {
      throw new Error("Client not created.");
    }

    const { _id, email } = client;

    return { id: _id.toHexString(), email };
  }
}

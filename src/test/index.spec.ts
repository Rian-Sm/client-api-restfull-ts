import { stub } from "sinon";
import { expect } from "chai";
import { CreateClientController } from "../controllers/create-client/create-client";
import { GetClientsController } from "../controllers/get-clients/get-clients";
import { MongoCreateClientRepository } from "../repositories/create-client/mongo-create-client";
import { MongoGetClientsRepository } from "../repositories/get-clients/mongo-get-clients";
import { Client } from "../models/client";
import { GetClientResponse } from "../controllers/get-clients/protocols";
import { EncriptClient } from "../encrypt/encrypt";
import { ErrorResponse } from "../controllers/protocols";

describe("Text Controllers", () => {
  describe("CreateClientController", () => {
    it("Client creation", async () => {
      // arrange
      const mongoCreateClientRepository = new MongoCreateClientRepository();
      const mongoGetClientRepository = new MongoGetClientsRepository();

      const response = {
        id: "123",
        email: "mail@mail.com",
      };

      const input = {
        body: {
          email: "mail@mail.com",
          password: "12345678",
        },
      };
      stub(mongoCreateClientRepository, "createClient").returns(
        Promise.resolve(response)
      );
      stub(mongoGetClientRepository, "getClient").returns(Promise.resolve([]));

      const createClientController = new CreateClientController(
        mongoCreateClientRepository,
        mongoGetClientRepository
      );

      const expectation = {
        id: "123",
        email: "mail@mail.com",
      };

      // act
      const result = await createClientController.handle(input);

      // assert
      expect(result.body).to.deep.equals(expectation);
      expect(result.statusCode).to.equal(201);
    });

    it("Email error already exists", async () => {
      // arrange
      const mongoCreateClientRepository = new MongoCreateClientRepository();
      const mongoGetClientRepository = new MongoGetClientsRepository();

      const response = {
        id: "123",
        email: "mail@mail.com",
      };

      const input = {
        body: {
          email: "mail@mail.com",
          password: "12345678",
        },
      };
      const clients = [
        {
          accessToken: "aaaa",
          email: "mail@mail.com",
          password: "something",
          id: "123",
        },
      ] as Client[];

      stub(mongoCreateClientRepository, "createClient").returns(
        Promise.resolve(response)
      );
      stub(mongoGetClientRepository, "getClient").returns(
        Promise.resolve(clients)
      );

      const createClientController = new CreateClientController(
        mongoCreateClientRepository,
        mongoGetClientRepository
      );

      const expectation = {
        message: "E-mail already registered.",
      };

      // act
      const result = await createClientController.handle(input);

      // assert
      expect(result.body).to.deep.equals(expectation);
      expect(result.statusCode).to.equal(400);
    });
  });

  describe("GetClientsController", () => {
    it("client authentication", async () => {
      // arrange
      const mongoGetClientRepository = new MongoGetClientsRepository();
      const password = "12345678";

      const input = {
        body: {
          email: "mail@mail.com",
          password: password,
        },
      };
      const cryptPass = EncriptClient.encryptHash(password);
      const clients = [
        {
          accessToken: "aaaa",
          email: "mail@mail.com",
          password: cryptPass,
          id: "123",
        },
      ] as Client[];

      stub(mongoGetClientRepository, "getClient").returns(
        Promise.resolve(clients)
      );

      const getClientsController = new GetClientsController(
        mongoGetClientRepository
      );

      const expectation = {
        id: "123",
        email: "mail@mail.com",
        accessToken: "aaaa",
      } as GetClientResponse;

      // act
      const result = await getClientsController.handle(input);

      // assert
      expect(result.body).to.deep.equals(expectation);
      expect(result.statusCode).to.equal(200);
    });

    it("Email error already exists", async () => {
      // arrange
      const mongoGetClientRepository = new MongoGetClientsRepository();
      const password = "12345678";

      const input = {
        body: {
          email: "mail@mail.com",
          password: password + 1,
        },
      };
      const cryptPass = EncriptClient.encryptHash(password);
      const clients = [
        {
          accessToken: "aaaa",
          email: "mail@mail.com",
          password: cryptPass,
          id: "123",
        },
      ] as Client[];

      stub(mongoGetClientRepository, "getClient").returns(
        Promise.resolve(clients)
      );

      const getClientsController = new GetClientsController(
        mongoGetClientRepository
      );

      const expectation = {
        message: "Invalid email or password.",
      } as ErrorResponse;

      // act
      const result = await getClientsController.handle(input);

      // assert
      expect(result.body).to.deep.equals(expectation);
      expect(result.statusCode).to.equal(200);
    });
  });
});

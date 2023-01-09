import validator from "validator";
import { EncriptClient } from "../../encrypt/encrypt";
import { IGetClientsRepository } from "../get-clients/protocols";
import { badRequest, created, internalError } from "../helpers";
import {
  ErrorResponse,
  HttpRequest,
  HttpResponse,
  IController,
} from "../protocols";
import {
  CreateClientParams,
  CreateClientResponse,
  ICreateClientRepository,
} from "./protocols";

export class CreateClientController implements IController {
  createUserRepository: ICreateClientRepository;
  getClientsRepository: IGetClientsRepository;

  constructor(
    createUserRepository: ICreateClientRepository,
    getClientsRepository: IGetClientsRepository
  ) {
    this.createUserRepository = createUserRepository;
    this.getClientsRepository = getClientsRepository;
  }

  async handle(
    httpRequest: HttpRequest<CreateClientParams>
  ): Promise<HttpResponse<CreateClientResponse | ErrorResponse>> {
    try {
      const { body } = httpRequest;
      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (
          httpRequest?.body?.[field as keyof CreateClientParams]?.length == 0 ||
          !httpRequest?.body?.[field as keyof CreateClientParams]?.length
        ) {
          return badRequest(`Field ${field} is required.`);
        }
      }
      if (!body) {
        return badRequest(`Body is empty.`);
      }

      const emailIsValid = validator.isEmail(body?.email);

      if (!emailIsValid) {
        return badRequest(`E-mail is invalid.`);
      }

      const clients = await this.getClientsRepository.getClient({
        email: body?.email,
      });

      if (clients.length) {
        return badRequest(`E-mail already registered.`);
      }
      if (body.password.length < 7) {
        return badRequest(`Password less than 8`);
      }

      const password = EncriptClient.encryptHash(body.password);
      const dateNow = Date.now();
      const accessToken = EncriptClient.encryptHash(
        dateNow + "Zm9jdXMgdGV4dGls"
      );

      const client = await this.createUserRepository.createClient({
        email: body?.email,
        password,
        accessToken,
      });

      return created<CreateClientResponse>(client);
    } catch (error) {
      console.log(error);
      return internalError();
    }
  }
}

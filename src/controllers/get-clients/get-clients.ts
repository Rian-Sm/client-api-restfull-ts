import validator from "validator";
import { EncriptClient } from "../../encrypt/encrypt";
import { Client } from "../../models/client";
import { badRequest, internalError, ok, unauthorized } from "../helpers";
import { ErrorResponse, HttpRequest, IController } from "../protocols";
import {
  GetClientParams,
  GetClientResponse,
  IGetClientsRepository,
} from "./protocols";

export class GetClientsController implements IController {
  getClientsRepository: IGetClientsRepository;

  constructor(getClientsRepository: IGetClientsRepository) {
    this.getClientsRepository = getClientsRepository;
  }

  async handle(httpRequest: HttpRequest<GetClientParams>) {
    try {
      const { body } = httpRequest;
      const requiredFields = ["email", "password"];

      for (const field of requiredFields) {
        if (
          httpRequest?.body?.[field as keyof GetClientParams]?.length == 0 ||
          !httpRequest?.body?.[field as keyof GetClientParams]?.length
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

      const client = await this.getClientsRepository.getClient({
        email: body?.email,
      });
      if (client.length < 1) {
        return unauthorized("Invalid email or password.");
      } else {
        const firstClient = client[0];
        console.log(firstClient);

        const passwordIsValid = EncriptClient.encryptHashValid(
          body?.password,
          firstClient.password
        );
        if (!passwordIsValid) {
          return ok<ErrorResponse>({ message: "Invalid email or password." });
        }

        const credentials = {
          id: firstClient.id,
          email: firstClient.email,
          accessToken: firstClient.accessToken,
        } as GetClientResponse;

        return ok<GetClientResponse>(credentials);
      }
    } catch {
      return internalError();
    }
  }
}

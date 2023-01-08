import express from "express";
import { CreateClientController } from "../../controllers/create-client/create-client";
import { GetClientsController } from "../../controllers/get-clients/get-clients";
import { MongoCreateClientRepository } from "../../repositories/create-client/mongo-create-client";
import { MongoGetClientsRepository } from "../../repositories/get-clients/mongo-get-clients";
const router = express.Router();

const mongoCreateClientRepository = new MongoCreateClientRepository();
const mongoGetClientRepository = new MongoGetClientsRepository();

const createClientController = new CreateClientController(
  mongoCreateClientRepository,
  mongoGetClientRepository
);

const getClientsRepository = new GetClientsController(mongoGetClientRepository);

router.post("/create", async (req, res) => {
  const { statusCode, body } = await createClientController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
router.post("/login", async (req, res) => {
  const { statusCode, body } = await getClientsRepository.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default router;

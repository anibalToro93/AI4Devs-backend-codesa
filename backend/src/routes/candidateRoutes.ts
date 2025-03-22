import { Router, RequestHandler } from 'express';
import { addCandidate, getCandidateById } from '../presentation/controllers/candidateController';
import { PrismaClient } from '@prisma/client';
import { CandidateStageController } from '../presentation/controllers/candidate-stage.controller';
import { CandidateStageService } from '../application/services/candidate-stage.service';

const router = Router();
const prisma = new PrismaClient();
const candidateStageService = new CandidateStageService(prisma);
const candidateStageController = new CandidateStageController(candidateStageService);

router.post('/', (async (req, res) => {
  try {
    // console.log(req.body); //Just in case you want to inspect the request body
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
}) as RequestHandler);

router.get('/:id', getCandidateById as RequestHandler);

router.put('/:id/stage', candidateStageController.updateStage.bind(candidateStageController) as RequestHandler);

export default router;

import { Router } from 'express';
import { PositionCandidatesController } from '../presentation/controllers/position-candidates.controller';
import { PositionCandidatesService } from '../application/services/position-candidates.service';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const positionCandidatesService = new PositionCandidatesService(prisma);
const positionCandidatesController = new PositionCandidatesController(positionCandidatesService);

router.get('/:id/candidates', (req, res) => positionCandidatesController.getPositionCandidates(req, res));

export default router; 
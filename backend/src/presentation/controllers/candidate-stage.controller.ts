import { Request, Response } from 'express';
import { CandidateStageService } from '../../application/services/candidate-stage.service';

export class CandidateStageController {
  constructor(private readonly candidateStageService: CandidateStageService) {}

  async updateStage(req: Request, res: Response): Promise<void> {
    try {
      const candidateId = parseInt(req.params.id, 10);
      const { stage } = req.body;

      if (isNaN(candidateId)) {
        res.status(400).json({ error: 'Invalid candidate ID' });
        return;
      }

      if (!stage) {
        res.status(400).json({ error: 'Stage is required' });
        return;
      }

      await this.candidateStageService.updateStage(candidateId, stage);
      res.status(200).json({ message: 'Stage updated successfully' });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Candidate not found') {
          res.status(404).json({ error: error.message });
        } else {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
} 
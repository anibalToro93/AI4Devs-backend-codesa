import { Request, Response } from 'express';
import { PositionCandidatesService } from '../../application/services/position-candidates.service';

export class PositionCandidatesController {
  constructor(private readonly positionCandidatesService: PositionCandidatesService) {}

  async getPositionCandidates(req: Request, res: Response): Promise<void> {
    try {
      const positionId = parseInt(req.params.id, 10);
      
      if (isNaN(positionId)) {
        res.status(400).json({ error: 'Invalid position ID' });
        return;
      }

      const candidates = await this.positionCandidatesService.getPositionCandidates(positionId);
      res.status(200).json({ candidates });
    } catch (error) {
      console.error('Error fetching position candidates:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 
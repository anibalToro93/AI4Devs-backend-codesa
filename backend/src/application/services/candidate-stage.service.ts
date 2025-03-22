import { PrismaClient } from '@prisma/client';

export class CandidateStageService {
  constructor(private readonly prisma: PrismaClient) {}

  async updateStage(candidateId: number, stage: string): Promise<void> {
    // Find the application for this candidate
    const application = await this.prisma.application.findFirst({
      where: {
        candidateId: candidateId,
      },
    });

    if (!application) {
      throw new Error('Candidate not found');
    }

    // Update the stage
    await this.prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        currentInterviewStep: stage,
      },
    });
  }
} 
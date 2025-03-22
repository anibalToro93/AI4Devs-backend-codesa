import { PrismaClient } from '@prisma/client';

interface CandidateInfo {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

interface ApplicationWithRelations {
  candidate: {
    firstName: string;
    lastName: string;
  };
  currentInterviewStep: string;
  interviews: { score: number }[];
}

export class PositionCandidatesService {
  constructor(private readonly prisma: PrismaClient) {}

  async getPositionCandidates(positionId: number): Promise<CandidateInfo[]> {
    const applications = await this.prisma.application.findMany({
      where: {
        positionId: positionId,
      },
      include: {
        candidate: true,
        interviews: true,
      },
    });

    return applications.map((application: ApplicationWithRelations) => {
      const averageScore = this.calculateAverageScore(application.interviews);
      
      return {
        fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
        currentInterviewStep: application.currentInterviewStep,
        averageScore,
      };
    });
  }

  private calculateAverageScore(interviews: { score: number }[]): number {
    if (interviews.length === 0) return 0;
    
    const totalScore = interviews.reduce((sum, interview) => sum + interview.score, 0);
    return totalScore / interviews.length;
  }
} 
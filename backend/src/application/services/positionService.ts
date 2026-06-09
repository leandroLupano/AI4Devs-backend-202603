import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PositionCandidateResult = {
  candidateId: number;
  fullName: string;
  currentInterviewStep: { id: number; name: string };
  averageScore: number | null;
};

export const getPositionCandidates = async (
  positionId: number
): Promise<PositionCandidateResult[]> => {
  const position = await prisma.position.findUnique({ where: { id: positionId } });
  if (!position) {
    const err: any = new Error('Position not found');
    err.status = 404;
    throw err;
  }

  const applications = await prisma.application.findMany({
    where: { positionId },
    select: {
      candidateId: true,
      candidate: { select: { firstName: true, lastName: true } },
      interviewStep: { select: { id: true, name: true } },
      interviews: { select: { score: true } },
    },
  });

  return applications.map((app) => {
    const scoredInterviews = app.interviews.filter((i) => i.score !== null);
    const averageScore =
      scoredInterviews.length > 0
        ? scoredInterviews.reduce((sum, i) => sum + (i.score as number), 0) /
          scoredInterviews.length
        : null;

    return {
      candidateId: app.candidateId,
      fullName: `${app.candidate.firstName} ${app.candidate.lastName}`,
      currentInterviewStep: app.interviewStep,
      averageScore,
    };
  });
};

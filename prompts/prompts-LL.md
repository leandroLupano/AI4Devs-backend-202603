# Prompts - LL

---

## Prompt 1:
- Model: Codex 5.5 Medium plan-mode

# Role:
You are an expert software engineer specialized in AI agents and Prompt Engineering.

# Context:
This repository contains backend and frontend folders. I want to create some endpoints on the backend side.
The README.md file contains project information.
The @instructions.md file contains information related to the task I want to complete.
The @concepts.md file contains useful information about backend development

# Task:
Read the base repository and its README.md to understand its current structure without modifying anything.

Generate a complete prompt to run in an AI agent in order to complete the task of creating new endpoints based on the @instructions.md file.

You must use and implement backend best practices as a Senior Developer, and you must consider the information, best practices, and recommendations described in the @concepts.md file.

Do not modify any files.

Everything must be done in English.

Do not make any assumptions. If you need additional information, you must ask me.

The prompt must instruct the agent to first generate a plan that must be approved before modifying any files.

Also include in the prompt that, when creating the plan, the agent must not make any assumptions either and must ask questions if needed.

---





## Prompt 2:
## Role:
You are a senior backend software engineer specialized in AI-assisted development and prompt-driven implementation.

## Context:
This repository is an AI4Devs backend exercise for the LTI Talent Tracking System. The project is a full-stack app with:
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL.
- Frontend: React.
- Backend entrypoint: backend/src/index.ts
- Existing candidate route: backend/src/routes/candidateRoutes.ts
- Existing candidate controller: backend/src/presentation/controllers/candidateController.ts
- Existing candidate service: backend/src/application/services/candidateService.ts
- Prisma schema: backend/prisma/schema.prisma
- OpenAPI file: backend/api-spec.yaml

## Exercise goal:
Implement two backend endpoints for manipulating candidates in a Kanban-style recruiting process:

1. GET /positions/:id/candidates
   Returns all candidates in process for a given position, meaning all applications for the given positionId.
   Required information:
   - Candidate full name, from the Candidate table.
   - current_interview_step, from the Application table.
   - Average candidate score, based on Interview.score values.

2. PUT /candidates/:id/stage
   Updates the interview stage of a specific candidate.

## Important repository facts:
- Existing backend uses Express routes, controller/service layers, Prisma, and TypeScript strict mode.
- Existing Prisma models include Candidate, Position, Application, Interview, InterviewStep, InterviewFlow, and related entities.
- Application.currentInterviewStep references InterviewStep.id.
- Candidate can have multiple Applications, so updating a candidate stage may be ambiguous without a positionId or applicationId.
- Existing tests are not currently present under backend/src, but Jest and ts-jest are configured.
- The repo includes backend/api-spec.yaml and it should be updated if API behavior changes.

## Mandatory workflow:
1. First, inspect the repository and read:
   - README.md
   - instructions.md
   - concepts.md
   - backend/package.json
   - backend/src/index.ts
   - backend/src/routes/candidateRoutes.ts
   - backend/src/presentation/controllers/candidateController.ts
   - backend/src/application/services/candidateService.ts
   - backend/prisma/schema.prisma
   - backend/api-spec.yaml
2. Do not modify any file during the initial inspection.
3. Generate a detailed implementation plan before changing any file.
4. The plan must be approved by the user before any file is modified.
5. While creating the plan, do not make assumptions. If any required behavior is ambiguous, ask the user before finalizing the plan.
6. Do not proceed to implementation until the user explicitly approves the plan.

## Ambiguities you must resolve before implementation:
- Exact response shape for GET /positions/:id/candidates.
- Whether current_interview_step should return only the step ID, the step name, or both.
- Whether the average score should be calculated from:
  - all interviews for the candidate across all applications, or
  - only interviews belonging to the application for the requested position.
- What value to return when a candidate/application has no scored interviews: null, 0, or omitted.
- Request body for PUT /candidates/:id/stage.
- How to identify the correct Application when a candidate has multiple applications:
  - require positionId,
  - require applicationId,
  - or update all applications for the candidate.
- Whether the new stage must be validated against the position’s interviewFlow.
- Expected error responses and status codes for invalid IDs, missing records, invalid stages, and ambiguous candidate applications.

## Backend engineering requirements:
- Follow the existing project structure unless the plan justifies a small improvement.
- Keep changes focused on the exercise.
- Use TypeScript types for request bodies and service return values.
- Keep route handlers thin; place business logic in the application/service layer.
- Use Prisma queries with explicit select/include shapes.
- Validate route params and request bodies.
- Return clear HTTP status codes:
  - 400 for invalid input.
  - 404 for missing candidate, position, application, or stage.
  - 409 if the request is ambiguous, unless the final approved API design avoids ambiguity.
  - 500 only for unexpected errors.
- Avoid introducing new dependencies unless absolutely necessary and explicitly approved.
- Do not change database schema unless the approved plan requires it.
- Do not break existing candidate creation or GET /candidates/:id behavior.
- Update backend/api-spec.yaml if endpoint contracts are added.
- Add tests if feasible using the existing Jest setup.
- Run verification commands after implementation:
  - npm run build from backend
  - npm test from backend, if tests are added or already available

## Plan requirements:
Your plan must include:
- Summary of the implementation approach.
- Exact API contracts for both endpoints, including paths, request body, response body, and error responses.
- Files to modify.
- Service/controller/route responsibilities.
- Prisma query/update strategy.
- Validation and edge-case behavior.
- Test scenarios.
- Any assumptions explicitly confirmed by the user.

Do not implement anything until the user approves the plan.

---



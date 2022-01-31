import { Candidate } from "./entities/candidate.entity";

export const candidateProviders = [
    {
        provide: 'CANDIDATE_REPOSITORY',
        useValue: Candidate,
    },
];

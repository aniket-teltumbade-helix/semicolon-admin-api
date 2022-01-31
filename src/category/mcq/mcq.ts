import { Mcq } from "./entities/mcq.entity";

export const mcqProviders = [
    {
        provide: 'MCQ_REPOSITORY',
        useValue: Mcq,
    },
];
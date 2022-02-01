import { Program } from './program.entity';

export const progProviders = [
  {
    provide: 'PROG_REPOSITORY',
    useValue: Program,
  },
];

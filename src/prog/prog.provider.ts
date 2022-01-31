import { Prog } from './prog.entity';

export const progProviders = [
  {
    provide: 'PROG_REPOSITORY',
    useValue: Prog,
  },
];

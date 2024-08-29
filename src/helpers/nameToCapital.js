import { toCapitalCase } from './toCapitalCase';

export const nameToCapital = name =>
  name.includes(' ')
    ? name
        .split(' ')
        .map(value => toCapitalCase(value))
        .join(' ')
    : toCapitalCase(name);

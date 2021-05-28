import { random } from '../../utils';

export const generateRandomPipes = ({ count, max, min }) => {
  return new Array(count).fill(1).map(() => ({
    color: '',
    value: random(min, max),
  }));
};

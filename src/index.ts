import isEqual from '@/is-equal';
import { objectType } from './types/Common';

export default function isEqualChecker(obj1: objectType, obj2: objectType): boolean {
  return isEqual(obj1, obj2);
}
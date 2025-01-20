import { objectType } from "./types/Common";

const isEqual = (obj1: objectType, obj2: objectType): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export default isEqual;

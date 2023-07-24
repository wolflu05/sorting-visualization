import { TraceEntry } from "../util/Trace";

import * as selectionSort from "./selectionSort";
import * as insertionSort from "./insertionSort";
import * as bubbleSort from "./bubbleSort";
import * as mergeSort from "./mergeSort";
import * as quickSort from "./quickSort";
// export * as radixLSDSort from './radixLSDSort';
// export * as jsSort from './jsSort';

export interface AlgorithmDefinition {
  name: string;
  description: string;
  complexity?: string;
  colors?: {
    a?: string;
    b?: string;
    c?: string;
    d?: string;
  };
  default: (numbers: number[]) => TraceEntry[];
}

export const algorithms: Record<string, AlgorithmDefinition> = {
  selectionSort,
  insertionSort,
  bubbleSort,
  mergeSort,
  quickSort,
};

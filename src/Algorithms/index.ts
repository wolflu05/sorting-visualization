import { SortItem, TraceEntry } from "../util/Trace";

import * as selectionSort from "./selectionSort";
import * as insertionSort from "./insertionSort";
import * as bubbleSort from "./bubbleSort";
import * as mergeSort from "./mergeSort";
import * as quickSort from "./quickSort";
// import * as radixLSDSort from './radixLSDSort';
// import * as jsSort from "./jsSort";

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
  animateMovements?: boolean;
  default: (numbers: SortItem[]) => TraceEntry[];
}

export const algorithms: Record<string, AlgorithmDefinition> = {
  selectionSort,
  insertionSort,
  bubbleSort,
  mergeSort,
  quickSort,
  // radixLSDSort,
  // jsSort,
};

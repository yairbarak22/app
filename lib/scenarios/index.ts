import type { Scenario } from "../types";
import { YEAR_01 } from "./year01";
import { YEAR_02 } from "./year02";
import { YEAR_03 } from "./year03";
import { YEAR_04 } from "./year04";
import { YEAR_05 } from "./year05";
import { YEAR_06 } from "./year06";
import { YEAR_07 } from "./year07";
import { YEAR_08 } from "./year08";
import { YEAR_09 } from "./year09";
import { YEAR_10 } from "./year10";
import { YEAR_11 } from "./year11";
import { YEAR_12 } from "./year12";
import { YEAR_13 } from "./year13";
import { YEAR_14 } from "./year14";
import { YEAR_15 } from "./year15";

/** The full 15-year scenario graph, one file per career year. */
export const SCENARIOS: Scenario[] = [
  ...YEAR_01,
  ...YEAR_02,
  ...YEAR_03,
  ...YEAR_04,
  ...YEAR_05,
  ...YEAR_06,
  ...YEAR_07,
  ...YEAR_08,
  ...YEAR_09,
  ...YEAR_10,
  ...YEAR_11,
  ...YEAR_12,
  ...YEAR_13,
  ...YEAR_14,
  ...YEAR_15,
];

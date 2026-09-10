import { buildContent } from "./types";
import { DAILY_LIFE } from "./vocab/daily-life";
import { WORK_STUDY } from "./vocab/work-study";
import { PEOPLE_FEELINGS } from "./vocab/people-feelings";
import { OPINIONS_ABSTRACT } from "./vocab/opinions-abstract";
import { TRAVEL_CITY } from "./vocab/travel-city";
import { HEALTH_SPORT } from "./vocab/health-sport";
import { MONEY_TECH_SOCIETY } from "./vocab/money-tech-society";
import { PHRASAL_VERBS } from "./vocab/phrasal-verbs";
import { COLLOCATIONS_TRAPS } from "./vocab/collocations-traps";
import { CHUNKS } from "./chunks";
import { TRAPS } from "./interference";
import { TENSES } from "./grammar/tenses";
import { TENSES_FUTURE } from "./grammar/tenses-future";
import { CONDITIONALS } from "./grammar/conditionals";
import { QUESTIONS_PREPOSITIONS } from "./grammar/questions-prepositions";
import { VERB_PATTERNS } from "./grammar/verb-patterns";
import { MODALS_CONDITIONALS } from "./grammar/modals-conditionals";
import { PASSIVE_REPORTED_QUESTIONS } from "./grammar/passive-reported-questions";
import { NOUNS_PREPOSITIONS_PATTERNS } from "./grammar/nouns-prepositions-patterns";
import { CLAUSES_WORD_ORDER } from "./grammar/clauses-word-order";
import { SPEAKING_PROMPTS, QA_SETS, RETELL_STORIES, READ_ALOUD } from "./fluency/speaking";
import { ORAL_TRANSLATIONS } from "./fluency/oral";
import { ORAL_TRANSLATIONS_2 } from "./fluency/oral2";
import { PLACEMENT } from "./placement";

export const CONTENT = buildContent({
  vocab: [
    ...DAILY_LIFE,
    ...WORK_STUDY,
    ...PEOPLE_FEELINGS,
    ...OPINIONS_ABSTRACT,
    ...TRAVEL_CITY,
    ...HEALTH_SPORT,
    ...MONEY_TECH_SOCIETY,
    ...PHRASAL_VERBS,
    ...COLLOCATIONS_TRAPS,
  ],
  chunks: CHUNKS,
  topics: [
    ...TENSES,
    ...TENSES_FUTURE,
    ...MODALS_CONDITIONALS,
    ...CONDITIONALS,
    ...PASSIVE_REPORTED_QUESTIONS,
    ...QUESTIONS_PREPOSITIONS,
    ...NOUNS_PREPOSITIONS_PATTERNS,
    ...VERB_PATTERNS,
    ...CLAUSES_WORD_ORDER,
  ],
  traps: TRAPS,
  prompts: SPEAKING_PROMPTS,
  qaSets: QA_SETS,
  stories: RETELL_STORIES,
  scripts: READ_ALOUD,
  oral: [...ORAL_TRANSLATIONS, ...ORAL_TRANSLATIONS_2],
  placement: PLACEMENT,
});

export type { Content } from "./types";

import type {
  VocabItem, ChunkItem, GrammarTopic, InterferenceTrap, SpeakingPrompt, QASet, RetellStory, ReadAloudScript, OralTranslation, PlacementItem,
} from "@/lib/types";

/** Everything the engine needs, bundled so tests can pass a tiny fixture. */
export interface Content {
  vocab: VocabItem[];
  vocabById: Map<string, VocabItem>;
  chunks: ChunkItem[];
  chunkById: Map<string, ChunkItem>;
  topics: GrammarTopic[]; // sorted by order
  topicById: Map<string, GrammarTopic>;
  traps: InterferenceTrap[];
  trapById: Map<string, InterferenceTrap>;
  prompts: SpeakingPrompt[];
  qaSets: QASet[];
  stories: RetellStory[];
  scripts: ReadAloudScript[];
  oral: OralTranslation[];
  placement: PlacementItem[];
}

export function buildContent(parts: {
  vocab: VocabItem[]; chunks: ChunkItem[]; topics: GrammarTopic[]; traps: InterferenceTrap[]; prompts: SpeakingPrompt[];
  qaSets: QASet[]; stories: RetellStory[]; scripts: ReadAloudScript[]; oral: OralTranslation[]; placement: PlacementItem[];
}): Content {
  const topics = [...parts.topics].sort((a, b) => a.order - b.order);
  return {
    ...parts,
    topics,
    vocabById: new Map(parts.vocab.map((v) => [v.id, v])),
    chunkById: new Map(parts.chunks.map((c) => [c.id, c])),
    topicById: new Map(topics.map((t) => [t.id, t])),
    trapById: new Map(parts.traps.map((t) => [t.id, t])),
  };
}

# Data Schema

**Document ID:** JARVIS-PDBM-DATA-001
**Version:** 1.0

All data is static and embedded in TypeScript files under `src/data/`. No API calls.

---

## TypeScript Interfaces

```typescript
// src/types/index.ts

export interface KPI {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface DailyMessage {
  day: number;
  date?: string;
  messages: number;
}

export interface SentimentCategory {
  name: 'Productive' | 'Neutral' | 'Frustrated' | 'Exploratory';
  value: number;
  color: string;
}

export interface SentimentEra {
  era: string;
  data: SentimentCategory[];
}

export interface Topic {
  topic: string;
  mentions: number;
}

export interface ActionVerb {
  verb: string;
  weight: number;
  fullMark: number;  // for radar chart max
}

export interface Entity {
  name: string;
  mentions: number;
  type: 'person' | 'company' | 'project';
}

export interface Milestone {
  date: string;
  label: string;
  phase: 1 | 2 | 3 | 4;
  description?: string;
}

export type PhaseColor = {
  [key in 1 | 2 | 3 | 4]: string;
};

export interface DocumentMeta {
  id: string;
  title: string;
  date: string;
  authors: string[];
  org: string;
  location: string;
  period: {
    start: string;
    end: string;
    days: number;
  };
  chapters: number;
}

export interface SectionConfig {
  id: string;
  label: string;
  index: number;
}
```

---

## Data Files

### `src/data/meta.ts`

```typescript
import { DocumentMeta, PhaseColor, SectionConfig } from '../types';

export const META: DocumentMeta = {
  id: 'INFRATEK-PDBM-MTR-2026-FINAL',
  title: 'Jarvis Mid-Term Review',
  date: '2026-04-27',
  authors: ['Sergio', 'Jorge Quiroz'],
  org: 'PDBM Consulting × INFRATEK AI',
  location: 'Dorado, Puerto Rico',
  period: {
    start: '2026-02-10',
    end: '2026-04-26',
    days: 75,
  },
  chapters: 17,
};

export const PHASE_COLORS: PhaseColor = {
  1: '#00F0FF',
  2: '#FFB547',
  3: '#FF4D6A',
  4: '#A855F7',
};

export const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: 'Hero', index: 0 },
  { id: 'kpis', label: 'KPIs', index: 1 },
  { id: 'velocity', label: 'Activity', index: 2 },
  { id: 'sentiment', label: 'Sentiment', index: 3 },
  { id: 'topics', label: 'Topics', index: 4 },
  { id: 'entities', label: 'Entities', index: 5 },
  { id: 'timeline', label: 'Timeline', index: 6 },
  { id: 'arc', label: 'Arc', index: 7 },
];
```

### `src/data/kpis.ts`

```typescript
import { KPI } from '../types';

export const KPIS: KPI[] = [
  { value: 53, label: 'Sessions' },
  { value: 4103, label: 'Interactions' },
  { value: 836, label: 'Memories' },
  { value: 75, label: 'Days Active' },
  { value: 72, label: 'Lifelogs' },
  { value: 256, label: 'Files Inspected' },
];
```

### `src/data/daily-messages.ts`

```typescript
import { DailyMessage } from '../types';

const RAW_VALUES = [
  0,4,50,0,19,20,10,5,15,7,5,75,86,30,3,33,4,17,12,22,
  8,7,7,26,13,8,48,14,12,93,38,73,123,179,41,54,206,44,
  36,9,93,2,2,81,10,27,12,109,3,3,14,181,242,455,125,1078,210
];

export const DAILY_MESSAGES: DailyMessage[] = RAW_VALUES.map((messages, i) => ({
  day: i + 1,
  messages,
}));

export const PEAK_DAY = {
  day: 56,
  date: '2026-04-25',
  value: 1078,
  context: 'GPT-5.5 migration day',
};
```

### `src/data/sentiment.ts`

```typescript
import { SentimentCategory, SentimentEra } from '../types';

export const SENTIMENT_COLORS = {
  Productive: '#00F0FF',
  Neutral: '#3A4A6B',
  Frustrated: '#FF4D6A',
  Exploratory: '#FFB547',
} as const;

export const SENTIMENT_OVERALL: SentimentCategory[] = [
  { name: 'Productive', value: 908, color: SENTIMENT_COLORS.Productive },
  { name: 'Neutral', value: 1966, color: SENTIMENT_COLORS.Neutral },
  { name: 'Frustrated', value: 618, color: SENTIMENT_COLORS.Frustrated },
  { name: 'Exploratory', value: 611, color: SENTIMENT_COLORS.Exploratory },
];

export const SENTIMENT_BY_ERA: SentimentEra[] = [
  {
    era: 'Anthropic Claude',
    data: [
      { name: 'Productive', value: 723, color: SENTIMENT_COLORS.Productive },
      { name: 'Neutral', value: 1284, color: SENTIMENT_COLORS.Neutral },
      { name: 'Frustrated', value: 390, color: SENTIMENT_COLORS.Frustrated },
      { name: 'Exploratory', value: 410, color: SENTIMENT_COLORS.Exploratory },
    ],
  },
  {
    era: 'OpenAI Codex / GPT-5.5',
    data: [
      { name: 'Productive', value: 185, color: SENTIMENT_COLORS.Productive },
      { name: 'Neutral', value: 682, color: SENTIMENT_COLORS.Neutral },
      { name: 'Frustrated', value: 228, color: SENTIMENT_COLORS.Frustrated },
      { name: 'Exploratory', value: 201, color: SENTIMENT_COLORS.Exploratory },
    ],
  },
];

// Pre-computed for grouped bar chart
export const SENTIMENT_COMPARISON = [
  { name: 'Productive', claude: 723, gpt: 185 },
  { name: 'Neutral', claude: 1284, gpt: 682 },
  { name: 'Frustrated', claude: 390, gpt: 228 },
  { name: 'Exploratory', claude: 410, gpt: 201 },
];
```

### `src/data/topics.ts`

```typescript
import { Topic } from '../types';

export const TOPICS: Topic[] = [
  { topic: 'General BD', mentions: 1761 },
  { topic: 'Contacts', mentions: 803 },
  { topic: 'Memory', mentions: 582 },
  { topic: 'Airport RFPs', mentions: 273 },
  { topic: 'Email', mentions: 173 },
  { topic: 'LinkedIn', mentions: 162 },
  { topic: 'Scheduling', mentions: 147 },
  { topic: 'USACE', mentions: 123 },
  { topic: 'Reports', mentions: 71 },
];
```

### `src/data/verbs.ts`

```typescript
import { ActionVerb } from '../types';

export const ACTION_VERBS: ActionVerb[] = [
  { verb: 'Send', weight: 9, fullMark: 10 },
  { verb: 'Draft', weight: 8, fullMark: 10 },
  { verb: 'Search', weight: 5, fullMark: 10 },
  { verb: 'Scan', weight: 5, fullMark: 10 },
  { verb: 'Find', weight: 3, fullMark: 10 },
  { verb: 'Remind', weight: 1, fullMark: 10 },
  { verb: 'Create', weight: 1, fullMark: 10 },
  { verb: 'Review', weight: 1, fullMark: 10 },
];
```

### `src/data/entities.ts`

```typescript
import { Entity } from '../types';

export const ENTITIES: Entity[] = [
  { name: 'Jorge', mentions: 2600, type: 'person' },
  { name: 'PDBM', mentions: 1168, type: 'company' },
  { name: 'MIA', mentions: 723, type: 'company' },
  { name: 'AUS', mentions: 676, type: 'company' },
  { name: 'USACE', mentions: 628, type: 'company' },
  { name: 'PANYNJ', mentions: 589, type: 'company' },
  { name: 'Miami-Dade', mentions: 537, type: 'company' },
  { name: 'Sergio', mentions: 515, type: 'person' },
];
```

### `src/data/milestones.ts`

```typescript
import { Milestone } from '../types';

export const MILESTONES: Milestone[] = [
  { date: 'Feb 10', label: 'Trial Launch', phase: 1 },
  { date: 'Feb 17', label: 'Voice Rules', phase: 1 },
  { date: 'Mar 09', label: 'BIM Search Tiers', phase: 2 },
  { date: 'Mar 11', label: 'Convex + GHL', phase: 2 },
  { date: 'Mar 15', label: 'Chrome CDP', phase: 2 },
  { date: 'Apr 23', label: 'Graph Email', phase: 2 },
  { date: 'Apr 24', label: 'Codex Migration', phase: 3 },
  { date: 'Apr 25', label: 'GPT-5.5 Primary', phase: 3 },
  { date: 'Apr 26', label: 'Midterm Prep', phase: 4 },
];
```

---

## Data Integrity Checklist

| Check | Source Value | Implemented Value | Match |
|-------|-------------|-------------------|-------|
| Total interactions | 4,103 | `KPIS[1].value` | ☐ |
| Total sessions | 53 | `KPIS[0].value` | ☐ |
| Total memories | 836 | `KPIS[2].value` | ☐ |
| Period days | 75 | `META.period.days` | ☐ |
| Lifelogs | 72 | `KPIS[4].value` | ☐ |
| Files inspected | 256 | `KPIS[5].value` | ☐ |
| Daily messages array length | 57 | `DAILY_MESSAGES.length` | ☐ |
| Peak day value | 1,078 | `PEAK_DAY.value` | ☐ |
| Sentiment sum | 4,103 | Sum of SENTIMENT_OVERALL | ☐ |
| Claude sentiment sum | 2,807 | Sum of Claude era | ☐ |
| GPT sentiment sum | 1,296 | Sum of GPT era | ☐ |
| Entity count | 8 | `ENTITIES.length` | ☐ |
| Milestone count | 9 | `MILESTONES.length` | ☐ |
| Jorge mentions | 2,600 | `ENTITIES[0].mentions` | ☐ |

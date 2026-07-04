/**
 * Spaced Repetition System (SRS) Algorithm
 * Based on scientific research: Ebbinghaus forgetting curve + SM-2 algorithm
 * 
 * Grading System:
 * - Again (1): Card returns to box 0, due tomorrow
 * - Good (2): Card advances one box, interval increases
 * - Easy (3): Card advances two boxes, interval increases faster
 */

export interface CardState {
  id: string;
  box: number;           // SRS interval box (0-6)
  due: string;           // ISO date string (YYYY-MM-DD)
  lastReviewed?: string; // ISO date string
  interval: number;      // Days until next review
  timesReviewed: number; // Total times reviewed
  timesCorrect: number;  // Times answered "Good" or "Easy"
}

export interface UserState {
  cardStates: Record<string, CardState>;
  dailyNew: { date: string; count: number };
  activeTags: string[];
  sessionStats: {
    reviewed: number;
    correct: number;
  };
}

// SRS interval schedule (in days)
export const SRS_INTERVALS = [1, 2, 4, 7, 14, 30, 60];
export const NEW_CARD_CAP = 10; // Max new cards per day
export const DECK_VERSION = 1;

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Add N days to a date string
 */
export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Grade a card and update its state
 * 
 * @param cardId - Card ID
 * @param rating - "again" (1), "good" (2), or "easy" (3)
 * @param currentState - Current card state (or undefined if new)
 * @returns Updated card state
 */
export function gradeCard(
  cardId: string,
  rating: "again" | "good" | "easy",
  currentState?: CardState
): CardState {
  const isNew = !currentState;
  let box = currentState ? currentState.box : -1;

  // Update box based on rating
  if (rating === "again") {
    box = 0; // Reset to beginning
  } else if (rating === "good") {
    box = Math.min(box + 1, SRS_INTERVALS.length - 1);
  } else if (rating === "easy") {
    box = Math.min(box + 2, SRS_INTERVALS.length - 1);
  }

  const interval = SRS_INTERVALS[box];
  const due = addDays(todayStr(), interval);
  const timesReviewed = (currentState?.timesReviewed ?? 0) + 1;
  const timesCorrect =
    (currentState?.timesCorrect ?? 0) + (rating === "again" ? 0 : 1);

  return {
    id: cardId,
    box,
    due,
    lastReviewed: todayStr(),
    interval,
    timesReviewed,
    timesCorrect,
  };
}

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(state: CardState): number {
  if (state.timesReviewed === 0) return 0;
  return Math.round((state.timesCorrect / state.timesReviewed) * 100);
}

/**
 * Get learning progress for a card
 */
export function getLearningProgress(state: CardState): {
  stage: string;
  percentage: number;
  description: string;
} {
  const maxBox = SRS_INTERVALS.length - 1;
  const percentage = Math.round((state.box / maxBox) * 100);

  let stage = "New";
  let description = "Just started";

  if (state.box === 0) {
    stage = "Learning";
    description = "Review daily";
  } else if (state.box === 1) {
    stage = "Familiar";
    description = "Every 2 days";
  } else if (state.box === 2) {
    stage = "Competent";
    description = "Every 4 days";
  } else if (state.box === 3) {
    stage = "Proficient";
    description = "Every week";
  } else if (state.box === 4) {
    stage = "Strong";
    description = "Every 2 weeks";
  } else if (state.box === 5) {
    stage = "Mastered";
    description = "Every month";
  } else if (state.box === 6) {
    stage = "Expert";
    description = "Every 2 months";
  }

  return { stage, percentage, description };
}

/**
 * Check if a card is due for review
 */
export function isCardDue(state: CardState, today: string = todayStr()): boolean {
  return state.due <= today;
}

/**
 * Get cards due for review today
 */
export function getCardsDue(
  cardStates: Record<string, CardState>,
  today: string = todayStr()
): string[] {
  return Object.entries(cardStates)
    .filter(([_, state]) => isCardDue(state, today))
    .map(([id, _]) => id);
}

/**
 * Get next review date for a card
 */
export function getNextReviewDate(state: CardState): string {
  return state.due;
}

/**
 * Get days until next review
 */
export function getDaysUntilReview(state: CardState, today: string = todayStr()): number {
  const dueDate = new Date(state.due + "T00:00:00");
  const todayDate = new Date(today + "T00:00:00");
  const diffTime = dueDate.getTime() - todayDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Get statistics for the user's learning progress
 */
export function getStatistics(cardStates: Record<string, CardState>) {
  let learned = 0; // Box 3+
  let familiar = 0; // Box 1-2
  let learning = 0; // Box 0
  let new_ = 0; // Not started

  let totalReviews = 0;
  let totalCorrect = 0;

  for (const state of Object.values(cardStates)) {
    if (state.box >= 3) learned++;
    else if (state.box >= 1) familiar++;
    else if (state.box === 0) learning++;

    totalReviews += state.timesReviewed;
    totalCorrect += state.timesCorrect;
  }

  const totalCards = Object.keys(cardStates).length;
  new_ = totalCards - learned - familiar - learning;

  return {
    learned,
    familiar,
    learning,
    new: new_,
    totalCards,
    totalReviews,
    totalCorrect,
    overallAccuracy:
      totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0,
  };
}

/**
 * Export user data as JSON
 */
export function exportUserData(userState: UserState): string {
  return JSON.stringify(userState, null, 2);
}

/**
 * Import user data from JSON
 */
export function importUserData(jsonString: string): UserState {
  try {
    const data = JSON.parse(jsonString);
    if (!data.cardStates || !data.dailyNew || !data.activeTags) {
      throw new Error("Invalid user data format");
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to import user data: ${error}`);
  }
}

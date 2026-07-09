# Goyo Redesign Specification: Learning Science & Engagement

## 1. Learning Science Enhancements

### Multisensory Learning
- **Text-to-Speech (TTS)**: Integrate Web Speech API to provide audio for every Korean word/sentence. Hearing the word while seeing it strengthens neural pathways (Dual Coding Theory).
- **Phonetic Guidance**: Keep Romanization but make it a secondary "hint" rather than always visible.

### Active Recall Variations
- **Recognition (Multiple Choice)**: For new cards or cards in lower boxes, provide 4 options to choose from. This lowers the barrier to entry while still requiring retrieval.
- **Production (Self-Graded Flashcard)**: The classic "flip and grade" for higher-level retention.

### Contextual Anchoring
- **Example Sentences**: Ensure every word has an example sentence (already partially in data, needs expansion).
- **Thematic Chapters**: Group vocabulary into a "Learning Journey" rather than just tags.

---

## 2. Stickiness & Gamification (The "Hook" Model)

### Daily Streak
- **Visual Streak Counter**: Displayed prominently on the dashboard.
- **Streak Protection**: (Optional) "Streak Freeze" concept for engagement.

### XP & Leveling
- **XP System**: 
  - 10 XP per card reviewed.
  - 5 XP bonus for "Easy" rating.
  - 2x Multiplier for "Perfect Sessions".
- **Leveling**: Users level up based on total XP, providing a sense of "Competence" (Self-Determination Theory).

### Daily Goals
- **Target**: Default goal of 10-20 cards per day.
- **Progress Ring**: Visual representation of daily goal completion.

---

## 3. UI/UX: Zen Minimalism 2.0

### Dashboard (The "Home" Base)
- Large "Start Session" button with "Due" count.
- Streak and XP widgets.
- Learning Journey progress bar.

### Study Session
- **Immersive Mode**: Remove header/footer during study to minimize distractions.
- **Fluid Transitions**: Use `framer-motion` for card entries and exits.
- **Haptic/Sound Feedback**: Subtle sounds for correct/incorrect (if possible).

### The "Journey" View
- A vertical or horizontal path showing "Locked" and "Unlocked" chapters based on progress.

---

## 4. Technical Changes

### Updated `UserState`
```typescript
interface UserState {
  cardStates: Record<string, CardState>;
  stats: {
    totalXp: number;
    level: number;
    streak: number;
    lastStudyDate: string; // YYYY-MM-DD
    dailyGoalMet: boolean;
  };
  settings: {
    dailyGoal: number;
    ttsEnabled: boolean;
    autoPlayAudio: boolean;
  };
}
```

### Component Structure
- `Dashboard`: The main landing view.
- `StudySession`: The active learning interface.
- `Journey`: The progression map.
- `StatsView`: Detailed analytics.
- `TTSController`: Utility for Web Speech API.

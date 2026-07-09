# Goyo: Implementation Summary

## 🎯 Project Overview

**Goyo** is a scientifically-designed Korean language learning app that combines **Spaced Repetition System (SRS)**, **Multisensory Learning**, and **Gamification** to create an engaging, sticky learning experience.

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4 + Radix UI components
- **Animations**: Framer Motion
- **State Management**: React hooks + localStorage
- **Audio**: Web Speech API (native TTS)
- **Deployment**: Vercel

### Key Components

#### 1. **Dashboard** (`Dashboard.tsx`)
- Main landing page showing streak, XP, and progress
- Quick-start "Begin Session" button
- Links to Browse Deck and Full Stats
- Category overview badges

#### 2. **StudySession** (`StudySession.tsx`)
- Immersive full-screen study interface
- 3D card flip animation with Framer Motion
- Integrated TTS with speaker button
- Three-button grading system (Again, Good, Easy)
- Progress bar showing learning stage
- Keyboard-friendly (future enhancement)

#### 3. **MultipleChoice** (`MultipleChoice.tsx`)
- Alternative study mode for varied practice
- 4-option multiple choice with 1 correct answer
- Immediate visual feedback (green/red)
- Useful for lower-level cards and beginners

#### 4. **Journey** (`Journey.tsx`)
- Visualization of learning progression
- 6 chapters unlocked by mastery percentage
- Shows chapter progress and unlock thresholds
- Motivational progression path

#### 5. **Home** (`Home.tsx`)
- Main app orchestrator
- Manages state, queue building, and grading
- Coordinates between Dashboard and StudySession
- Handles XP calculation and streak updates

---

## 🧠 Learning Science Implementation

### 1. Spaced Repetition System (SRS)

**File**: `client/src/lib/srs.ts`

**Key Functions**:
- `gradeCard()`: Updates card state based on user rating
- `calculateLevel()`: Converts XP to level (quadratic scaling)
- `updateStreak()`: Tracks consecutive study days
- `getStatistics()`: Aggregates learning metrics

**Interval Schedule**:
```
Box 0 → 1 day
Box 1 → 2 days
Box 2 → 4 days
Box 3 → 7 days
Box 4 → 14 days
Box 5 → 30 days
Box 6 → 60 days
```

**Grading System**:
- **Again (1)**: Card returns to box 0, due tomorrow
- **Good (2)**: Card advances one box
- **Easy (3)**: Card advances two boxes

### 2. Multisensory Learning

**File**: `client/src/lib/tts.ts`

**Features**:
- Web Speech API integration for Korean TTS
- Automatic pronunciation on card load
- Manual replay button in study session
- Dual Coding Theory: visual (Hangul) + auditory (native pronunciation)

### 3. Active Recall

**Implementation**:
- Primary mode: Flip card to reveal answer (production)
- Secondary mode: Multiple choice (recognition)
- Both modes require retrieval from memory before feedback

---

## 🎮 Gamification System

### XP Calculation
```typescript
- Again: 5 XP
- Good: 10 XP
- Easy: 15 XP
```

### Leveling
- Formula: `Level = floor(sqrt(XP / 100)) + 1`
- Quadratic scaling encourages continued engagement
- Visible in dashboard and stats

### Daily Streaks
- Tracked by `lastStudyDate` in user stats
- Resets if user misses a day
- Highest streak recorded for motivation
- Displayed prominently on dashboard

### Daily Goals
- Default: 10 new cards/day
- Configurable in settings
- Prevents cognitive overload
- Maintains consistency

---

## 📊 Data Structure

### UserState
```typescript
interface UserState {
  cardStates: Record<string, CardState>;
  dailyNew: { date: string; count: number };
  activeTags: string[];
  stats: {
    totalXp: number;
    level: number;
    streak: number;
    lastStudyDate: string;
    highestStreak: number;
  };
  settings: {
    dailyGoal: number;
    ttsEnabled: boolean;
    autoPlayAudio: boolean;
  };
}
```

### CardState
```typescript
interface CardState {
  id: string;
  box: number;           // 0-6
  due: string;           // ISO date
  lastReviewed?: string;
  interval: number;      // Days
  timesReviewed: number;
  timesCorrect: number;
}
```

---

## 🎨 Design System

### Color Palette (OKLCH)
- **Primary (Jade Green)**: `oklch(0.55 0.12 165)` — Growth, learning
- **Success (Emerald)**: `oklch(0.60 0.14 155)` — Correct answers
- **Warning (Coral Red)**: `oklch(0.62 0.18 25)` — "Again" rating
- **Background (Off-white)**: `oklch(0.98 0.001 0)` — Calm surface
- **Text (Charcoal)**: `oklch(0.24 0.01 65)` — High contrast

### Typography
- **Display**: Georgia serif (32px, 400)
- **Heading**: System sans (20px, 600)
- **Body**: System sans (16px, 400)
- **Korean**: Noto Sans KR (24px, 500)
- **Romanization**: Courier mono (13px, 400)

### Animations
- Card flip: 500ms 3D rotation
- Button press: 100ms scale feedback
- Transitions: 200ms fade
- Progress bar: Smooth linear animation

---

## 📱 Responsive Design

- **Mobile-first** approach
- 3:4 aspect ratio cards (optimized for phones)
- Touch-friendly buttons (44px minimum)
- Full-screen immersive study mode
- Adaptive layouts for tablets/desktop

---

## 💾 Data Persistence

- **Storage**: localStorage with versioning
- **Key**: `goyo-progress-v{DECK_VERSION}`
- **Backup**: JSON export/import (future)
- **Sync**: Client-side only (no server required)

---

## 🚀 Future Enhancements

### Phase 2
- [ ] Handwriting recognition for Hangul
- [ ] Audio recording for pronunciation practice
- [ ] Contextual sentences for all words
- [ ] Themed vocabulary decks (business, travel, etc.)

### Phase 3
- [ ] Leaderboards and community features
- [ ] Adaptive difficulty (auto-adjust new card rate)
- [ ] Immersion mode (read stories with hints)
- [ ] Spaced repetition analytics dashboard

### Phase 4
- [ ] Backend sync for cross-device learning
- [ ] Social features (friend challenges, group decks)
- [ ] AI-powered conversation practice
- [ ] Mobile app (React Native)

---

## 🔧 Development Setup

### Installation
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```

### Type Checking
```bash
pnpm check
```

### Build
```bash
pnpm build
```

### Format
```bash
pnpm format
```

---

## 📚 Vocabulary Data

**File**: `client/src/VOCABULARY_DATA.ts`

**Coverage**:
- **245+ curated words** across 10 categories
- Based on TOPIK frequency lists
- High-frequency words for immediate communication
- Each word includes:
  - Korean (Hangul)
  - Romanization
  - English meaning
  - Example sentence (where applicable)

**Categories**:
1. Survival (30 words)
2. Daily Conversation (20 words)
3. Numbers & Time (15 words)
4. Food & Dining (25 words)
5. Shopping (25 words)
6. Transportation (20 words)
7. Emotions & Adjectives (30 words)
8. Body & Health (20 words)
9. Family & Relationships (15 words)
10. Grammar Patterns (20 structures)

---

## 🎓 Learning Science References

- **Ebbinghaus, H.** (1885). *Memory: A Contribution to Experimental Psychology*
- **Cepeda, N. J., et al.** (2006). "Distributed Practice in Verbal Recall Tasks"
- **Roediger, H. L., & Karpicke, J. D.** (2006). "The Power of Testing Memory"
- **Krashen, S. D.** (1985). *The Input Hypothesis*
- **Dweck, C. S.** (2006). *Mindset: The New Psychology of Success* (growth mindset)

---

## 🤝 Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License — See LICENSE file for details

---

## 🌟 Vision

Goyo aims to democratize Korean language learning by making it:
- **Scientifically-grounded**: Based on proven learning research
- **Accessible**: Free, web-based, no sign-up required
- **Engaging**: Gamified to maintain motivation
- **Sustainable**: Designed for long-term habit formation

**Our mission**: Help learners achieve functional Korean proficiency through consistent, enjoyable practice.

---

*Last updated: July 2026*

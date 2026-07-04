import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { VOCABULARY_DATA, TAGS } from "@/const";
import {
  CardState,
  UserState,
  gradeCard,
  todayStr,
  SRS_INTERVALS,
  NEW_CARD_CAP,
  DECK_VERSION,
  getStatistics,
  getLearningProgress,
} from "@/lib/srs";

const STORAGE_KEY = `korean-deck-progress-v${DECK_VERSION}`;

interface CardData {
  id: string;
  front: string;
  back: string;
  tag: string;
  example?: string;
}

export default function Home() {
  const [state, setState] = useState<UserState | null>(null);
  const [queue, setQueue] = useState<CardData[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionExtra, setSessionExtra] = useState(false);
  const [showRoman, setShowRoman] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const newState: UserState = raw
          ? JSON.parse(raw)
          : {
              cardStates: {},
              dailyNew: { date: todayStr(), count: 0 },
              activeTags: ["survival", "daily", "numbers"],
              sessionStats: { reviewed: 0, correct: 0 },
            };

        // Ensure sessionStats exists (for backward compatibility)
        if (!newState.sessionStats) {
          newState.sessionStats = { reviewed: 0, correct: 0 };
        }

        // Reset daily count if new day
        if (newState.dailyNew.date !== todayStr()) {
          newState.dailyNew = { date: todayStr(), count: 0 };
        }

        setState(newState);
      } catch (error) {
        console.error("Failed to load state:", error);
        setState({
          cardStates: {},
          dailyNew: { date: todayStr(), count: 0 },
          activeTags: ["survival", "daily", "numbers"],
          sessionStats: { reviewed: 0, correct: 0 },
        });
      }
    };

    loadState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Build queue when state or active tags change
  useEffect(() => {
    if (!state) return;

    const today = todayStr();
    const due: CardData[] = [];

    // Get due cards
    for (const card of VOCABULARY_DATA) {
      const s = state.cardStates[card.id];
      if (s && s.due <= today) {
        due.push(card);
      }
    }

    // Sort by due date, then by box
    due.sort((a, b) => {
      const da = state.cardStates[a.id];
      const db = state.cardStates[b.id];
      return da.due === db.due ? da.box - db.box : da.due.localeCompare(db.due);
    });

    // Get new cards
    const remainingNew = sessionExtra
      ? NEW_CARD_CAP
      : Math.max(0, NEW_CARD_CAP - state.dailyNew.count);
    const fresh: CardData[] = [];

    for (const card of VOCABULARY_DATA) {
      if (fresh.length >= remainingNew) break;
      if (!state.cardStates[card.id] && state.activeTags.includes(card.tag)) {
        fresh.push(card);
      }
    }

    setQueue(due.concat(fresh));
    setQIndex(0);
    setFlipped(false);
  }, [state?.activeTags, state?.cardStates, sessionExtra]);

  const handleGrade = (rating: "again" | "good" | "easy") => {
    if (qIndex >= queue.length || !state) return;

    const card = queue[qIndex];
    const existing = state.cardStates[card.id];
    const wasNew = !existing;

    const updatedCardState = gradeCard(card.id, rating, existing);
    const newCardStates = {
      ...state.cardStates,
      [card.id]: updatedCardState,
    };

    let newDailyCount = state.dailyNew.count;
    if (wasNew && !sessionExtra) {
      newDailyCount += 1;
    }

    const newState: UserState = {
      ...state,
      cardStates: newCardStates,
      dailyNew: { date: todayStr(), count: newDailyCount },
      sessionStats: {
        reviewed: state.sessionStats.reviewed + 1,
        correct:
          state.sessionStats.correct + (rating === "again" ? 0 : 1),
      },
    };

    setState(newState);
    setQIndex(qIndex + 1);
    setFlipped(false);

    // Show feedback
    const messages = {
      again: "Need more practice on this one",
      good: "Good job! Keep it up",
      easy: "Excellent! Moving to long-term memory",
    };
    toast.success(messages[rating]);
  };

  const handleReset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      toast("Click again to confirm reset", { duration: 3000 });
      resetTimerRef.current = setTimeout(() => setResetArmed(false), 3000);
      return;
    }

    setState({
      cardStates: {},
      dailyNew: { date: todayStr(), count: 0 },
      activeTags: ["survival", "daily", "numbers"],
      sessionStats: { reviewed: 0, correct: 0 },
    });
    setResetArmed(false);
    toast.success("Progress reset");
  };

  const handleTagToggle = (tag: string) => {
    if (!state) return;

    const newActiveTags = state.activeTags.includes(tag)
      ? state.activeTags.filter((t) => t !== tag)
      : [...state.activeTags, tag];

    setState({
      ...state,
      activeTags: newActiveTags,
    });
  };

  const extractKorean = (frontStr: string): string => {
    const idx = frontStr.indexOf(" (");
    return idx >= 0 ? frontStr.slice(0, idx).trim() : frontStr.trim();
  };

  const extractRoman = (frontStr: string): string | null => {
    const m = frontStr.match(/\(([^)]*)\)/);
    return m ? m[1] : null;
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="text-4xl font-serif mb-4">고요</div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = getStatistics(state.cardStates);
  const currentCard = qIndex < queue.length ? queue[qIndex] : null;
  const currentCardState = currentCard ? (state.cardStates[currentCard.id] || null) : null;
  const currentProgress = currentCardState
    ? getLearningProgress(currentCardState)
    : null;

  const isComplete = qIndex >= queue.length;
  const nextDueDate = Object.values(state.cardStates)
    .filter((s) => s.due > todayStr())
    .sort((a, b) => a.due.localeCompare(b.due))[0]?.due;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-serif text-slate-900">고요</h1>
              <p className="text-sm text-slate-500">
                stillness · scientific Korean practice
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(true)}
            >
              Stats
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex gap-6 text-sm mb-4">
            <div>
              <span className="text-slate-600">Due today: </span>
              <span className="font-semibold text-slate-900">
                {queue.length - qIndex}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Learned: </span>
              <span className="font-semibold text-emerald-600">
                {stats.learned}
              </span>
              <span className="text-slate-500">/{VOCABULARY_DATA.length}</span>
            </div>
            <div>
              <span className="text-slate-600">Accuracy: </span>
              <span className="font-semibold text-blue-600">
                {stats.overallAccuracy}%
              </span>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag: string) => (
              <Badge
                key={tag}
                variant={
                  state.activeTags.includes(tag) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {tag} ({VOCABULARY_DATA.filter((c: CardData) => c.tag === tag).length})
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {isComplete ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-serif mb-2">오늘은 여기까지</h2>
            <p className="text-slate-600 mb-6">
              {nextDueDate
                ? `Next cards come due ${nextDueDate}`
                : "You're fully caught up!"}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Today's session: {state.sessionStats.reviewed} reviewed,{" "}
              {state.sessionStats.correct} correct
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setSessionExtra(true)}
              >
                Study a few more
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBrowse(true)}
              >
                Browse deck
              </Button>
            </div>
          </div>
        ) : currentCard && state ? (
          <div className="space-y-6">
            {/* Card */}
            <div
              className="h-96 cursor-pointer perspective"
              onClick={() => setFlipped(!flipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
                  flipped ? "rotate-y-180" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                    {currentCard.tag}
                  </div>
                  <div className="text-4xl font-semibold text-slate-900 text-center mb-4">
                    {extractKorean(currentCard.front)}
                  </div>
                  {showRoman && extractRoman(currentCard.front) && (
                    <div className="text-sm text-slate-600 font-mono">
                      ({extractRoman(currentCard.front)})
                    </div>
                  )}
                  <div className="text-xs text-slate-400 mt-8">
                    tap to reveal
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-xs uppercase tracking-widest text-emerald-600 mb-4">
                    Meaning
                  </div>
                  <div className="text-2xl font-semibold text-slate-900 text-center mb-4">
                    {currentCard.back}
                  </div>
                  {currentCard.example && (
                    <div className="text-sm text-slate-600 italic mt-4 text-center">
                      "{currentCard.example}"
                    </div>
                  )}
                  {currentProgress && (
                    <div className="mt-6 text-center">
                      <div className="text-xs text-slate-500 mb-2">
                        {currentProgress.stage}
                      </div>
                      <div className="w-32 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all"
                          style={{ width: `${currentProgress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            {flipped && (
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowRoman(!showRoman)}
                  >
                    {showRoman ? "Hide" : "Show"} Romanization
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="destructive"
                    onClick={() => handleGrade("again")}
                  >
                    Again
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleGrade("good")}
                  >
                    Good
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleGrade("easy")}
                  >
                    Easy
                  </Button>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="text-center text-sm text-slate-500">
              Card {qIndex + 1} of {queue.length}
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm py-4 mt-12">
        <div className="max-w-2xl mx-auto px-4 flex justify-between items-center text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBrowse(true)}
          >
            Browse deck →
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className={resetArmed ? "text-red-600" : ""}
          >
            {resetArmed ? "Confirm reset?" : "Reset progress"}
          </Button>
        </div>
      </footer>

      {/* Browse Dialog */}
      <Dialog open={showBrowse} onOpenChange={setShowBrowse}>
        <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Browse Deck</DialogTitle>
            <DialogDescription>
              All {VOCABULARY_DATA.length} cards in your deck
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={TAGS[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {TAGS.map((tag: string) => (
                <TabsTrigger key={tag} value={tag} className="text-xs">
                  {tag}
                </TabsTrigger>
              ))}
            </TabsList>

            {TAGS.map((tag: string) => (
              <TabsContent key={tag} value={tag} className="space-y-3">
                {VOCABULARY_DATA.filter((c: CardData) => c.tag === tag).map((card: CardData) => (
                  <Card key={card.id} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">
                          {card.front}
                        </div>
                        <div className="text-sm text-slate-600">
                          {card.back}
                        </div>
                      </div>
                      {state.cardStates[card.id] && (
                        <Badge variant="outline">
                          {getLearningProgress(state.cardStates[card.id])
                            .stage}
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Learning Statistics</DialogTitle>
            <DialogDescription>Your progress at a glance</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-emerald-50">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.learned}
                </div>
                <div className="text-xs text-slate-600">Learned</div>
              </Card>
              <Card className="p-4 bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.familiar}
                </div>
                <div className="text-xs text-slate-600">Familiar</div>
              </Card>
              <Card className="p-4 bg-amber-50">
                <div className="text-2xl font-bold text-amber-600">
                  {stats.learning}
                </div>
                <div className="text-xs text-slate-600">Learning</div>
              </Card>
              <Card className="p-4 bg-slate-50">
                <div className="text-2xl font-bold text-slate-600">
                  {stats.new}
                </div>
                <div className="text-xs text-slate-600">New</div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="text-sm text-slate-600 mb-2">Overall Accuracy</div>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stats.overallAccuracy}%
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${stats.overallAccuracy}%` }}
                />
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-sm text-slate-600 mb-2">Total Reviews</div>
              <div className="text-2xl font-bold text-slate-900">
                {stats.totalReviews}
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

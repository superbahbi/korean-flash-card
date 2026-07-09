import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { VOCABULARY_DATA, TAGS } from "@/const";
import {
  CardState,
  UserState,
  gradeCard,
  todayStr,
  DECK_VERSION,
  getStatistics,
  calculateXpGain,
  calculateLevel,
  updateStreak,
} from "@/lib/srs";
import { Dashboard } from "@/components/Dashboard";
import { StudySession } from "@/components/StudySession";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cleanKoreanText } from "@/lib/tts";

const STORAGE_KEY = `goyo-progress-v${DECK_VERSION}`;

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
  const [isStudying, setIsStudying] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Load state
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const initial: UserState = raw ? JSON.parse(raw) : {
      cardStates: {},
      dailyNew: { date: todayStr(), count: 0 },
      activeTags: ["survival", "daily", "numbers"],
      stats: {
        totalXp: 0,
        level: 1,
        streak: 0,
        lastStudyDate: "",
        highestStreak: 0
      },
      settings: {
        dailyGoal: 10,
        ttsEnabled: true,
        autoPlayAudio: true
      }
    };
    
    // Check streak
    if (initial.stats.lastStudyDate) {
      initial.stats.streak = updateStreak(initial.stats.streak, initial.stats.lastStudyDate);
    }
    
    setState(initial);
  }, []);

  // Save state
  useEffect(() => {
    if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Build Queue
  useEffect(() => {
    if (!state) return;
    const today = todayStr();
    const due = VOCABULARY_DATA.filter(c => {
      const s = state.cardStates[c.id];
      return s && s.due <= today;
    });
    
    const newCards = VOCABULARY_DATA.filter(c => !state.cardStates[c.id]).slice(0, 10);
    setQueue([...due, ...newCards]);
  }, [state?.cardStates]);

  const handleGrade = (rating: "again" | "good" | "easy") => {
    if (!state || queue.length === 0) return;
    
    const card = queue[0];
    const existing = state.cardStates[card.id];
    const updated = gradeCard(card.id, rating, existing);
    
    const xpGain = calculateXpGain(rating);
    const newTotalXp = state.stats.totalXp + xpGain;
    const newLevel = calculateLevel(newTotalXp);
    
    const today = todayStr();
    const isNewDay = state.stats.lastStudyDate !== today;
    const newStreak = isNewDay ? updateStreak(state.stats.streak, state.stats.lastStudyDate) : state.stats.streak;

    setState({
      ...state,
      cardStates: { ...state.cardStates, [card.id]: updated },
      stats: {
        ...state.stats,
        totalXp: newTotalXp,
        level: newLevel,
        streak: newStreak,
        lastStudyDate: today,
        highestStreak: Math.max(state.stats.highestStreak, newStreak)
      }
    });

    setQueue(prev => prev.slice(1));
    
    if (queue.length === 1) {
      setIsStudying(false);
      toast.success("Daily session complete! XP Gained: " + xpGain);
    }
  };

  if (!state) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Dashboard 
        state={state} 
        dueCount={queue.length} 
        onStartSession={() => setIsStudying(true)}
        onShowBrowse={() => setShowBrowse(true)}
        onShowStats={() => setShowStats(true)}
      />

      {isStudying && (
        <StudySession 
          queue={queue}
          cardStates={state.cardStates}
          onGrade={handleGrade}
          onClose={() => setIsStudying(false)}
          autoPlay={state.settings.autoPlayAudio}
        />
      )}

      {/* Browse Dialog */}
      <Dialog open={showBrowse} onOpenChange={setShowBrowse}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Vocabulary Library</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {VOCABULARY_DATA.map(card => (
                <div key={card.id} className="p-4 bg-white border rounded-xl flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-slate-900">{cleanKoreanText(card.front)}</div>
                    <div className="text-sm text-slate-500">{card.back}</div>
                  </div>
                  <Badge variant="secondary" className="capitalize">{card.tag}</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Learning Statistics</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500">Total XP</div>
              <div className="text-2xl font-bold">{state.stats.totalXp}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500">Current Level</div>
              <div className="text-2xl font-bold">{state.stats.level}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500">Longest Streak</div>
              <div className="text-2xl font-bold">{state.stats.highestStreak} days</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500">Cards Mastered</div>
              <div className="text-2xl font-bold">{getStatistics(state.cardStates, VOCABULARY_DATA.length).learned}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

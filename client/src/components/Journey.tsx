import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getStatistics } from "@/lib/srs";
import { VOCABULARY_DATA } from "@/const";

const CHAPTERS = [
  { id: "survival", name: "Survival Basics", description: "Essential travel & emergency phrases", threshold: 0 },
  { id: "daily", name: "Daily Conversation", description: "Common conversational expressions", threshold: 15 },
  { id: "numbers", name: "Numbers & Time", description: "Counting, dates, and money", threshold: 30 },
  { id: "food", name: "Food & Dining", description: "Restaurant and food vocabulary", threshold: 45 },
  { id: "shopping", name: "Shopping", description: "Market and transaction phrases", threshold: 60 },
  { id: "grammar", name: "Grammar Patterns", description: "Essential sentence structures", threshold: 75 },
];

interface JourneyProps {
  cardStates: Record<string, any>;
}

export function Journey({ cardStates }: JourneyProps) {
  const stats = getStatistics(cardStates, VOCABULARY_DATA.length);
  const progress = stats.progress;

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <div>
        <h2 className="text-3xl font-serif text-slate-900 mb-2">Your Learning Journey</h2>
        <p className="text-slate-500">Progress through chapters as you master vocabulary</p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Overall Mastery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm text-slate-600">
            <span>{stats.learned} words mastered</span>
            <span>{progress}% complete</span>
          </div>
        </CardContent>
      </Card>

      {/* Chapters */}
      <div className="space-y-4">
        {CHAPTERS.map((chapter, idx) => {
          const isUnlocked = progress >= chapter.threshold;
          const nextChapter = CHAPTERS[idx + 1];
          const nextThreshold = nextChapter?.threshold || 100;
          const chapterProgress = Math.min(
            100,
            Math.max(0, ((progress - chapter.threshold) / (nextThreshold - chapter.threshold)) * 100)
          );

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className={`transition-all cursor-pointer ${
                  isUnlocked
                    ? "border-emerald-200 bg-emerald-50 hover:border-emerald-300"
                    : "border-slate-200 bg-slate-50 opacity-60"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-1">
                      {isUnlocked ? (
                        progress >= nextThreshold ? (
                          <CheckCircle2 className="text-emerald-600" size={24} />
                        ) : (
                          <Unlock className="text-emerald-600" size={24} />
                        )
                      ) : (
                        <Lock className="text-slate-400" size={24} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-slate-900">{chapter.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {chapter.threshold}% to unlock
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{chapter.description}</p>

                      {isUnlocked && (
                        <div className="space-y-2">
                          <Progress value={chapterProgress} className="h-2" />
                          <p className="text-xs text-slate-500">
                            Chapter progress: {Math.round(chapterProgress)}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

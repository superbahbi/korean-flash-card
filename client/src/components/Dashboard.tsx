import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Trophy, Play, BookOpen, BarChart2 } from "lucide-react";
import { UserState, getStatistics } from "@/lib/srs";
import { VOCABULARY_DATA } from "@/const";
import { motion } from "framer-motion";

interface DashboardProps {
  state: UserState;
  dueCount: number;
  onStartSession: () => void;
  onShowBrowse: () => void;
  onShowStats: () => void;
}

export function Dashboard({ state, dueCount, onStartSession, onShowBrowse, onShowStats }: DashboardProps) {
  const stats = getStatistics(state.cardStates, VOCABULARY_DATA.length);
  
  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4">
      {/* Welcome Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-slate-900">고요</h1>
          <p className="text-slate-500">Stillness in learning</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-orange-500 font-bold">
            <Flame size={20} fill="currentColor" />
            <span>{state.stats.streak}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star size={20} fill="currentColor" />
            <span>{state.stats.totalXp} XP</span>
          </div>
        </div>
      </header>

      {/* Main Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Trophy size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Ready to practice?</CardTitle>
            <p className="text-emerald-50 opacity-90">
              {dueCount > 0 
                ? `You have ${dueCount} cards due for review today.` 
                : "You're all caught up! Ready for some new words?"}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <Button 
              size="lg" 
              className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-bold text-lg h-14"
              onClick={onStartSession}
            >
              <Play className="mr-2 fill-current" />
              Start Daily Session
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <BookOpen size={16} />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.progress}%</div>
            <Progress value={stats.progress} className="h-2 mt-2 bg-slate-100" />
            <p className="text-xs text-slate-400 mt-2">
              {stats.learned} of {stats.totalCards} mastered
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Star size={16} />
              Level {state.stats.level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Expert</div>
            <p className="text-xs text-slate-400 mt-2">
              {100 - (state.stats.totalXp % 100)} XP to next level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 h-12 border-slate-200 text-slate-600" onClick={onShowBrowse}>
          <BookOpen className="mr-2" size={18} />
          Browse Deck
        </Button>
        <Button variant="outline" className="flex-1 h-12 border-slate-200 text-slate-600" onClick={onShowStats}>
          <BarChart2 className="mr-2" size={18} />
          Full Stats
        </Button>
      </div>

      {/* Tags / Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-500">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["survival", "daily", "numbers", "food", "grammar"].map(tag => (
            <Badge key={tag} variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-default capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

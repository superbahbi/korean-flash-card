import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, X, Check, ChevronRight, Info, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { speakKorean, cleanKoreanText } from "@/lib/tts";
import { getLearningProgress } from "@/lib/srs";

interface CardData {
  id: string;
  front: string;
  back: string;
  tag: string;
  example?: string;
}

interface StudySessionProps {
  queue: CardData[];
  cardStates: any;
  onGrade: (rating: "again" | "good" | "easy") => void;
  onClose: () => void;
  autoPlay?: boolean;
}

export function StudySession({ queue, cardStates, onGrade, onClose, autoPlay = true }: StudySessionProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showRoman, setShowRoman] = useState(false);

  const currentCard = queue[index];
  const currentCardState = currentCard ? cardStates[currentCard.id] : null;
  const progress = currentCardState ? getLearningProgress(currentCardState) : null;

  useEffect(() => {
    if (currentCard && !flipped && autoPlay) {
      const timer = setTimeout(() => {
        speakKorean(cleanKoreanText(currentCard.front));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [index, currentCard, autoPlay]);

  const handleFlip = () => setFlipped(true);

  const handleGrade = (rating: "again" | "good" | "easy") => {
    onGrade(rating);
    if (index < queue.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
      setShowRoman(false);
    }
  };

  if (!currentCard) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Session Header */}
      <header className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X />
        </Button>
        <div className="flex-1 px-8">
          <Progress value={(index / queue.length) * 100} className="h-2" />
        </div>
        <div className="text-sm font-medium text-slate-500">
          {index + 1} / {queue.length}
        </div>
      </header>

      {/* Main Study Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id + (flipped ? "-back" : "-front")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md aspect-[3/4] perspective"
          >
            <div 
              className={`w-full h-full relative transition-transform duration-500 transform-gpu ${flipped ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
              onClick={!flipped ? handleFlip : undefined}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 bg-white border-2 border-slate-100 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Badge variant="outline" className="mb-8 capitalize text-slate-400 font-normal tracking-wide">
                  {currentCard.tag}
                </Badge>
                
                <h2 className="text-5xl font-bold text-slate-900 mb-6">
                  {cleanKoreanText(currentCard.front)}
                </h2>
                
                {showRoman && (
                  <p className="text-xl text-slate-500 font-mono mb-8">
                    {currentCard.front.match(/\(([^)]*)\)/)?.[1]}
                  </p>
                )}

                <div className="flex gap-4 mt-8">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full w-12 h-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakKorean(cleanKoreanText(currentCard.front));
                    }}
                  >
                    <Volume2 size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRoman(!showRoman);
                    }}
                  >
                    {showRoman ? "Hide" : "Show"} Romanization
                  </Button>
                </div>

                {!flipped && (
                  <div className="absolute bottom-12 text-slate-300 flex items-center gap-2 text-sm animate-pulse">
                    Tap to reveal <ChevronRight size={16} />
                  </div>
                )}
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 bg-emerald-50 border-2 border-emerald-100 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <Badge className="mb-8 bg-emerald-500">Meaning</Badge>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  {currentCard.back}
                </h2>

                {currentCard.example && (
                  <div className="mt-4 p-4 bg-white/50 rounded-2xl border border-emerald-100 max-w-xs">
                    <p className="text-sm text-slate-600 italic">"{currentCard.example}"</p>
                  </div>
                )}

                {progress && (
                  <div className="mt-8 text-center">
                    <p className="text-xs font-medium text-emerald-600 uppercase tracking-widest mb-2">
                      {progress.stage}
                    </p>
                    <div className="w-32 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Grading Controls */}
      <footer className="p-8 border-t bg-slate-50">
        {!flipped ? (
          <Button 
            className="w-full h-16 rounded-2xl text-xl font-bold bg-slate-900 hover:bg-slate-800"
            onClick={handleFlip}
          >
            Reveal Answer
          </Button>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-1 border-2 border-red-100 hover:bg-red-50 hover:border-red-200 text-red-600 rounded-2xl"
              onClick={() => handleGrade("again")}
            >
              <X size={20} />
              <span className="font-bold">Again</span>
              <span className="text-[10px] opacity-60">1 day</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-1 border-2 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 text-emerald-600 rounded-2xl"
              onClick={() => handleGrade("good")}
            >
              <Check size={20} />
              <span className="font-bold">Good</span>
              <span className="text-[10px] opacity-60">Next box</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-1 border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-200 text-blue-600 rounded-2xl"
              onClick={() => handleGrade("easy")}
            >
              <Star size={20} />
              <span className="font-bold">Easy</span>
              <span className="text-[10px] opacity-60">Skip ahead</span>
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
}

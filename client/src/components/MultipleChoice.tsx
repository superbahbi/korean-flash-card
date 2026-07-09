import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { speakKorean, cleanKoreanText } from "@/lib/tts";

interface CardData {
  id: string;
  front: string;
  back: string;
  tag: string;
  example?: string;
}

interface MultipleChoiceProps {
  queue: CardData[];
  allCards: CardData[];
  onGrade: (rating: "again" | "good" | "easy") => void;
  onClose: () => void;
}

export function MultipleChoice({ queue, allCards, onGrade, onClose }: MultipleChoiceProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [options, setOptions] = useState<CardData[]>([]);

  const currentCard = queue[index];

  useEffect(() => {
    if (!currentCard) return;

    // Generate 3 random wrong answers + 1 correct answer
    const wrong = allCards
      .filter(c => c.id !== currentCard.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const shuffled = [currentCard, ...wrong].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelected(null);
    setAnswered(false);

    // Auto-play pronunciation
    speakKorean(cleanKoreanText(currentCard.front));
  }, [index, currentCard, allCards]);

  const handleSelect = (option: CardData) => {
    if (answered) return;
    setSelected(option.id);
    setAnswered(true);
  };

  const handleNext = () => {
    if (!selected || !answered) return;

    const isCorrect = selected === currentCard.id;
    const rating = isCorrect ? "good" : "again";

    onGrade(rating);

    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  if (!currentCard || options.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Question */}
            <div className="text-center">
              <Badge variant="outline" className="mb-4 capitalize text-slate-400">
                {currentCard.tag}
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {cleanKoreanText(currentCard.front)}
              </h2>
              <p className="text-slate-500">What does this mean?</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {options.map((option) => {
                const isSelected = selected === option.id;
                const isCorrect = option.id === currentCard.id;
                const showResult = answered && isSelected;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    disabled={answered}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? isCorrect
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-red-500 bg-red-50"
                        : answered && isCorrect
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    whileHover={{ scale: answered ? 1 : 1.02 }}
                    whileTap={{ scale: answered ? 1 : 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{option.back}</span>
                      {showResult && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={isCorrect ? "text-emerald-500" : "text-red-500"}
                        >
                          {isCorrect ? <Check size={20} /> : <X size={20} />}
                        </motion.div>
                      )}
                      {answered && isCorrect && !isSelected && (
                        <Check size={20} className="text-emerald-500" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-8 border-t bg-slate-50">
        <Button
          className="w-full h-14 rounded-2xl font-bold text-lg"
          disabled={!answered}
          onClick={handleNext}
        >
          {index === queue.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2" />
        </Button>
      </footer>
    </div>
  );
}

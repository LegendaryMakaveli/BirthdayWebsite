
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, Brain } from 'lucide-react';
import { TRIVIA_QUESTIONS } from '../constants';

const TwinTrivia: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('triviaCompleted');
        const savedScore = localStorage.getItem('triviaScore');

        if (completed === 'true' && savedScore) {
            setScore(parseInt(savedScore, 10));
            setShowResult(true);
        }
    }, []);

    const currentQuestion = TRIVIA_QUESTIONS[currentQuestionIndex];

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === currentQuestion.correctAnswer;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < TRIVIA_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                finishGame(newScore);
            }
        }, 1500);
    };

    const finishGame = (finalScore: number) => {
        setShowResult(true);
        localStorage.setItem('triviaCompleted', 'true');
        localStorage.setItem('triviaScore', finalScore.toString());
    };

    return (
        <div className="py-24 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-[600px] flex items-center justify-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-10 right-10 opacity-10 animate-pulse">
                <Brain size={120} className="text-purple-400" />
            </div>

            <div className="max-w-2xl w-full relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-cursive text-5xl md:text-6xl text-gray-800 mb-4">Twin Trivia</h2>
                    <p className="text-gray-500 font-serif tracking-widest uppercase">How well do you know the duo?</p>
                </div>

                <AnimatePresence mode="wait">
                    {showResult ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center border-4 border-yellow-100"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="inline-block p-6 bg-yellow-100 rounded-full mb-6"
                            >
                                <Trophy size={64} className="text-yellow-500" />
                            </motion.div>

                            <h3 className="text-4xl font-bold text-gray-800 mb-4">
                                You Scored {score} / {TRIVIA_QUESTIONS.length}
                            </h3>

                            <p className="text-xl text-gray-600 mb-8 italic">
                                {score === TRIVIA_QUESTIONS.length
                                    ? "Wow! You're a certified Twin Expert! 🏆"
                                    : score > TRIVIA_QUESTIONS.length / 2
                                        ? "Not bad! You know them pretty well! 😉"
                                        : "Time to spend more time with them! 😂"}
                            </p>

                            <div className="text-gray-400 text-sm">
                                You've already played this game. Thanks for participating!
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 backdrop-blur-sm"
                        >
                            <div className="flex justify-between items-center mb-8 text-gray-400 font-bold text-sm tracking-widest">
                                <span>QUESTION {currentQuestionIndex + 1} OF {TRIVIA_QUESTIONS.length}</span>
                                <span>SCORE: {score}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-10 leading-relaxed">
                                {currentQuestion.question}
                            </h3>

                            <div className="space-y-4">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOption === option;
                                    const isCorrect = option === currentQuestion.correctAnswer;

                                    let buttonStyle = "border-gray-100 hover:border-purple-200 hover:bg-purple-50";
                                    if (isAnswered) {
                                        if (isSelected) {
                                            buttonStyle = isCorrect
                                                ? "bg-green-100 border-green-200 text-green-700"
                                                : "bg-red-100 border-red-200 text-red-700";
                                        } else if (isCorrect) {
                                            buttonStyle = "bg-green-50 border-green-200 text-green-600";
                                        } else {
                                            buttonStyle = "opacity-50 border-gray-100";
                                        }
                                    }

                                    return (
                                        <motion.button
                                            key={idx}
                                            onClick={() => handleOptionClick(option)}
                                            disabled={isAnswered}
                                            whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                            className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 text-lg flex justify-between items-center ${buttonStyle}`}
                                        >
                                            <span>{option}</span>
                                            {isAnswered && isSelected && (
                                                isCorrect ? <Check size={24} /> : <X size={24} />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TwinTrivia;

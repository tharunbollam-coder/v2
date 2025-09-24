'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, RotateCcw, Trophy, HelpCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { stories } from '@/data/stories';
import { cn } from '@/utils/cn';

export default function StoryQuestions({ params }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // playing, completed

  const resolvedParams = use(params);
  const story = stories.find((s) => s.id === resolvedParams.id);

  // Generate questions based on the story
  const generateQuestions = (story) => {
    return [
      {
        question: `What is the main lesson of "${story.title}"?`,
        options: [
          story.moralLesson,
          "Always be the fastest",
          "Never help others",
          "Give up when things are hard"
        ],
        correctAnswer: 0,
        explanation: `That's right! The story teaches us: ${story.moralLesson}`
      },
      {
        question: `What age group is this story suitable for?`,
        options: [
          "Adults only",
          story.ageGroup,
          "Teenagers only",
          "No specific age"
        ],
        correctAnswer: 1,
        explanation: `Correct! This story is perfect for children aged ${story.ageGroup}.`
      },
      {
        question: `What category does "${story.title}" belong to?`,
        options: [
          "Science Fiction",
          "Horror Stories",
          story.category,
          "Mystery"
        ],
        correctAnswer: 2,
        explanation: `Yes! "${story.title}" is a ${story.category} story.`
      },
      {
        question: `How long does it take to read "${story.title}"?`,
        options: [
          "1 hour",
          story.readingTime,
          "30 minutes",
          "2 hours"
        ],
        correctAnswer: 1,
        explanation: `That's right! This story takes about ${story.readingTime} to read.`
      }
    ];
  };

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="font-kid text-3xl text-foreground mb-4">Story Not Found</h1>
          <p className="font-comic text-muted-foreground mb-6">
            We couldn't find that story for the questions.
          </p>
          <Link
            href="/stories"
            className="btn-primary shadow-colored hover:shadow-strong inline-flex items-center space-x-2 font-bold py-3 px-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Stories</span>
          </Link>
        </div>
      </div>
    );
  }

  const questions = generateQuestions(story);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameState('completed');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameState('playing');
  };

  const breadcrumbItems = [
    { label: 'Stories', href: '/stories' },
    { label: story.title, href: `/story/${resolvedParams.id}` },
    { label: 'Questions', href: `/story-questions/${resolvedParams.id}` }
  ];

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "Perfect! You understood the story completely! 🏆";
    if (percentage >= 75) return "Excellent! You really paid attention! ⭐";
    if (percentage >= 50) return "Good job! You got most of it right! 👍";
    return "Nice try! Maybe read the story again! 💪";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow mb-4">
            🤔 Story Questions
          </h1>
          <p className="font-comic text-lg text-muted-foreground">
            Test your understanding of "{story.title}"
          </p>
        </div>

        {gameState === 'completed' ? (
          /* Quiz Completed */
          <div className="card-modern p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-kid text-3xl text-foreground mb-4">Quiz Complete!</h2>
            <p className="font-comic text-xl text-muted-foreground mb-6">
              {getScoreMessage()}
            </p>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-muted-foreground font-comic">Correct</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600">{totalQuestions}</div>
                  <div className="text-sm text-muted-foreground font-comic">Total</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">
                  {Math.round((score / totalQuestions) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground font-comic">Score</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="btn-secondary shadow-colored hover:shadow-strong flex items-center space-x-2 font-bold py-3 px-6"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <Link
                href={`/story/${resolvedParams.id}`}
                className="btn-primary shadow-colored hover:shadow-strong flex items-center space-x-2 font-bold py-3 px-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Story</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Quiz Playing */
          <div className="card-modern p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-comic text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="font-comic text-sm text-muted-foreground">
                  Score: {score}/{totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <h3 className="font-comic text-xl text-blue-800">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-comic",
                      showResult
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 text-green-800"
                          : index === selectedAnswer
                            ? "border-red-500 bg-red-50 text-red-800"
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        : selectedAnswer === index
                          ? "border-purple-500 bg-purple-50 text-purple-800"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                        showResult
                          ? index === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-500 text-white"
                            : index === selectedAnswer
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-gray-300 bg-gray-100 text-gray-500"
                          : selectedAnswer === index
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-gray-300 bg-white text-gray-500"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <Check className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <X className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Explanation */}
            {showResult && (
              <div className={cn(
                "p-4 rounded-xl mb-6",
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-green-50 border-l-4 border-green-400"
                  : "bg-red-50 border-l-4 border-red-400"
              )}>
                <div className="flex items-start space-x-3">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className={cn(
                      "font-bold mb-2",
                      selectedAnswer === currentQuestion.correctAnswer ? "text-green-800" : "text-red-800"
                    )}>
                      {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Not quite right!"}
                    </p>
                    <p className={cn(
                      "font-comic",
                      selectedAnswer === currentQuestion.correctAnswer ? "text-green-700" : "text-red-700"
                    )}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href={`/story/${resolvedParams.id}`}
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-comic transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Story</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

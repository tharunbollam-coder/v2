'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, RotateCcw, Trophy, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { stories } from '@/data/stories';
import { cn } from '@/utils/cn';

export default function SpellingGame({ params }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, correct, incorrect, completed
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const resolvedParams = use(params);
  const story = stories.find((s) => s.id === resolvedParams.id);

  if (!story || !story.wordHelpers || story.wordHelpers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="font-kid text-3xl text-foreground mb-4">No Spelling Game Available</h1>
          <p className="font-comic text-muted-foreground mb-6">
            This story doesn't have word helpers for the spelling game.
          </p>
          <Link
            href={`/story/${resolvedParams.id}`}
            className="btn-primary shadow-colored hover:shadow-strong inline-flex items-center space-x-2 font-bold py-3 px-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Story</span>
          </Link>
        </div>
      </div>
    );
  }

  const words = story.wordHelpers;
  const currentWord = words[currentWordIndex];
  const totalWords = words.length;

  const checkSpelling = () => {
    setAttempts(attempts + 1);
    
    if (userInput.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      setGameState('correct');
      setScore(score + 1);
      
      setTimeout(() => {
        if (currentWordIndex < totalWords - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
          setGameState('playing');
          setShowHint(false);
        } else {
          setGameState('completed');
        }
      }, 2000);
    } else {
      setGameState('incorrect');
      setTimeout(() => {
        setGameState('playing');
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setGameState('playing');
    setScore(0);
    setAttempts(0);
    setShowHint(false);
  };

  const skipWord = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserInput('');
      setGameState('playing');
      setShowHint(false);
    } else {
      setGameState('completed');
    }
  };

  const breadcrumbItems = [
    { label: 'Stories', href: '/stories' },
    { label: story.title, href: `/story/${resolvedParams.id}` },
    { label: 'Spelling Game', href: `/spelling-game/${resolvedParams.id}` }
  ];

  const getScoreMessage = () => {
    const percentage = (score / totalWords) * 100;
    if (percentage === 100) return "Perfect! You're a spelling champion! 🏆";
    if (percentage >= 80) return "Excellent work! You're doing great! ⭐";
    if (percentage >= 60) return "Good job! Keep practicing! 👍";
    return "Nice try! Practice makes perfect! 💪";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-kid text-4xl md:text-5xl text-gradient-rainbow mb-4">
            🎯 Spelling Game
          </h1>
          <p className="font-comic text-lg text-muted-foreground">
            Practice spelling words from "{story.title}"
          </p>
        </div>

        {gameState === 'completed' ? (
          /* Game Completed */
          <div className="card-modern p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-kid text-3xl text-foreground mb-4">Game Complete!</h2>
            <p className="font-comic text-xl text-muted-foreground mb-6">
              {getScoreMessage()}
            </p>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-muted-foreground font-comic">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{totalWords}</div>
                  <div className="text-sm text-muted-foreground font-comic">Total</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="btn-secondary shadow-colored hover:shadow-strong flex items-center space-x-2 font-bold py-3 px-6"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
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
          /* Game Playing */
          <div className="card-modern p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-comic text-sm text-muted-foreground">
                  Word {currentWordIndex + 1} of {totalWords}
                </span>
                <span className="font-comic text-sm text-muted-foreground">
                  Score: {score}/{totalWords}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentWordIndex + 1) / totalWords) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Word Definition */}
            <div className="text-center mb-8">
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <h3 className="font-kid text-xl text-blue-800 mb-2">Spell this word:</h3>
                <p className="font-comic text-lg text-foreground mb-2">
                  {currentWord.definition}
                </p>
                {currentWord.pronunciation && (
                  <p className="text-sm text-muted-foreground font-comic">
                    Pronunciation: {currentWord.pronunciation}
                  </p>
                )}
              </div>

              {showHint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4 mb-4">
                  <p className="font-comic text-yellow-800">
                    💡 Hint: The word starts with "{currentWord.word.charAt(0).toUpperCase()}" 
                    and has {currentWord.word.length} letters.
                  </p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="mb-6">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
                placeholder="Type the word here..."
                className="w-full text-center text-2xl font-bold py-4 px-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-colors duration-200"
                disabled={gameState !== 'playing'}
              />
            </div>

            {/* Feedback */}
            {gameState === 'correct' && (
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Check className="w-5 h-5" />
                  <span className="font-bold">Correct! Great job! 🎉</span>
                </div>
              </div>
            )}

            {gameState === 'incorrect' && (
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                  <X className="w-5 h-5" />
                  <span className="font-bold">Try again! You can do it! 💪</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={checkSpelling}
                disabled={!userInput.trim() || gameState !== 'playing'}
                className={cn(
                  "flex items-center space-x-2 font-bold py-3 px-6 rounded-full transition-all duration-200",
                  !userInput.trim() || gameState !== 'playing'
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-105"
                )}
              >
                <Check className="w-4 h-4" />
                <span>Check Spelling</span>
              </button>

              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                <Star className="w-4 h-4" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <button
                onClick={skipWord}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                <span>Skip Word</span>
              </button>
            </div>
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

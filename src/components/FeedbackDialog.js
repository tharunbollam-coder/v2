'use client';

import { useState } from 'react';
import { Star, MessageCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const FeedbackDialog = ({ storyTitle }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log({
      story: storyTitle,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    
    // Reset form and close dialog after showing success message
    setTimeout(() => {
      setRating(0);
      setFeedback('');
      setIsOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  const getRatingMessage = () => {
    switch(rating) {
      case 1: return "😔 We'll try to do better!";
      case 2: return "😐 Thanks for the feedback!";
      case 3: return "🙂 Glad you enjoyed it!";
      case 4: return "😊 So happy you liked it!";
      case 5: return "🤩 Amazing! You loved it!";
      default: return "";
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary shadow-colored hover:shadow-strong flex items-center space-x-2 w-full sm:w-auto"
      >
        <MessageCircle className="w-5 h-5" />
        <span>💬 Share Your Thoughts</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-modern max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-kid text-2xl text-foreground flex items-center gap-2">
            🌟 How did you like this story? 📚
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 animate-bounce-gentle">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="font-kid text-2xl text-foreground mb-2">
              Thank you for your feedback!
            </h3>
            <p className="font-comic text-muted-foreground">
              Your review helps us create better stories for kids.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Story Title */}
            <div className="text-center">
              <p className="font-comic text-sm text-muted-foreground mb-4">
                "{storyTitle}"
              </p>
            </div>

            {/* Star Rating */}
            <div className="space-y-3">
              <label className="font-comic font-bold text-base text-foreground">
                Rate this story (1-5 stars):
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all duration-200 hover:scale-110 focus:outline-none"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-200"
                      )}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center font-comic text-sm text-muted-foreground mt-2 animate-slide-up">
                  {getRatingMessage()}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div className="space-y-3">
              <label htmlFor="feedback" className="font-comic font-bold text-base text-foreground">
                Tell us what you thought (optional):
              </label>
              <textarea
                id="feedback"
                placeholder="What did you like most? Any suggestions? Tell us about your favorite character or scene!"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full min-h-[100px] p-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 font-comic resize-none transition-all duration-200"
                maxLength={500}
              />
              <div className="text-right text-xs text-muted-foreground font-comic">
                {feedback.length}/500 characters
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 font-comic font-bold text-gray-700 transition-all duration-200 hover:scale-105"
              >
                Maybe Later
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary shadow-colored hover:shadow-strong"
              >
                Submit Review 🌟
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackDialog;

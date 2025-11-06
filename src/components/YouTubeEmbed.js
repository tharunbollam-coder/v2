import React from 'react';

const YouTubeEmbed = ({ url }) => {
  const getYouTubeId = (youtubeUrl) => {
    let videoId = '';
    try {
      const urlObj = new URL(youtubeUrl);
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
        videoId = urlObj.searchParams.get('v');
      }
    } catch (error) {
      console.error('Invalid YouTube URL:', error);
      return null;
    }
    return videoId;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return null;
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;

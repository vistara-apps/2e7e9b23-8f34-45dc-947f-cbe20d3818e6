'use client';

import { useState } from 'react';
import { Share2, ExternalLink } from 'lucide-react';

interface FarcasterActionProps {
  content: string;
  variant?: 'postPrompt' | 'shareToCast';
}

export function FarcasterAction({
  content,
  variant = 'postPrompt',
}: FarcasterActionProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      // Create a shareable URL for Farcaster
      const shareText = encodeURIComponent(content);
      const shareUrl = `https://warpcast.com/~/compose?text=${shareText}`;
      
      // Open in new window/tab
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  const buttonText = variant === 'postPrompt' ? 'Share on Farcaster' : 'Share to Cast';
  const icon = variant === 'postPrompt' ? Share2 : ExternalLink;
  const IconComponent = icon;

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-foreground mb-1">Ready to share?</h4>
          <p className="text-sm text-foreground/70">
            Post this prompt directly to Farcaster to engage your community
          </p>
        </div>
        
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all duration-200 whitespace-nowrap ml-4"
        >
          <IconComponent size={16} />
          <span className="hidden sm:inline">
            {isSharing ? 'Opening...' : buttonText}
          </span>
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from 'react';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap' as const
  },
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden' as const,
    clip: 'rect(0,0,0,0)',
    border: 0
  },
  cursor: {
    display: 'inline-block',
    backgroundColor: 'currentColor',
    width: '2px',
    height: '1em',
    marginLeft: '2px',
    animation: 'blink 1s infinite'
  }
};

// Add CSS for blinking cursor
const cursorStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('typing-cursor-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'typing-cursor-styles';
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
  }
}

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  parentClassName?: string;
  showCursor?: boolean;
  cursorClassName?: string;
  animateOn?: 'view' | 'hover' | 'both';
  threshold?: number;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function TypingText({
  text,
  speed = 100,
  className = '',
  parentClassName = '',
  showCursor = true,
  cursorClassName = '',
  animateOn = 'view',
  threshold = 0.1,
  style = {},
  ...props
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showCursorState, setShowCursorState] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Typing animation effect
  useEffect(() => {
    let timeout: number;

    if (isTyping && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    } else if (isTyping && displayText.length === text.length) {
      // Typing completed
      setIsTyping(false);
      if (showCursor) {
        setShowCursorState(true);
        // Hide cursor after 2 seconds
        setTimeout(() => setShowCursorState(false), 2000);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isTyping, displayText, text, speed, showCursor]);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'both') return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsTyping(true);
          setHasAnimated(true);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: threshold
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimated, threshold]);

  // Hover props
  const hoverProps = (animateOn === 'hover' || animateOn === 'both') ? {
    onMouseEnter: () => {
      if (!hasAnimated) {
        setIsTyping(true);
        setHasAnimated(true);
      }
    },
    onMouseLeave: () => {
      // Optional: Reset on mouse leave
    }
  } : {};

  return (
    <span 
      className={parentClassName} 
      ref={containerRef} 
      style={{ ...styles.wrapper, ...style }} 
      {...hoverProps} 
      {...props}
    >
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true" className={className}>
        {displayText}
        {showCursorState && (
          <span 
            className={cursorClassName}
            style={styles.cursor}
          />
        )}
      </span>
    </span>
  );
}
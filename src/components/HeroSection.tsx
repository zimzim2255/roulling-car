import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled(Box)(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
  },
}));

const VideoBackground = styled('video')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100vw',
  height: '56.25vw', // 16:9 aspect ratio
  minHeight: '100vh',
  minWidth: '177.77vh', // 16:9 aspect ratio
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  objectFit: 'cover',
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
  '&.loaded': {
    opacity: 1,
  },
}));

const BorderTop = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  width: 0,
  height: '6px',
  backgroundColor: '#ff8c00',
  zIndex: 10,
  transformOrigin: 'center',
}));

const BorderBottom = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  width: 0,
  height: '6px',
  backgroundColor: '#ff8c00',
  zIndex: 10,
  transformOrigin: 'center',
}));

const BorderLeft = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: '50%',
  width: '6px',
  height: 0,
  backgroundColor: '#ff8c00',
  zIndex: 10,
  transformOrigin: 'center',
}));

const BorderRight = styled(Box)(() => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  width: '6px',
  height: 0,
  backgroundColor: '#ff8c00',
  zIndex: 10,
  transformOrigin: 'center',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(0, 10),
  maxWidth: '60%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: theme.spacing(0, 4),
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
  },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 2.5,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
  maxWidth: '70%',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));


const TextWord = styled('span')(() => ({
  display: 'inline-block',
  transform: 'translateY(100%)',
  opacity: 0,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  border: '2px solid white',
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
}));

const VehicleLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(12),
  right: theme.spacing(10),
  fontSize: '18px',
  fontWeight: 400,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    right: theme.spacing(4),
    bottom: theme.spacing(8),
  },
}));


const VideoControlButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  zIndex: 20,
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  border: '2px solid white',
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  minWidth: '140px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '120px',
    padding: theme.spacing(1.5, 3),
    bottom: theme.spacing(2),
  },
}));

const SoundControlButton = styled(VideoControlButton)(({ theme }) => ({
  left: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    left: theme.spacing(2),
  },
}));

const PlayPauseButton = styled(VideoControlButton)(({ theme }) => ({
  right: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    right: theme.spacing(2),
  },
}));

// Mobile-specific components
const MobileHeroTitle = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    fontSize: '42px',
    fontWeight: 700,
    color: theme.palette.common.white,
    lineHeight: 1.1,
    marginTop: 'auto',
    marginBottom: theme.spacing(3),
    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}));

const MobileDiscoverButton = styled(Button)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    border: '2px solid white',
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
    padding: theme.spacing(2, 6),
    marginBottom: theme.spacing(4),
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

const MobileSpecs = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    color: theme.palette.common.white,
    fontSize: '11px',
    lineHeight: 1.6,
    marginBottom: theme.spacing(8),
    opacity: 0.85,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    padding: theme.spacing(2.5, 3),
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    letterSpacing: '0.3px',
    '& .spec-category': {
      color: '#ff8c00',
      fontWeight: 500,
      fontSize: '12px',
      marginBottom: theme.spacing(0.5),
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
    },
    '& .spec-value': {
      color: theme.palette.common.white,
      fontWeight: 400,
      marginBottom: theme.spacing(1.5),
    },
    '& .spec-unit': {
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: 300,
    },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    padding: theme.spacing(2, 2.5),
    '& .spec-category': {
      fontSize: '11px',
    },
  },
}));

const DesktopContent = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const HeroSection: React.FC = () => {
  // Array of video sources
  const videoSources = [
    "https://res.cloudinary.com/dmsmpftzm/video/upload/v1758835746/I_Spent_61_Days_Making_A_Commercial_For_BMW_In_3D_p33fep.mp4",
    "https://res.cloudinary.com/dmsmpftzm/video/upload/v1758837184/2024_Mercedes-AMG_GT_SO._AMG._Commercial_-_Mercedes-Benz_USA_1080p_h264_youtube_gexrzv.mp4"
  ];

  // Randomly select a video source on component mount (force new selection each time)
  const [currentVideoSrc] = useState(() => {
    // Use timestamp to ensure better randomness
    const seed = Date.now() + Math.random();
    const randomIndex = Math.floor((seed % 1) * videoSources.length);
    console.log('Selected video index:', randomIndex, 'Video:', videoSources[randomIndex]);
    return videoSources[randomIndex];
  });

  
  // Start muted on page load for autoplay compliance, but remember user preference
  const [isMuted, setIsMuted] = useState(true);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const borderTopRef = useRef<HTMLDivElement>(null);
  const borderBottomRef = useRef<HTMLDivElement>(null);
  const borderLeftRef = useRef<HTMLDivElement>(null);
  const borderRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  
  // Video control functions
  const togglePlayPause = async () => {
    if (videoRef.current && videoLoaded) {
      const video = videoRef.current;
      try {
        if (isPlaying) {
          video.pause();
        } else {
          await video.play();
        }
      } catch (error) {
        console.log('Video play/pause error:', error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current && videoLoaded) {
      const video = videoRef.current;
      const newMutedState = !isMuted;
      video.muted = newMutedState;
      setIsMuted(newMutedState);
      setUserHasInteracted(true);

      if (!newMutedState) {
        // Ensure playback continues when unmuting
        video.play().catch(() => {});
      }
      
      // Save preference to localStorage
      try {
        localStorage.setItem('heroVideoMuted', JSON.stringify(newMutedState));
      } catch (error) {
        console.log('Failed to save mute preference:', error);
      }
    }
  };

  // Video event handlers
  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      // Add loaded class for smooth fade-in
      video.classList.add('loaded');
      setVideoLoaded(true);
      
      // Ensure muted and inline for autoplay compliance
      video.muted = true;
      video.setAttribute('playsinline', '');
      
      // Try to play immediately when ready
      video.play().catch(() => {
        console.log('Autoplay prevented, waiting for user interaction');
      });
    }
  };

  const handleVideoLoadStart = () => {
    console.log('Video loading started');
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (bufferedEnd / duration > 0.1) { // 10% buffered
          // Enough buffered to start playing smoothly
          if (!videoLoaded) {
            handleVideoCanPlay();
          }
        }
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoVolumeChange = () => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted);
    }
  };

  // Function to wrap text with spans for animation
  const wrapTextForAnimation = (text: string) => {
    return text.split(' ').map((word, index) => (
      <TextWord key={index} className="text-word">
        {word}
        {index < text.split(' ').length - 1 ? '\u00A0' : ''}
      </TextWord>
    ));
  };

  // Video initialization effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video loop to maintain user's sound preference
    const handleVideoLoop = () => {
      if (userHasInteracted && !isMuted) {
        // If user has interacted and chose to unmute, keep it unmuted on loop
        video.muted = false;
      }
    };

    // Add optimized event listeners for faster loading
    video.addEventListener('loadstart', handleVideoLoadStart);
    video.addEventListener('progress', handleVideoProgress);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('pause', handleVideoPause);
    video.addEventListener('volumechange', handleVideoVolumeChange);
    video.addEventListener('ended', handleVideoLoop);

    // Cleanup
    return () => {
      video.removeEventListener('loadstart', handleVideoLoadStart);
      video.removeEventListener('progress', handleVideoProgress);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('pause', handleVideoPause);
      video.removeEventListener('volumechange', handleVideoVolumeChange);
      video.removeEventListener('ended', handleVideoLoop);
    };
  }, [userHasInteracted, isMuted]);

  // Apply saved unmute preference only after user interaction
  useEffect(() => {
    const onUserInteract = () => {
      const video = videoRef.current;
      if (!video) return;
      if (isMuted === false) {
        video.muted = false;
        video.play().catch(() => {});
      }
      document.removeEventListener('pointerdown', onUserInteract);
      document.removeEventListener('keydown', onUserInteract);
    };
    document.addEventListener('pointerdown', onUserInteract);
    document.addEventListener('keydown', onUserInteract);
    return () => {
      document.removeEventListener('pointerdown', onUserInteract);
      document.removeEventListener('keydown', onUserInteract);
    };
  }, [isMuted]);

  useEffect(() => {
    const hero = heroRef.current;
    const borderTop = borderTopRef.current;
    const borderBottom = borderBottomRef.current;
    const borderLeft = borderLeftRef.current;
    const borderRight = borderRightRef.current;
    const content = contentRef.current;
    const label = labelRef.current;

    if (!hero || !borderTop || !borderBottom || !borderLeft || !borderRight || !content || !label) return;

    // Get all text words for animation
    const textWords = content.querySelectorAll('.text-word');
    const labelWords = label.querySelectorAll('.text-word');

    // Set initial states - content hidden
    gsap.set(content, {
      opacity: 1,
    });

    gsap.set(label, {
      opacity: 1,
    });

    // Create timeline for border animation with delay
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      delay: 1.5, // Add 1.5 second delay to let video start
    });

    // Animate borders splitting outward from center
    tl.to([borderTop, borderBottom], {
      width: '50%',
      x: '-50%',
      duration: 0.8,
      ease: 'power2.out',
    })
    .to([borderLeft, borderRight], {
      height: '30%',
      y: '-50%',
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')
    // Swish text animation - words slide up and fade in
    .to(textWords, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: {
        amount: 0.6,
        from: 'start',
      },
    }, '-=0.3')
    .to(labelWords, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
    }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      {/* Cloudinary Video Background */}
      <VideoBackground
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={currentVideoSrc}
      >
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Video Control Buttons */}
      <SoundControlButton onClick={toggleMute} aria-label="Toggle sound">
        {isMuted ? 'UNMUTE' : 'MUTE'}
      </SoundControlButton>

      <PlayPauseButton onClick={togglePlayPause} aria-label="Toggle play/pause">
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </PlayPauseButton>
      
      <BorderTop ref={borderTopRef} />
      <BorderBottom ref={borderBottomRef} />
      <BorderLeft ref={borderLeftRef} />
      <BorderRight ref={borderRightRef} />
      
      <HeroContent ref={contentRef}>
        {/* Desktop Layout */}
        <DesktopContent>
          <HeroTitle>
            {wrapTextForAnimation('Get Ready For Awesome Adventure')}
          </HeroTitle>
          <HeroDescription>
            {wrapTextForAnimation('We are a company that makes high-quality all-terrain vehicles with an emphasis on performance.')}
          </HeroDescription>
          <CTAButton>
            See Catalogue
          </CTAButton>
        </DesktopContent>

        {/* Mobile Layout */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box /> {/* Spacer for top */}
        </Box>
        
        <MobileHeroTitle>
          Cayenne Black<br />Edition.
        </MobileHeroTitle>
        
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileDiscoverButton>
            Discover more
          </MobileDiscoverButton>
          
          <MobileSpecs>
            <div className="spec-category">Fuel Consumption</div>
            <div className="spec-value">
              Combined (weighted): <span className="spec-unit">4.4 – 4.1 l/100 km</span>
            </div>
            
            <div className="spec-category">Electric Energy</div>
            <div className="spec-value">
              Combined (weighted): <span className="spec-unit">31.4 – 19.3 kWh/100 km</span>
            </div>
            
            <div className="spec-category">CO₂ Emissions</div>
            <div className="spec-value">
              Combined (weighted): <span className="spec-unit">101 – 93 g/km</span>
            </div>
            
            <div className="spec-category">Fuel Consumption</div>
            <div className="spec-value">
              Sustaining combined: <span className="spec-unit">10.5 – 10.0 l/100 km</span>
            </div>
          </MobileSpecs>
        </Box>
      </HeroContent>
      
      <VehicleLabel ref={labelRef} sx={{ display: { xs: 'none', md: 'block' } }}>
        {wrapTextForAnimation('Adventure Awaits')}
      </VehicleLabel>
    </HeroContainer>
  );
};

export default HeroSection;
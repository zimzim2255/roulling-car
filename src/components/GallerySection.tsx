import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

gsap.registerPlugin(ScrollTrigger);

const GalleryContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(8, 10, 8, 10),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 4, 6, 4),
    marginTop: theme.spacing(3),
  },
}));

const GalleryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    marginBottom: theme.spacing(4),
  },
}));

const GalleryWrapper = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px',
});

const GalleryTrack = styled(Box)({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
});

const GallerySlide = styled(Box)({
  minWidth: '100%',
  position: 'relative',
});

const GalleryImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '480px',
  objectFit: 'cover',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

const GalleryVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  display: 'block',
  borderRadius: '8px',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: theme.palette.primary.main,
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hide on mobile, use swipe instead
  },
}));

const PrevButton = styled(NavigationButton)({
  left: '16px',
});

const NextButton = styled(NavigationButton)({
  right: '16px',
});

const DotsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '16px',
});

const Dot = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.5)',
  },
}));

// Gallery images - using high-quality vehicle images from the internet
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Luxury Sports Car'
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Classic Vintage Car'
  },
  {
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Modern Electric Vehicle'
  },
  {
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    alt: 'Off-Road Adventure Vehicle'
  }
];

// Gallery videos for small devices
const galleryVideos = [
  {
    src: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900192/2025_Mercedes-AMG_CLE_53_Cabriolet_4MATIC_-_Mercedes-Benz_Maybach_Fans_1080p_h264_youtube_bhzih6.mp4',
    alt: '2025 Mercedes-AMG CLE 53 Cabriolet'
  },
  {
    src: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900626/All-New_Dacia_Duster_-_Dacia_UK_1080p_h264_youtube_psgemz.mp4',
    alt: 'All-New Dacia Duster'
  },
  {
    src: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900957/New_Peugeot_308_and_308_SW_A_striking_new_face__-_Peugeot_1080p_h264_youtube_b2tlol.mp4',
    alt: 'New Peugeot 308 and 308 SW'
  },
  {
    src: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758901277/honouring_icons_while_reinventing_the_future_new_Renault_Clio_fullhybrid_ETech_-_Renault_UK_1080p_h264_youtube_abvvbs.mp4',
    alt: 'New Renault Clio Full Hybrid E-Tech'
  }
];

const GallerySection: React.FC = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Use videos for small devices, images for larger screens
  const galleryItems = isSmallDevice ? galleryVideos : galleryImages;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTranslateX(-index * 100);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % galleryItems.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const diff = startX - clientX;
    const threshold = 50; // Minimum distance to trigger slide change
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    const galleryContainer = galleryContainerRef.current;
    const title = titleRef.current;

    if (!galleryContainer || !title) return;

    // Set initial state
    gsap.set([title, galleryContainer.querySelector('.gallery-content')], {
      y: 100,
      opacity: 0,
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryContainer,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(title, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(galleryContainer.querySelector('.gallery-content'), {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-play functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isDragging]);

  return (
    <GalleryContainer ref={galleryContainerRef}>
      <GalleryTitle ref={titleRef}>
        Vehicle Gallery
      </GalleryTitle>
      
      <Box className="gallery-content">
        <GalleryWrapper>
          <GalleryTrack
            ref={galleryTrackRef}
            style={{ transform: `translateX(${translateX}%)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {galleryImages.map((image, index) => (
              <GallerySlide key={index}>
                <GalleryImage
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                />
              </GallerySlide>
            ))}
          </GalleryTrack>

          <PrevButton onClick={prevSlide}>
            <ArrowBackIosIcon />
          </PrevButton>
          
          <NextButton onClick={nextSlide}>
            <ArrowForwardIosIcon />
          </NextButton>
        </GalleryWrapper>

        <DotsContainer>
          {galleryImages.map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotsContainer>
      </Box>
    </GalleryContainer>
  );
};

export default GallerySection;
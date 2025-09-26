import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const ExplorationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0),
}));

const IntroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 10),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 4),
  },
}));

const IntroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(2),
}));

const IntroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 2.8,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  maxWidth: '872px',
  margin: '0 auto',
}));

const BackgroundSection = styled(Box)(({ theme }) => ({
  height: '1000px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '600px',
  },
}));

const GalleryContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
});

const GallerySlide = styled(Box)<{ active: boolean }>(({ active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: active ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}));

const DotsContainer = styled(Box)({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '12px',
  zIndex: 10,
});

const Dot = styled(Box)<{ active: boolean }>(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? '#ff8c00' : 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: active ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
  '&:hover': {
    backgroundColor: active ? '#ff8c00' : 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.2)',
  },
}));

const FinalSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/images/final-bg.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: theme.spacing(12, 10),
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 4),
    flexDirection: 'column',
  },
}));

const FinalContent = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const FinalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
  },
}));

const FinalDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 2.8,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
  maxWidth: '870px',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#e67a00',
  },
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  maxWidth: '45%',
  marginLeft: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginLeft: 0,
    gridTemplateColumns: '1fr',
  },
}));

const ClickableImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '200px',
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 30px rgba(255, 140, 0, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease',
    zIndex: 1,
  },
  '&:hover::before': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('md')]: {
    height: '150px',
  },
}));

const ImageOverlay = styled(Box)({
  position: 'absolute',
  bottom: '15px',
  left: '15px',
  right: '15px',
  zIndex: 2,
  color: 'white',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  textShadow: '0 2px 4px rgba(0,0,0,0.7)',
});

// Gallery images for exploration
const explorationImages = [
  {
    id: 1,
    src: '/images/exploration-bg.svg',
    alt: 'Mountain Adventure',
    title: 'Mountain Adventure',
    link: '#mountain-adventure'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    alt: 'Off-Road Desert Adventure',
    title: 'Desert Exploration',
    link: '#desert-adventure'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Forest Trail Exploration',
    title: 'Forest Trails',
    link: '#forest-exploration'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Coastal Road Adventure',
    title: 'Coastal Roads',
    link: '#coastal-adventure'
  }
];

// Clickable images for the final section
const finalSectionImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Off-Road Adventure',
    title: 'Off-Road Adventure',
    link: '#offroad-tours'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Scenic Routes',
    title: 'Scenic Routes',
    link: '#scenic-tours'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain Trails',
    title: 'Mountain Trails',
    link: '#mountain-tours'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'City Tours',
    title: 'City Tours',
    link: '#city-tours'
  }
];

const ExplorationSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % explorationImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageClick = (link: string) => {
    // You can customize this behavior
    if (link.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Open external link
      window.open(link, '_blank');
    }
  };

  return (
    <ExplorationContainer>
      <IntroSection>
        <IntroTitle>Explore as you like</IntroTitle>
        <IntroDescription>
          The world is vast, so what are you waiting for, let's explore and discover various kinds of wonders on this planet
        </IntroDescription>
      </IntroSection>
      
      <BackgroundSection>
        <GalleryContainer>
          {explorationImages.map((image, index) => (
            <GallerySlide
              key={image.id}
              active={index === currentSlide}
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            />
          ))}
          
          {/* Navigation Dots */}
          <DotsContainer>
            {explorationImages.map((_, index) => (
              <Dot
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </DotsContainer>
        </GalleryContainer>
      </BackgroundSection>
      
      <FinalSection>
        <FinalContent>
          <FinalTitle>
            Live the way you dream, explore as much as you want
          </FinalTitle>
          <FinalDescription>
            With vehicle recommendations and also a choice of tourist destinations, you only have to prepare mentally and yourself because you have the convenience to live your dream now
          </FinalDescription>
          <CTAButton>Explore More</CTAButton>
        </FinalContent>
        
        {/* Clickable Image Gallery */}
        <ImageGallery>
          {finalSectionImages.map((image) => (
            <ClickableImage
              key={image.id}
              onClick={() => handleImageClick(image.link)}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <ImageOverlay>
                {image.title}
              </ImageOverlay>
            </ClickableImage>
          ))}
        </ImageGallery>
      </FinalSection>
    </ExplorationContainer>
  );
};

export default ExplorationSection;
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TypingText from './TypingText';

interface VehicleShowcaseWithCTAProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const ShowcaseContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(8, 0),
}));

const ContentWrapper = styled(Stack)<{ reverse?: boolean }>(({ theme, reverse }) => ({
  padding: theme.spacing(0, 10),
  flexDirection: reverse ? 'row-reverse' : 'row',
  alignItems: 'center',
  gap: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(0, 4),
    gap: theme.spacing(4),
  },
}));

const TextContent = styled(Stack)(() => ({
  flex: 1,
  maxWidth: '650px',
}));

const ShowcaseTitle = styled(Typography)(({ theme }) => ({
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

const ShowcaseDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 2.8,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  '&:hover': {
    backgroundColor: '#e67a00',
  },
}));

const VehicleImage = styled('img')(({ theme }) => ({
  width: '950px',
  height: '760px',
  objectFit: 'cover',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    maxWidth: 'none',
    height: '60vh',
    minHeight: '400px',
    objectFit: 'cover',
    margin: '0 -32px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
    height: '50vh',
    minHeight: '350px',
    margin: '0 -16px',
  },
}));

const VehicleShowcaseWithCTA: React.FC<VehicleShowcaseWithCTAProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}) => {
  return (
    <ShowcaseContainer>
      <ContentWrapper reverse={reverse}>
        <TextContent>
          <TypingText 
            text={title}
            speed={80}
            animateOn="view"
            threshold={0.3}
            showCursor={true}
            className="MuiTypography-root MuiTypography-body1 mui-7ji45q-MuiTypography-root"
            style={{
              fontSize: '36px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#ff8c00',
              marginBottom: '24px',
              lineHeight: 1.2,
              maxWidth: '650px',
            }}
          />
          <TypingText 
            text={description}
            speed={60}
            animateOn="view"
            threshold={0.2}
            showCursor={true}
            className="MuiTypography-root MuiTypography-body1 mui-7ji45q-MuiTypography-root"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 2.8,
              textTransform: 'uppercase',
              color: 'white',
              marginBottom: '32px',
            }}
          />
          <CTAButton>See Catalogue</CTAButton>
        </TextContent>
        <Box>
          <VehicleImage src={imageSrc} alt={imageAlt} />
        </Box>
      </ContentWrapper>
    </ShowcaseContainer>
  );
};

export default VehicleShowcaseWithCTA;
import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from './icons/InstagramIcon';
import GoogleIcon from './icons/GoogleIcon';
import YouTubeIcon from './icons/YouTubeIcon';
import AppleIcon from './icons/AppleIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 10, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 4, 0),
  },
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

const CompanySection = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
}));

const SocialTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(2),
}));

const SocialIcons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(3),
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const LinksSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(15),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

const LinkColumn = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const LinkText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const BottomSection = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.common.white}`,
  padding: theme.spacing(4, 0),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
}));

const LegalLinks = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const LegalText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: theme.palette.common.white,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanySection>
          <CompanyName>rouling car</CompanyName>
          <SocialTitle>Follow us on</SocialTitle>
          <SocialIcons>
            <SocialIconButton>
              <InstagramIcon width={35} height={35} color="#ffffff" />
            </SocialIconButton>
            <SocialIconButton>
              <GoogleIcon width={32} height={32} color="#ffffff" />
            </SocialIconButton>
            <SocialIconButton>
              <YouTubeIcon width={32} height={23} color="#ffffff" />
            </SocialIconButton>
            <SocialIconButton>
              <AppleIcon width={32} height={38} color="#ffffff" />
            </SocialIconButton>
          </SocialIcons>
        </CompanySection>

        <LinksSection>
          <LinkColumn>
            <LinkText>Services</LinkText>
            <LinkText>Strategy</LinkText>
            <LinkText>Career</LinkText>
            <LinkText>Investor</LinkText>
          </LinkColumn>
          
          <LinkColumn>
            <LinkText>About</LinkText>
            <LinkText>Our Product</LinkText>
            <LinkText>Our Service</LinkText>
            <LinkText>Contact</LinkText>
          </LinkColumn>
          
          <LinkColumn>
            <LinkText>Dealer Locations</LinkText>
            <LinkText>News</LinkText>
            <LinkText>Forums</LinkText>
            <LinkText>Careers</LinkText>
            <LinkText>Company</LinkText>
          </LinkColumn>
        </LinksSection>
      </FooterContent>

      <BottomSection>
        <CopyrightText>@Evolution Ltd, All Rights Reserved</CopyrightText>
        <LegalLinks>
          <LegalText>Cookie Policy</LegalText>
          <LegalText>Legal Notice</LegalText>
          <LegalText>Cookie Consent Options</LegalText>
        </LegalLinks>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;
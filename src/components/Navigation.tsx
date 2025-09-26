import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

interface NavItem {
  label: string;
  links?: Array<{
    label: string;
    href: string;
    ariaLabel?: string;
  }>;
}

interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items?: NavItem[];
  className?: string;
  ease?: string;
}

const CardNavContainer = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 100,
}));

const Nav = styled('nav')<{ isExpanded: boolean; scrolled: boolean }>(({ theme, isExpanded, scrolled }) => ({
  backgroundColor: isExpanded || scrolled ? theme.palette.background.paper : 'transparent',
  overflow: 'visible',
  height: 60,
  transition: 'background-color 0.3s ease',
  [theme.breakpoints.up('md')]: {
    overflow: 'hidden',
  },
}));

const NavTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  height: 60,
  position: 'relative',
  zIndex: 101,
}));

const HamburgerMenu = styled('div')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: 24,
  height: 24,
  cursor: 'pointer',
  zIndex: 1,
  div: {
    width: 24,
    height: 2,
    backgroundColor: theme.palette.text.primary,
    transition: 'all 0.3s linear',
    position: 'relative',
    transformOrigin: '1px',
    ':first-of-type': {
      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
    },
    ':nth-of-type(2)': {
      opacity: isOpen ? 0 : 1,
      transform: isOpen ? 'translateX(20px)' : 'translateX(0)',
    },
    ':nth-of-type(3)': {
      transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  img: {
    height: 100, // Even larger logo for mobile
    [theme.breakpoints.up('sm')]: {
      height: 110, // Slightly bigger on small tablets
    },
    [theme.breakpoints.up('md')]: {
      display: 'none', // Hide logo on desktop
    },
  },
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 300,
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  letterSpacing: '5px',
  fontFamily: '"Roboto Condensed", "Helvetica Neue", "Arial", sans-serif',
  display: 'none', // Hide on mobile
  lineHeight: 1,
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'block', // Show on desktop
    fontSize: '32px',
    letterSpacing: '7px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '36px',
    letterSpacing: '9px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '40px',
    letterSpacing: '11px',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.common.white,
  border: '2px solid white',
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
}));

const MobileOverlay = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 99,
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const MobileMenu = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '80%',
  maxWidth: '400px',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  zIndex: 100,
  transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease',
  overflowY: 'auto',
  paddingTop: '80px',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const NavContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(4, 2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileNavContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(3),
}));

const NavCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(3),
  textAlign: 'center',
  width: '18%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const MobileNavCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const NavCardLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(2),
}));

const NavCardLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  marginBottom: theme.spacing(1),
  ...theme.typography.body2,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    transform: 'scaleX(0)',
    height: '1px',
    bottom: '-2px',
    left: 0,
    backgroundColor: theme.palette.text.primary,
    transformOrigin: 'bottom right',
    transition: 'transform 0.25s ease-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '.nav-card-link-icon': {
    marginRight: theme.spacing(1),
  },
}));

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      // Mobile: Toggle slide-in menu
      setIsHamburgerOpen(!isHamburgerOpen);
      setIsExpanded(!isExpanded);
    } else {
      // Desktop: Use existing animation
      const tl = tlRef.current;
      if (!tl) return;
      if (!isExpanded) {
        setIsHamburgerOpen(true);
        setIsExpanded(true);
        tl.play(0);
      } else {
        setIsHamburgerOpen(false);
        tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
        tl.reverse();
      }
    }
  };

  const closeMobileMenu = () => {
    setIsHamburgerOpen(false);
    setIsExpanded(false);
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <CardNavContainer className={className}>
      <Nav ref={navRef} isExpanded={isExpanded} scrolled={scrolled}>
        <NavTop>
          <HamburgerMenu
            isOpen={isHamburgerOpen}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <div />
            <div />
            <div />
          </HamburgerMenu>

          <LogoContainer>
            <img src={logo} alt={logoAlt} />
            <CompanyName>ROULIN CAR</CompanyName>
          </LogoContainer>

          <Box sx={{ width: 24 }} />
        </NavTop>

        {/* Desktop Navigation */}
        <NavContent aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <NavCard
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
            >
              <NavCardLabel>{item.label}</NavCardLabel>
              <div>
                {item.links?.map((lnk, i) => (
                  <NavCardLink key={`${lnk.label}-${i}`} href={lnk.href} aria-label={lnk.ariaLabel}>
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </NavCardLink>
                ))}
              </div>
            </NavCard>
          ))}
        </NavContent>
      </Nav>

      {/* Mobile Overlay */}
      <MobileOverlay isOpen={isHamburgerOpen} onClick={closeMobileMenu} />

      {/* Mobile Slide-in Menu */}
      <MobileMenu isOpen={isHamburgerOpen}>
        <MobileNavContent>
          {(items || []).map((item, idx) => (
            <MobileNavCard key={`mobile-${item.label}-${idx}`}>
              <NavCardLabel>{item.label}</NavCardLabel>
              <div>
                {item.links?.map((lnk, i) => (
                  <NavCardLink 
                    key={`mobile-${lnk.label}-${i}`} 
                    href={lnk.href} 
                    aria-label={lnk.ariaLabel}
                    onClick={closeMobileMenu}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </NavCardLink>
                ))}
              </div>
            </MobileNavCard>
          ))}
          
          {/* Mobile CTA Button */}
          <Box sx={{ padding: 2, marginTop: 2 }}>
            <CTAButton 
              fullWidth 
              onClick={closeMobileMenu}
              sx={{ 
                borderColor: 'text.primary', 
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderColor: 'text.primary',
                }
              }}
            >
              Get Started
            </CTAButton>
          </Box>
        </MobileNavContent>
      </MobileMenu>
    </CardNavContainer>
  );
};

export default CardNav;
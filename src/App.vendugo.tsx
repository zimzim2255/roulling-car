import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme';
import CardNav from './components/Navigation';
import HeroSection from './components/HeroSection';
import BrandSection from './components/BrandSection';
import VehicleShowcase from './components/VehicleShowcase';
import VehicleShowcaseWithCTA from './components/VehicleShowcaseWithCTA';
import CarRangeSection from './components/CarRangeSection';
import TeaserSection from './components/TeaserSection';
import Footer from './components/Footer';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CardNav
          logo="/images/logo-white.png"
          items={[
            {
              label: 'About Us',
              links: [{ label: 'About Us', href: '#' }],
            },
            {
              label: 'Our Cars',
              links: [{ label: 'Our Cars', href: '#' }],
            },
            {
              label: 'Our Services',
              links: [
                { label: 'Short-term rental', href: '#' },
                { label: 'Long-term rental', href: '#' },
                { label: 'Delivery all over Morocco', href: '#' },
              ],
            },
            {
              label: 'Blog',
              links: [{ label: 'Blog', href: '#' }],
            },
            {
              label: 'Contact',
              links: [{ label: 'Contact', href: '#' }],
            },
          ]}
        />
        <HeroSection />
        <BrandSection />
        <VehicleShowcase
          title="Dashing, tough and reliable is their forte"
          description="Driving a 4x4 car in the beautiful roads Offroad rental is an exciting experience and an opportunity to drive a 4x4 car in the beautiful roads of Turkey."
          buttonText="Contact Us"
          imageSrc="/images/vehicle-2.svg"
          imageAlt="Off-road vehicle in desert terrain"
        />
        <VehicleShowcase
          title="With the right vehicle you can explore and achieve your freedom where you want"
          description="We provide Offroad car to rent. If you want to explore the world, get lost in nature, ride deep into the desert or just want to drive like a maniac then our off-"
          buttonText="Contact Us"
          imageSrc="/images/vehicle-1.svg"
          imageAlt="Off-road vehicle in mountain terrain"
          reverse
        />
        <VehicleShowcaseWithCTA
          title="Combine strength and courage on the terrain you will face"
          description="We provide offroad car to rent for your trip. It can be useful in any circumstances you will have, from driving on the asphalt"
          imageSrc="/images/vehicle-1.svg"
          imageAlt="Rugged off-road truck"
        />
        <CarRangeSection />
        <TeaserSection />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
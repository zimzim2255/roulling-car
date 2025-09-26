import React, { useRef, useState } from 'react';

const CarRangeSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const cars = [
    {
      model: '911',
      fuelType: 'Gasoline',
      description: 'Iconic sports car with rear engine: 2 doors, 2+2 seats.',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      video: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900192/2025_Mercedes-AMG_CLE_53_Cabriolet_4MATIC_-_Mercedes-Benz_Maybach_Fans_1080p_h264_youtube_bhzih6.mp4',
      alt: 'Porsche 911 driving on road'
    },
    {
      model: '718',
      fuelType: 'Gasoline',
      description: 'Precise mid-engine sports car: 2 doors, 2 seats.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      video: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900626/All-New_Dacia_Duster_-_Dacia_UK_1080p_h264_youtube_psgemz.mp4',
      alt: 'Porsche 718 driving on road'
    },
    {
      model: 'Taycan',
      fuelType: 'Electric',
      description: 'Pure electric sports sedan: 4 doors, 4 seats.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      video: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758900957/New_Peugeot_308_and_308_SW_A_striking_new_face__-_Peugeot_1080p_h264_youtube_b2tlol.mp4',
      alt: 'Porsche Taycan electric car'
    },
    {
      model: 'Macan',
      fuelType: 'Gasoline',
      description: 'Compact luxury SUV: 5 doors, 5 seats.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      video: 'https://res.cloudinary.com/dmsmpftzm/video/upload/v1758901277/honouring_icons_while_reinventing_the_future_new_Renault_Clio_fullhybrid_ETech_-_Renault_UK_1080p_h264_youtube_abvvbs.mp4',
      alt: 'Porsche Macan SUV'
    }
  ];

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 340; // 320px width + 20px gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentIndex < cars.length - 1) {
        // Swipe left - next card
        scrollToIndex(currentIndex + 1);
      } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right - previous card
        scrollToIndex(currentIndex - 1);
      }
    }
    
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const diffX = startX - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentIndex < cars.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else if (diffX < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    }
    
    setIsDragging(false);
  };
  return (
    <>
      <style>{`
        @font-face {
          font-family: Porsche Next;
          font-style: normal;
          font-weight: 700;
          src: url('https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-bold.0fbdc6d.woff2') format('woff2');
          unicode-range: U+0020-007F,U+0080-00FF,U+0100-017F,U+0180-024F,U+0250-02AF,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2600-26FF,U+FB00-FB4F,U+FE70-FEFF;
          font-display: swap;
        }

        @font-face {
          font-family: Porsche Next;
          font-style: normal;
          font-weight: 400;
          src: url('https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-regular.b8f1c20.woff2') format('woff2');
          unicode-range: U+0020-007F,U+0080-00FF,U+0100-017F,U+0180-024F,U+0250-02AF,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2600-26FF,U+FB00-FB4F,U+FE70-FEFF;
          font-display: swap;
        }

        @font-face {
          font-family: Porsche Next;
          font-style: normal;
          font-weight: 600;
          src: url('https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-latin-semi-bold.b5f6fca.woff2') format('woff2');
          unicode-range: U+0020-007F,U+0080-00FF,U+0100-017F,U+0180-024F,U+0250-02AF,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2600-26FF,U+FB00-FB4F,U+FE70-FEFF;
          font-display: swap;
        }

        :root {
          --pcom-spacing-medium: clamp(16px, 1.25vw + 12px, 36px);
          --pcom-spacing-large: clamp(32px, 2.75vw + 23px, 76px);
          --pcom-expected-p-link-height: 54px;
          --pcom-cta-padding-top: var(--pcom-spacing-medium);
          --pcom-expected-cta-block-height: calc(var(--pcom-cta-padding-top) + var(--pcom-expected-p-link-height));
        }

        .car-range-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: var(--pcom-spacing-medium);
          justify-content: center;
          margin: 0 auto;
          max-width: 1880px;
          width: 92vw;
          padding: var(--pcom-spacing-large) 0;
        }

        .desktop-car-range {
          display: none;
        }

        @media (min-width: 760px) {
          .desktop-car-range {
            display: flex;
          }
        }

        /* Mobile carousel styles */
        .mobile-car-range {
          display: block;
          background-color: rgb(14, 14, 18);
          padding: var(--pcom-spacing-large) 0;
        }

        @media (min-width: 760px) {
          .mobile-car-range {
            display: none;
          }
        }

        .mobile-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 20px;
          padding: 0 20px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .mobile-carousel::-webkit-scrollbar {
          display: none;
        }

        .mobile-car-card {
          flex: 0 0 auto;
          width: 320px;
          max-width: 400px;
          min-width: 320px;
          scroll-snap-align: center;
          position: relative;
        }

        .mobile-car-image-container {
          height: 500px;
          max-height: 500px;
          overflow: hidden;
          position: relative;
          border-radius: 12px;
          margin: 0 0 2px 0;
        }

        .mobile-car-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .mobile-car-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .mobile-car-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0px, rgba(0, 0, 0, 0.8) 8.1%, rgba(0, 0, 0, 0.8) 15.5%, rgba(0, 0, 0, 0.8) 22.5%, rgba(0, 0, 0, 0.78) 29%, rgba(0, 0, 0, 0.73) 35.3%, rgba(0, 0, 0, 0.67) 41.2%, rgba(0, 0, 0, 0.6) 47.1%, rgba(0, 0, 0, 0.52) 52.9%, rgba(0, 0, 0, 0.44) 58.8%, rgba(0, 0, 0, 0.33) 64.7%, rgba(0, 0, 0, 0.22) 71%, rgba(0, 0, 0, 0.12) 77.5%, rgba(0, 0, 0, 0.05) 84.5%, rgba(0, 0, 0, 0.01) 91.9%, rgba(0, 0, 0, 0));
          z-index: 5;
        }

        .mobile-car-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 22;
          padding: 0 18px 18px 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .mobile-car-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }

        .mobile-car-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .mobile-car-tag {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
        }

        .mobile-car-description {
          color: white;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.4;
          margin-bottom: 16px;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
        }

        .mobile-car-link {
          color: white;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-car-link:after {
          content: '→';
          font-size: 18px;
        }

        .mobile-car-model {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 48px;
          font-weight: 700;
          text-transform: uppercase;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
          z-index: 10;
        }

        .car-range-tile {
          background-color: #000;
          border-radius: 8px;
          cursor: pointer;
          height: 45vw;
          overflow: hidden;
          position: relative;
          width: 100%;
          z-index: 1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @media (min-width: 1300px) {
          .car-range-tile {
            height: calc(7vh + 39vw);
          }
        }

        @media (min-width: 1760px) {
          .car-range-tile {
            height: calc(51vh + 10vw);
            max-height: 54em;
          }
        }

        .car-range-item {
          box-sizing: border-box;
          transition: width 0.6s cubic-bezier(0, 0, 0.2, 1);
          width: calc(50% - var(--pcom-spacing-medium) / 2 - var(--pcom-spacing-medium));
        }

        .car-range-wrapper:hover .car-range-item:not(:hover) {
          width: calc(45% - var(--pcom-spacing-medium) / 2 - var(--pcom-spacing-medium));
        }

        .car-range-wrapper:hover .car-range-item:hover {
          width: calc(55% - var(--pcom-spacing-medium) / 2 - var(--pcom-spacing-medium));
        }

        .car-range-item:nth-child(2n + 1) {
          margin-left: var(--pcom-spacing-medium);
        }

        .clickable-area {
          box-sizing: border-box;
          height: 100%;
          position: absolute;
          width: 100%;
          z-index: 11;
          text-decoration: none;
        }

        .car-info {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
        }

        .car-model {
          font-size: 48px;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        .car-fuel-type {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 10px;
        }

        .car-description {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
          font-size: 16px;
          font-weight: 400;
          max-width: 80%;
        }

        .arrow-icon {
          position: absolute;
          bottom: 20px;
          right: 20px;
          color: white;
          font-size: 24px;
        }
      `}</style>

      <div className="car-range-wrapper desktop-car-range">
        <div className="car-range-tile car-range-item" 
             style={{ 
               backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' 
             }}>
          <a className="clickable-area" href="#" target="_self" aria-hidden="true" tabIndex={-1}></a>
          <div className="car-info">
            <div className="car-fuel-type">Gasoline</div>
          </div>
          <div className="car-description">
            Iconic sports car with rear engine: 2 doors, 2+2 seats.
          </div>
          <div className="arrow-icon">→</div>
        </div>

        <div className="car-range-tile car-range-item"
             style={{ 
               backgroundImage: 'url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' 
             }}>
          <a className="clickable-area" href="#" target="_self" aria-hidden="true" tabIndex={-1}></a>
          <div className="car-info">
            <div className="car-fuel-type">Gasoline</div>
          </div>
          <div className="car-description">
            Precise mid-engine sports car: 2 doors, 2 seats.
          </div>
          <div className="arrow-icon">→</div>
        </div>

        <div className="car-range-tile car-range-item" 
             style={{ 
               backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' 
             }}>
          <a className="clickable-area" href="#" target="_self" aria-hidden="true" tabIndex={-1}></a>
          <div className="car-info">
            <div className="car-fuel-type">Electric</div>
          </div>
          <div className="car-description">
            Pure electric sports sedan: 4 doors, 4 seats.
          </div>
          <div className="arrow-icon">→</div>
        </div>

        <div className="car-range-tile car-range-item"
             style={{ 
               backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' 
             }}>
          <a className="clickable-area" href="#" target="_self" aria-hidden="true" tabIndex={-1}></a>
          <div className="car-info">
            <div className="car-fuel-type">Gasoline</div>
          </div>
          <div className="car-description">
            Compact luxury SUV: 5 doors, 5 seats.
          </div>
          <div className="arrow-icon">→</div>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="mobile-car-range">
        <div 
          className="mobile-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
        >
          {cars.map((car) => (
            <div key={car.model} className="mobile-car-card">
              <div className="mobile-car-image-container">
                <video 
                  className="mobile-car-video"
                  src={car.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
                <div className="mobile-car-overlay"></div>
                <div className="mobile-car-content">
                  <div className="mobile-car-info">
                    <div className="mobile-car-tags">
                      <div className="mobile-car-tag">{car.fuelType}</div>
                    </div>
                    <div className="mobile-car-description">
                      {car.description}
                    </div>
                  </div>
                  <a href="#" className="mobile-car-link">Explore</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dot indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '12px'
        }}>
          {/* Dots container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
            padding: '8px 12px',
            gap: '8px'
          }}>
            {cars.map((_, index) => (
              <div
                key={index}
                onClick={() => scrollToIndex(index)}
                style={{
                  width: index === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          
          {/* Play/Pause button */}
          <button
            aria-label="Play/Pause video"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '12px'
            }}
          >
            ⏸
          </button>
        </div>
      </div>
    </>
  );
};

export default CarRangeSection;
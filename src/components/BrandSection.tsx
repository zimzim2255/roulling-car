import React from "react";

export function Component() {
  return (
    <>
      <style>{`
        .vehicle-tile {
          visibility: visible;
          hyphens: none;
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .vehicle-tile img {
          max-width: 100%;
          vertical-align: top;
          display: block;
          height: 306.938px;
          cursor: pointer;
          aspect-ratio: 2560 / 1920;
          transition: transform 0.3s ease;
        }

        .vehicle-tile:hover img {
          transform: scale(1.05);
        }

        .arrow-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .arrow-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }

        .arrow-button svg {
          width: 20px;
          height: 20px;
          fill: white;
          transition: transform 0.3s ease;
        }

        .arrow-button:hover svg {
          transform: translateX(2px);
        }

        .vehicle-tile {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        @keyframes tilesAnimation {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tile-animation {
          animation: tilesAnimation 1.2s cubic-bezier(0, 0, 0.2, 1) forwards;
        }

        .show-animation {
          animation: show 1.2s cubic-bezier(0, 0, 0.2, 1) forwards;
        }

        .ghost-text {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(120px, 15vw, 300px);
          font-weight: 900;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 3px #ff8c00;
          text-stroke: 3px #ff8c00;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          opacity: 0.3;
          font-family: 'Arial Black', Arial, sans-serif;
          letter-spacing: 0.1em;
          text-align: center;
          line-height: 0.8;
        }

        .brand-container {
          position: relative;
          overflow: hidden;
        }

        .brand-content {
          position: relative;
          z-index: 1;
        }

        /* Small devices layout - single column with same background */
        @media (max-width: 768px) {
          .ghost-text {
            top: 10% !important;
            font-size: clamp(60px, 20vw, 120px) !important;
            opacity: 0.5 !important;
          }

          .brand-content {
            display: flex !important;
            flex-direction: column !important;
            gap: 18.5px !important;
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 24px !important;
            margin: 0 !important;
            padding-top: 120px !important;
          }

          .brand-content > div {
            width: 100% !important;
            grid-column: unset !important;
          }

          .vehicle-tile img {
            width: 100% !important;
            height: 313.875px !important;
            aspect-ratio: 2560 / 1920 !important;
            object-fit: cover !important;
          }
        }
      `}</style>

      <div className="brand-container" style={{ 
        minHeight: "100vh", 
        padding: "95.6px 0px 0px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Ghost Text Background */}
        <div className="ghost-text">
          ROULIN<br />CAR
        </div>
        
        <div
          className="brand-content"
          style={{
            display: "grid",
            rowGap: "36px",
            columnGap: "36px",
            boxSizing: "content-box",
            gridTemplateColumns:
              "[full-start] 44px [wide-start] 75.3125px [extended-start] 75.3125px [basic-start] 75.3125px 75.3125px [narrow-start] 75.3125px 75.3125px 75.3125px 75.3125px 75.3125px 75.3125px 75.3125px 75.3125px [narrow-end] 75.3125px 75.3125px [basic-end] 75.3125px [extended-end] 75.3125px [wide-end] 44px [full-end]",
            maxWidth: "2560px",
            minWidth: "320px",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "rgb(0, 0, 0)",
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily:
              '"Porsche Next", "Arial Narrow", Arial, "Heiti SC", SimHei, sans-serif',
          }}
        >
        <div
          style={{ gridColumnStart: "basic-start", gridColumnEnd: "span 4" }}
        >
          <div
            data-disclaimer="Taycan 4S Black Edition: Electric energy consumption combined (model range): 20.3 – 18.0 kWh/100 km, CO₂-emissions combined (model range): 0 g/km"
            className="tile-animation"
            style={{
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              animationDelay: "0s",
            }}
          >
            <div
              className="vehicle-tile"
              style={{}}
            >
              <img
                src="https://a.storyblok.com/f/338913/3840x2880/57de0b9dc7/j1-ii-4s-black-edition-ww-taycan-black-edition.jpg/m/2560x1920/filters:format(webp):quality(80)"
                srcSet="https://a.storyblok.com/f/338913/3840x2880/57de0b9dc7/j1-ii-4s-black-edition-ww-taycan-black-edition.jpg/m/300x225/filters:format(webp):quality(80) 300w,https://a.storyblok.com/f/338913/3840x2880/57de0b9dc7/j1-ii-4s-black-edition-ww-taycan-black-edition.jpg/m/600x450/filters:format(webp):quality(80) 600w,https://a.storyblok.com/f/338913/3840x2880/57de0b9dc7/j1-ii-4s-black-edition-ww-taycan-black-edition.jpg/m/900x675/filters:format(webp):quality(80) 900w"
                alt="Back shot of Black Taycan 4S parked on grey concrete and a dark grey background."
                height="1920"
                width="2560"
                loading="lazy"
                sizes="(min-width: 1920px) 420px,(min-width: 1760px) 420px,(min-width: 1300px) 380px,(min-width: 1000px) 280px,(min-width: 760px) 70vw,85vw"
                style={{}}
              />
              <div style={{ 
                position: "absolute", 
                bottom: "20px", 
                left: "20px", 
                color: "white", 
                fontWeight: "600",
                fontSize: "18px",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
              }}>
                Taycan Black Edition.
              </div>
              <div className="arrow-button">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div style={{ gridColumnStart: "span 4", gridColumnEnd: "auto" }}>
          <div
            className="tile-animation"
            style={{
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              animationDelay: "0.2s",
            }}
          >
            <div
              className="vehicle-tile"
              style={{}}
            >
              <img
                src="https://a.storyblok.com/f/338913/3840x2880/6aff5eb8d0/cw39-imsa-indianapolis-recap.jpg/m/2560x1920/filters:format(webp):quality(80)"
                srcSet="https://a.storyblok.com/f/338913/3840x2880/6aff5eb8d0/cw39-imsa-indianapolis-recap.jpg/m/300x225/filters:format(webp):quality(80) 300w,https://a.storyblok.com/f/338913/3840x2880/6aff5eb8d0/cw39-imsa-indianapolis-recap.jpg/m/600x450/filters:format(webp):quality(80) 600w,https://a.storyblok.com/f/338913/3840x2880/6aff5eb8d0/cw39-imsa-indianapolis-recap.jpg/m/900x675/filters:format(webp):quality(80) 900w"
                alt="Porsche 963 #7 on race track"
                height="1920"
                width="2560"
                loading="lazy"
                sizes="(min-width: 1920px) 420px,(min-width: 1760px) 420px,(min-width: 1300px) 380px,(min-width: 1000px) 280px,(min-width: 760px) 70vw,85vw"
                style={{}}
              />
              <div style={{ 
                position: "absolute", 
                bottom: "20px", 
                left: "20px", 
                color: "white", 
                fontWeight: "600",
                fontSize: "18px",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
              }}>
                Tough Race in Indianapolis.
              </div>
              <div className="arrow-button">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div style={{ gridColumnStart: "span 4", gridColumnEnd: "auto" }}>
          <div
            data-disclaimer="Macan 4S Electric: Electrical consumption combined (WLTP): 20.7 – 17.7 kWh/100 km, CO₂-emissions combined (WLTP): 0 g/km"
            className="tile-animation"
            style={{
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              animationDelay: "0.4s",
            }}
          >
            <div
              className="vehicle-tile"
              style={{}}
            >
              <img
                src="https://a.storyblok.com/f/338913/3840x2880/fc7ba08808/h2-i-4s-ww-macan-4s.jpg/m/2560x1920/filters:format(webp):quality(80)"
                srcSet="https://a.storyblok.com/f/338913/3840x2880/fc7ba08808/h2-i-4s-ww-macan-4s.jpg/m/300x225/filters:format(webp):quality(80) 300w,https://a.storyblok.com/f/338913/3840x2880/fc7ba08808/h2-i-4s-ww-macan-4s.jpg/m/600x450/filters:format(webp):quality(80) 600w,https://a.storyblok.com/f/338913/3840x2880/fc7ba08808/h2-i-4s-ww-macan-4s.jpg/m/900x675/filters:format(webp):quality(80) 900w"
                alt="An Oak Green Metallic Neo Macan 4S driving through a barren, rocky landscape."
                height="1920"
                width="2560"
                loading="lazy"
                sizes="(min-width: 1920px) 420px,(min-width: 1760px) 420px,(min-width: 1300px) 380px,(min-width: 1000px) 280px,(min-width: 760px) 70vw,85vw"
                style={{}}
              />
              <div style={{ 
                position: "absolute", 
                bottom: "20px", 
                left: "20px", 
                color: "white", 
                fontWeight: "600",
                fontSize: "18px",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
              }}>
                Macan 4S Electric.
              </div>
              <div className="arrow-button">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ gridColumnStart: "basic-start", gridColumnEnd: "basic-end" }}
        >
          <p
            className="show-animation"
            style={{
              fontWeight: "400",
              textAlign: "start",
              color: "rgb(107, 109, 112)",
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "19.5px",
              fontFamily:
                '"Porsche Next", "Arial Narrow", Arial, "Heiti SC", SimHei, sans-serif',
              hyphens: "auto",
              overflowWrap: "break-word",
              animationDelay: "0s",
              padding: "0px",
              margin: "0px",
            }}
          >
            Taycan 4S Black Edition: Electric energy consumption combined (model
            range): 20.3 – 18.0 kWh/100 km, CO₂-emissions combined (model
            range): 0 g/km | Macan 4S Electric: Electrical consumption combined
            (WLTP): 20.7 – 17.7 kWh/100 km, CO₂-emissions combined (WLTP): 0
            g/km
          </p>
        </div>
        </div>
      </div>
    </>
  );
}

const BrandSection: React.FC = () => {
  return <Component />;
};

export default BrandSection;
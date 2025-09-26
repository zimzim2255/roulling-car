
export default function TeaserSection() {
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
        }

        .teaser-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: var(--pcom-spacing-medium);
          justify-content: center;
          margin: 0 auto;
          max-width: 1880px;
          width: 92vw;
          padding: var(--pcom-spacing-large) 0;
        }

        .teaser-tile {
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
          transition: width 0.6s cubic-bezier(0, 0, 0.2, 1);
        }

        @media (min-width: 1300px) {
          .teaser-tile {
            height: calc(7vh + 39vw);
          }
        }

        @media (min-width: 1760px) {
          .teaser-tile {
            height: calc(51vh + 10vw);
            max-height: 54em;
          }
        }

        .teaser-item {
          box-sizing: border-box;
          transition: width 0.6s cubic-bezier(0, 0, 0.2, 1);
          width: calc(33.333% - var(--pcom-spacing-medium) * 2 / 3);
        }

        .teaser-wrapper:hover .teaser-item:not(:hover) {
          width: calc(28% - var(--pcom-spacing-medium) * 2 / 3);
        }

        .teaser-wrapper:hover .teaser-item:hover {
          width: calc(44% - var(--pcom-spacing-medium) * 2 / 3);
        }

        .clickable-area {
          box-sizing: border-box;
          height: 100%;
          position: absolute;
          width: 100%;
          z-index: 11;
          text-decoration: none;
        }

        .teaser-info {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
        }

        .teaser-title {
          font-size: clamp(24px, 5vw, 48px);
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
          line-height: 1.1;
        }

        .teaser-tag {
          background-color: rgba(255, 255, 255, 0.2);
          padding: clamp(3px, 1vw, 4px) clamp(6px, 1.5vw, 8px);
          border-radius: 4px;
          font-size: clamp(10px, 2vw, 12px);
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: clamp(8px, 2vw, 10px);
        }

        .teaser-description {
          position: absolute;
          bottom: clamp(15px, 3vw, 20px);
          left: clamp(15px, 3vw, 20px);
          color: white;
          font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
          font-size: clamp(14px, 2.5vw, 16px);
          font-weight: 400;
          max-width: 80%;
          line-height: 1.4;
        }

        .arrow-icon {
          position: absolute;
          bottom: clamp(15px, 3vw, 20px);
          right: clamp(15px, 3vw, 20px);
          color: white;
          font-size: clamp(20px, 4vw, 24px);
        }

        @keyframes tilesAnimation {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tile-animation {
          animation: tilesAnimation 1.2s cubic-bezier(0, 0, 0.2, 1) forwards;
        }

        /* Mobile responsive */
        @media (max-width: 759px) {
          .teaser-item {
            width: 100%;
            margin-bottom: var(--pcom-spacing-medium);
          }
          
          .teaser-wrapper:hover .teaser-item:not(:hover),
          .teaser-wrapper:hover .teaser-item:hover {
            width: 100%;
          }
          
          .teaser-title {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="teaser-wrapper">
        <div className="teaser-item">
          <div
            className="teaser-tile tile-animation"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80), linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)`,
              animationDelay: "0s",
            }}
          >
            <div
            className="clickable-area"
            aria-hidden="true"
            ></div>
            <div className="teaser-info">
              <div className="teaser-tag">Experience</div>
              <h2 className="teaser-title">Porsche<br />Experience</h2>
            </div>
            <div className="teaser-description">
              Discover the ultimate driving experience with professional instruction and premium vehicles.
            </div>
            <div className="arrow-icon">→</div>
          </div>
        </div>

        <div className="teaser-item">
          <div
            className="teaser-tile tile-animation"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80), linear-gradient(135deg, #00d4aa 0%, #00b894 100%)`,
              animationDelay: "0.2s",
            }}
          >
            <div 
              className="clickable-area" 
              aria-hidden="true"
            ></div>
            <div className="teaser-info">
              <div className="teaser-tag">Electric</div>
              <h2 className="teaser-title">E-Performance</h2>
            </div>
            <div className="teaser-description">
              Sustainable mobility meets legendary performance in our electric vehicle lineup.
            </div>
            <div className="arrow-icon">→</div>
          </div>
        </div>

        <div className="teaser-item">
          <div
            className="teaser-tile tile-animation"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80), linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)`,
              animationDelay: "0.4s",
            }}
          >
            <div 
              className="clickable-area" 
              aria-hidden="true"
            ></div>
            <div className="teaser-info">
              <div className="teaser-tag">Finder</div>
              <h2 className="teaser-title">Porsche<br />Finder</h2>
            </div>
            <div className="teaser-description">
              Find your nearest Porsche Center and discover our complete range of services.
            </div>
            <div className="arrow-icon">→</div>
          </div>
        </div>
      </div>
    </>
  );
}
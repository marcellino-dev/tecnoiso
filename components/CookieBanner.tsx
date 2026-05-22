'use client';

import { useEffect, useState } from 'react';
import { getConsent, hasAnswered, setConsent } from '@/lib/cookieConsent';
import { useIntroPhase } from '@/lib/introContext';

function loadGTM() {
  if (document.getElementById('gtm-script')) return;
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5M69SNRH');
  `;
  document.head.appendChild(script);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { phase } = useIntroPhase();

  useEffect(() => {
    if (hasAnswered()) {
      if (getConsent() === 'accepted') loadGTM();
      return;
    }
    setVisible(true);
  }, []);

  function handleAccept() {
    setConsent('accepted');
    loadGTM();
    setVisible(false);
  }

  function handleReject() {
    setConsent('rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes tni-cookie-up {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tni-cookie-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 14px 32px;
          animation: tni-cookie-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          box-sizing: border-box;
        }
        .tni-cookie-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 260px;
        }
        .tni-cookie-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1;
        }
        .tni-cookie-text {
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }
        .tni-cookie-text a {
          color: #dc2626;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .tni-cookie-text a:hover { color: #b91c1c; }
        .tni-cookie-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .tni-btn-reject {
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
          background: transparent;
        }
        .tni-btn-accept {
          padding: 8px 20px;
          border-radius: 6px;
          border: none;
          background: #dc2626;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
          box-shadow: 0 1px 8px rgba(220,38,38,0.35);
        }
        .tni-btn-accept:hover { background: #b91c1c; }
      `}</style>

      <div
        className="tni-cookie-bar"
        role="dialog"
        aria-label="Aviso de cookies"
        style={
          phase === 'done'
            ? {
                background: '#fff',
                borderTop: '1px solid #e5e5e5',
                boxShadow: '0 -2px 16px rgba(0,0,0,0.07)',
              }
            : {
                background: 'rgba(10,10,10,0.85)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 -2px 24px rgba(0,0,0,0.5)',
              }
        }
      >
        {/* Esquerda: ícone + texto */}
        <div className="tni-cookie-left">
          <span className="tni-cookie-icon" aria-hidden="true">🍪</span>
          <p
            className="tni-cookie-text"
            style={{ color: phase === 'done' ? '#444' : 'rgba(255,255,255,0.75)' }}
          >
            Usamos cookies para melhorar sua experiência e analisar o tráfego.
            Conforme a{' '}
            <strong style={{ color: phase === 'done' ? '#111' : '#fff' }}>LGPD</strong>
            , você pode aceitar ou recusar.{' '}
            <a href="/politica-de-privacidade">Política de privacidade</a>
          </p>
        </div>

        {/* Direita: botões */}
        <div className="tni-cookie-actions">
          <button
            className="tni-btn-reject"
            onClick={handleReject}
            style={
              phase === 'done'
                ? { border: '1px solid #ddd', color: '#555' }
                : { border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }
            }
          >
            Recusar
          </button>
          <button className="tni-btn-accept" onClick={handleAccept}>
            Aceitar cookies
          </button>
        </div>
      </div>
    </>
  );
}
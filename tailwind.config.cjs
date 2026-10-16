module.exports = {
        theme: {
          extend: {
            colors: {
              primary: '#0071e3', // Repair-service blue
              primaryDark: '#005bb5', // Blue hover state
              secondary: '#FFFFFF', // White - Card Backgrounds
              surface: '#F5F5F7', // Slate 100 - Section Backgrounds
              accent: '#0071e3', // Accent blue
              dark: '#1D1D1F', // Slate 900 - Dark Text
              light: '#FAFAFC', // Slate 50 - Background
              textMain: '#1D1D1F', // Slate 800
              textSub: '#64748B', // Slate 500
            },
            fontWeight: {
              normal: '400',
              medium: '500',
              bold: '700',
              extrabold: '900',
            },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
              'float': 'float-slow 4s ease-in-out infinite',
              'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
              'float-slow': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-6px)' }
              },
              'pulse-subtle': {
                '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                '50%': { opacity: '0.85', transform: 'scale(1.03)' }
              }
            }
          }
        }
      };
module.exports.content=['./index.html','./App.tsx','./components/**/*.tsx','./pages/**/*.tsx'];

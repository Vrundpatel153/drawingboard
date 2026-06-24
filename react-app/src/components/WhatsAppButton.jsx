import React from 'react';

export default function WhatsAppButton() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 999999,
      pointerEvents: 'auto'
    }}>
      <a
        href="https://wa.me/919428859768"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          backgroundColor: '#25D366',
          borderRadius: '8px',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.backgroundColor = '#20ba5a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#25D366';
        }}
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          style={{
            width: '32px',
            height: '32px',
            fill: 'currentColor'
          }}
        >
          <path d="M12.031 2C6.49 2 2 6.491 2 12.029c0 1.947.558 3.766 1.523 5.308L2 22l4.823-1.46c1.512.923 3.284 1.455 5.208 1.455C17.57 22 22 17.509 22 11.97 21.999 6.491 17.57 2 12.031 2zm0 18.064c-1.745 0-3.353-.489-4.717-1.332l-.337-.21-2.817.852.868-2.656-.23-.368c-.923-1.472-1.442-3.21-1.442-5.08 0-4.992 4.062-9.052 9.06-9.052 4.998 0 9.057 4.06 9.057 9.052.001 4.997-4.06 9.058-9.042 9.058zm5.086-6.666c-.28-.14-1.649-.813-1.903-.906-.254-.093-.44-.14-.627.14-.187.28-.722.906-.886 1.093-.163.186-.328.21-.608.07-.28-.14-1.18-.435-2.247-1.385-.83-.74-1.39-1.656-1.553-1.936-.163-.28-.018-.431.122-.571.127-.126.28-.327.42-.49.14-.163.187-.28.28-.466.094-.187.047-.35-.024-.49-.07-.14-.627-1.508-.859-2.07-.226-.543-.456-.468-.627-.477-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.35-.257.28-1.028.98-1.028 2.392s1.028 2.776 1.17 2.964c.14.186 2.019 3.084 4.89 4.324.683.295 1.218.47 1.633.602.686.218 1.31.187 1.803.114.549-.08 1.65-.675 1.884-1.326.234-.65.234-1.21.164-1.325-.07-.116-.257-.186-.537-.326z" />
        </svg>
      </a>
    </div>
  );
}

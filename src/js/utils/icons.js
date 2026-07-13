const ICONS = {
  react: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" stroke-width="1.5" transform="rotate(0 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" stroke-width="1.5" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#00d8ff" stroke-width="1.5" transform="rotate(120 12 12)"/>
    <circle cx="12" cy="12" r="2" fill="#00d8ff"/>
  </svg>`,
  
  typescript: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178c6"/>
    <path d="M11.5 17.5H9.3V8.7h5.1v1.9h-2.9v6.9zM18.8 14.5c0 1.9-1.5 3.2-3.6 3.2-1.7 0-3-1-3.4-2.2l1.9-1c.3.7.8 1.3 1.5 1.3.8 0 1.3-.4 1.3-1s-.4-.8-1.4-1.2c-1.8-.7-2.9-1.4-2.9-3.1 0-1.8 1.4-3 3.3-3 1.6 0 2.7.9 3.2 2.1l-1.8 1.1c-.3-.6-.7-1.1-1.3-1.1-.7 0-1.1.4-1.1.9s.4.7 1.3 1.1c1.9.7 3.3 1.4 3.3 3.1z" fill="white"/>
  </svg>`,
  
  nodejs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2z" stroke="#339933" stroke-width="1.8" fill="#339933" fill-opacity="0.1"/>
    <path d="M12 5.5v10.5M12 5.5l5 2.9M12 16l-5-2.9M8 8.6l4-2.3" stroke="#339933" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  nextjs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="black" stroke="#222" stroke-width="1"/>
    <path d="M16.5 17.5l-6-8.5v8.5H9V6.5h1.5l6 8.5V6.5h1.5v11h-1.5z" fill="url(#nextjs-grad)"/>
    <defs>
      <linearGradient id="nextjs-grad" x1="9" y1="6.5" x2="18" y2="17.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="white"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>`,
  
  tailwind: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.5c-2.7 0-4.1 1.4-4.1 4.1 0 2.7 1.4 4.1 4.1 4.1 2.7 0 4.1-1.4 4.1-4.1 0-2.7-1.4-4.1-4.1-4.1z" fill="#38bdf8" fill-opacity="0.15"/>
    <path d="M12 3C7.5 3 5 5.5 5 10c0 3 1.5 4.5 3 6-1.5 1.5-3 1.5-3.5.5C4 15.5 3.5 14 3.5 12c0-4.5 2.5-7 7-7 3 0 4.5 1.5 6 3-1.5-1.5-3-1.5-4.5-5zm3.5 5.5c1.5-1.5 3-1.5 3.5-.5.5 1 1 2.5 1 4.5 0 4.5-2.5 7-7 7-3 0-4.5-1.5-6-3 1.5 1.5 3 1.5 4.5 5 4.5 0 7-2.5 7-7 0-3-1.5-4.5-3-6z" fill="#38bdf8"/>
  </svg>`,
  
  postman: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF6C37" fill-opacity="0.1" stroke="#FF6C37" stroke-width="1.2"/>
    <path d="M18.8 8.4l-3.3-3.3c-.4-.4-1-.4-1.4 0L6.7 12.5c-.7.7-.7 1.9 0 2.6l3.3 3.3c.4.4 1 .4 1.4 0l7.4-7.4c.7-.7.7-1.9 0-2.6z" fill="#FF6C37"/>
    <path d="M12.5 6.7l-4.1 4.1M16.5 10.7l-4.1 4.1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  vercel: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L22 19.5H2L12 2z" fill="white"/>
  </svg>`,
  
  git: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.5l-9.5-9.5c-.4-.4-1.1-.4-1.5 0L1.5 11.5c-.4.4-.4 1.1 0 1.5l9.5 9.5c.4.4 1.1.4 1.5 0l9.5-9.5c.4-.4.4-1.1 0-1.5z" fill="#F05032" fill-opacity="0.2" stroke="#F05032" stroke-width="1.5"/>
    <path d="M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#F05032"/>
    <path d="M12 8.5v7M12 12h3.5" stroke="#F05032" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  
  github: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.867 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="white"/>
  </svg>`,
  
  figma: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 6C8.5 7.65 7.15 9 5.5 9C3.85 9 2.5 7.65 2.5 6C2.5 4.35 3.85 3 5.5 3C7.15 3 8.5 4.35 8.5 6Z" fill="#F24E1E"/>
    <path d="M14.5 6C14.5 7.65 13.15 9 11.5 9C9.85 9 8.5 7.65 8.5 6C8.5 4.35 9.85 3 11.5 3C13.15 3 14.5 4.35 14.5 6Z" fill="#FF7262"/>
    <path d="M20.5 6C20.5 7.65 19.15 9 17.5 9C15.85 9 14.5 7.65 14.5 6C14.5 4.35 15.85 3 17.5 3C19.15 3 20.5 4.35 20.5 6Z" fill="#1ABC9C"/>
    <path d="M8.5 12C8.5 13.65 7.15 15 5.5 15C3.85 15 2.5 13.65 2.5 12C2.5 10.35 3.85 9 5.5 9C7.15 9 8.5 10.35 8.5 12Z" fill="#A259FF"/>
    <path d="M14.5 12C14.5 13.65 13.15 15 11.5 15C9.85 15 8.5 13.65 8.5 12C8.5 10.35 9.85 9 11.5 9C13.15 9 14.5 10.35 14.5 12Z" fill="#2C8EBB"/>
    <path d="M8.5 18C8.5 19.65 7.15 21 5.5 21C3.85 21 2.5 19.65 2.5 18C2.5 16.35 3.85 15 5.5 15L5.5 18C5.5 18 8.5 18 8.5 18Z" fill="#19B5FE"/>
  </svg>`,
  
  mongodb: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 7 7.5 7 13.5C7 16.8 9.2 19.5 12 20.5V22h1v-1.5c2.8-1 5-3.7 5-7C18 7.5 13 2 13 2h-1z" fill="#47A248" fill-opacity="0.2"/>
    <path d="M12 22v-1.5c2.8-1 5-3.7 5-7 0-4.5-5-11.5-5-11.5s0 7 0 13.5c0 .3.2.6.5.6H13v6c0 .8-.5.9-1 .9z" fill="#47A248"/>
    <path d="M12 2C12 2 7 7.5 7 13.5c0 3.3 2.2 6 5 7V2h-.5z" fill="#589636"/>
  </svg>`,
  
  javascript: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#f7df1e"/>
    <path d="M18.8 17.2c-.4.8-1.2 1.3-2.3 1.3-1.6 0-2.4-1-2.4-2.5h1.9c0 .7.3 1 1 1 .5 0 .8-.2.8-.7 0-1.1-2.7-1-2.7-3.1 0-1.2.9-2.2 2.3-2.2.9 0 1.7.4 2 1.2l-1.5.9c-.2-.4-.5-.6-.9-.6-.4 0-.6.2-.6.5 0 .9 2.7.8 2.7 3.1 0 1-.3 1.7-.8 2.1zM11.5 14.5v1.4c0 .8-.4 1.2-1.2 1.2-.6 0-.9-.3-.9-1h-1.9c0 1.6 1.1 2.4 2.8 2.4 1.8 0 3-.9 3-2.6V9.5h-1.8v5z" fill="black"/>
  </svg>`,
  
  python: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9 2c-2.4 0-4.3.4-5 1.1L6.7 5c.4-.1.8-.2 1.2-.2 2.3 0 3.7.8 3.7 2.4v1.7h5v-1c0-2.5-1.9-4.4-4.7-4.4v-1.5z" fill="#3776AB"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1 22c2.4 0 4.3-.4 5-1.1L17.3 19c-.4.1-.8.2-1.2.2-2.3 0-3.7-.8-3.7-2.4v-1.7h-5v1c0 2.5 1.9 4.4 4.7 4.4v1.5zm-2.6-5.2a.6.6 0 110-1.2.6.6 0 010 1.2zm5-9.6a.6.6 0 110-1.2.6.6 0 010 1.2z" fill="#FFD43B"/>
    <path d="M12.1 7.2c-2.3 0-3.7.8-3.7 2.4v6.2h2.2v-4.5c0-1.6 1.4-2.4 3.7-2.4h2.2V7.2h-4.4z" fill="#3776AB"/>
    <path d="M11.9 16.8c2.3 0 3.7-.8 3.7-2.4V8.2h-2.2v4.5c0 1.6-1.4 2.4-3.7 2.4H7.5v1.7h4.4z" fill="#FFD43B"/>
  </svg>`,
  
  vscode: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 16.5l3.5-3 4 3.5 10.5-8.5-5-4.5L2.5 16.5z" fill="#007ACC" fill-opacity="0.15"/>
    <path d="M17.5 2.5L2.5 9.5c-.7.3-.7 1.3 0 1.6l4.2 2L2.5 16.2c-.7.3-.7 1.3 0 1.6l15 6.7c.7.3 1.5-.2 1.5-1V3.5c0-.8-.8-1.3-1.5-1z" fill="#007ACC"/>
    <path d="M14.5 6.5l4-3.5v18l-4-3.5v-11z" fill="#1F9CF0"/>
    <path d="M2.5 9.5L14.5 18l4-3.5L6.7 13.1 2.5 9.5z" fill="#A0A0A0" fill-opacity="0.2"/>
  </svg>`,
  
  docker: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 13.5c0 3.5 3 6.5 7.5 6.5 6.5 0 12.5-4 12.5-10.5 0-1.5-.5-2.5-.5-2.5s-1.5.5-2.5.5c-1 0-1.5-.5-1.5-.5s-.5 1-1.5 1H4.5c-1.5 0-2.5 1.5-2.5 3z" fill="#2496ED" fill-opacity="0.15" stroke="#2496ED" stroke-width="1.5"/>
    <rect x="5.5" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
    <rect x="9" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
    <rect x="12.5" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
    <rect x="7.2" y="5.2" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
    <rect x="10.8" y="5.2" width="3" height="2.5" rx="0.5" fill="#2496ED"/>
  </svg>`,
  
  jira: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 13.5L7 9H2.5l4.5 4.5 4.5 4.5H16l-4.5-4.5z" fill="#0052CC"/>
    <path d="M21.5 13.5L17 9h-4.5l4.5 4.5 4.5 4.5H26l-4.5-4.5z" fill="#2684FF" transform="translate(-4, -4)"/>
    <path d="M11.5 3.5L7 -1H2.5l4.5 4.5 4.5 4.5H16l-4.5-4.5z" fill="#0052CC" transform="translate(4, 4)"/>
  </svg>`,
  
  netlify: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 19h7l3-6 3 6h7L12 2z" fill="#00C7B7" fill-opacity="0.15" stroke="#00C7B7" stroke-width="1.5"/>
    <path d="M12 9l-4 8h8l-4-8z" fill="#00C7B7"/>
    <circle cx="12" cy="13" r="1.5" fill="white"/>
  </svg>`,
  
  linux: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 6.5 5 6.5 8c0 2 .5 3.5 1.5 4.5-.5.5-1 1.5-1 2.5 0 2.5 2 4.5 5 4.5s5-2 5-4.5c0-1-.5-2-1-2.5 1-1 1.5-2.5 1.5-4.5 0-3-1.5-6-5.5-6z" fill="#EADFDF" fill-opacity="0.15" stroke="#FCC624" stroke-width="1.5"/>
    <ellipse cx="10" cy="8.5" rx="1.5" ry="2" fill="white"/>
    <ellipse cx="14" cy="8.5" rx="1.5" ry="2" fill="white"/>
    <circle cx="10" cy="9" r="0.7" fill="black"/>
    <circle cx="14" cy="9" r="0.7" fill="black"/>
    <path d="M9.5 11.5c1 1.2 4 1.2 5 0" stroke="#E05A47" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  npm: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#CB3837"/>
    <path d="M4 8h16v8H11v2H8v-2H4V8zm3 2v4h3v-4H7zm6 0v4h2v-4h-2zm3 0v4h1v-4h-1z" fill="white"/>
  </svg>`,
  
  eslint: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7.8v10.4L12 22l10-5.8V7.8L12 2z" fill="#4B32C3" fill-opacity="0.15" stroke="#4B32C3" stroke-width="1.5"/>
    <path d="M12 5.5L4.5 10v5.5L12 20l7.5-4.5V10L12 5.5z" fill="#4B32C3"/>
    <path d="M8.5 12h7M12 8.5v7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`
};

export function getIconSvg(name) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICONS[normalizedName] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#7c3aed"/></svg>`;
}

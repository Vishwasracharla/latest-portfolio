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
  </svg>`,

  gemini: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stop-color="#4285F4"/>
        <stop offset="0.5" stop-color="#9b59f5"/>
        <stop offset="1" stop-color="#00c4cc"/>
      </linearGradient>
    </defs>
    <path d="M12 2C10 7 7 10 2 12c5 2 8 5 10 10 2-5 5-8 10-10-5-2-8-5-10-10z" fill="url(#gemini-grad)"/>
  </svg>`,

  geminiAI: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemi2-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stop-color="#4285F4"/>
        <stop offset="1" stop-color="#9b59f5"/>
      </linearGradient>
    </defs>
    <path d="M12 2C10 7 7 10 2 12c5 2 8 5 10 10 2-5 5-8 10-10-5-2-8-5-10-10z" fill="url(#gemi2-grad)"/>
  </svg>`,

  aws: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13.5c-1.5.5-2.5 1.5-2.5 3C4.5 18.3 6 19.5 8 19.5c.7 0 1.4-.1 2-.3" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M17 13.5c1.5.5 2.5 1.5 2.5 3 0 1.8-1.5 3-3.5 3-.7 0-1.4-.1-2-.3" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8.5 16.5c0-3 1.5-5.5 3.5-7 2 1.5 3.5 4 3.5 7" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 9L5 6.5M12 8V5M16.5 9L19 6.5" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="5" cy="6" r="1.5" fill="#FF9900"/>
    <circle cx="12" cy="4.5" r="1.5" fill="#FF9900"/>
    <circle cx="19" cy="6" r="1.5" fill="#FF9900"/>
  </svg>`,

  express: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12c0-5 3.5-9 9-9s9 4 9 9-3.5 9-9 9-9-4-9-9z" stroke="#aaa" stroke-width="1.2"/>
    <path d="M7 9.5l4 4-4 4M13 17.5h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  expressjs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 9.5l4 4-4 4M13 17.5h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#aaa" stroke-width="1.2"/>
  </svg>`,

  chartjs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#FF6384" stroke-width="1.5"/>
    <path d="M12 12L12 2A10 10 0 0 1 22 12z" fill="#FF6384" fill-opacity="0.6"/>
    <path d="M12 12L2 12A10 10 0 0 1 12 2z" fill="#36A2EB" fill-opacity="0.6"/>
    <path d="M12 12L19.07 17A10 10 0 0 1 2 12z" fill="#FFCE56" fill-opacity="0.6"/>
  </svg>`,

  tensorflow: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6.5v5L12 16l4-2.3V8.3L12 6V2z" fill="#FF6F00" fill-opacity="0.2"/>
    <path d="M12 2v14l8-4.5v-5L12 2z" fill="#FF6F00" fill-opacity="0.4"/>
    <path d="M12 2L4 6.5v5L12 16" stroke="#FF6F00" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M12 2l8 4.5v5L12 16" stroke="#FF9100" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M12 16v6M8 18l4 4 4-4" stroke="#FF6F00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  fastapi: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#009688" fill-opacity="0.15" stroke="#009688" stroke-width="1.5"/>
    <path d="M13 3.5L6.5 13H11l-2 7.5L17.5 11H13l2-7.5z" fill="#009688"/>
  </svg>`,

  restapis: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="5.5" rx="1.5" stroke="#a855f7" stroke-width="1.5"/>
    <rect x="3" y="13.5" width="18" height="5.5" rx="1.5" stroke="#a855f7" stroke-width="1.5"/>
    <circle cx="7" cy="7.75" r="1" fill="#a855f7"/>
    <circle cx="7" cy="16.25" r="1" fill="#a855f7"/>
    <path d="M11 7.75h7M11 16.25h7" stroke="#a855f7" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`,

  aiagents: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="8" width="14" height="11" rx="2.5" stroke="#06b6d4" stroke-width="1.5"/>
    <circle cx="9.5" cy="13.5" r="1.3" fill="#06b6d4"/>
    <circle cx="14.5" cy="13.5" r="1.3" fill="#06b6d4"/>
    <path d="M12 8V4.5M12 4.5h-2M12 4.5h2" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="12" cy="3.5" r="1.2" fill="#06b6d4"/>
    <path d="M8 19v1.5M16 19v1.5" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  llms: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c-2.8 0-4.5 1.8-4.5 3.8 0 1-.5 1.5-1.2 2.1-.9.8-1.3 1.8-1.3 3.1 0 2.5 2 4.5 4.5 5v-1.5M12 4c2.8 0 4.5 1.8 4.5 3.8 0 1 .5 1.5 1.2 2.1.9.8 1.3 1.8 1.3 3.1 0 2.5-2 4.5-4.5 5v-1.5"
      stroke="#a855f7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 4v14M9.5 9.5h5M9 13h6" stroke="#a855f7" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  rag: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3.5" width="9" height="12" rx="1.2" stroke="#3b82f6" stroke-width="1.4"/>
    <path d="M6.5 6.5h4M6.5 9h4M6.5 11.5h2.5" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="15.5" cy="15.5" r="3.8" stroke="#06b6d4" stroke-width="1.4"/>
    <path d="M18.2 18.2L21 21" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  knowledgegraphs: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2.2" fill="#a855f7"/>
    <circle cx="18" cy="6" r="2.2" fill="#3b82f6"/>
    <circle cx="12" cy="13" r="2.4" fill="#06b6d4"/>
    <circle cx="6" cy="19" r="2.2" fill="#a855f7"/>
    <circle cx="18" cy="19" r="2.2" fill="#3b82f6"/>
    <path d="M7.6 7.2L10.5 11.5M16.4 7.2L13.5 11.5M10.2 14.6L7.4 17.4M13.8 14.6L16.6 17.4"
      stroke="rgba(255,255,255,0.5)" stroke-width="1.1"/>
  </svg>`,

  sql: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" stroke="#3b82f6" stroke-width="1.4"/>
    <path d="M4.5 5.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6" stroke="#3b82f6" stroke-width="1.4"/>
    <path d="M4.5 11.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6" stroke="#3b82f6" stroke-width="1.4"/>
  </svg>`,

  neo4j: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="17" r="3" fill="#008cc1"/>
    <circle cx="16" cy="16" r="2.4" fill="#008cc1" fill-opacity="0.85"/>
    <circle cx="12" cy="7" r="2.8" fill="#008cc1" fill-opacity="0.7"/>
    <path d="M9.2 15.3L11 9.2M14 15.2L12.8 9.5" stroke="#008cc1" stroke-width="1.2"/>
  </svg>`,

  zustand: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="13" r="7" fill="#603814"/>
    <circle cx="7" cy="6.5" r="2.3" fill="#603814"/>
    <circle cx="17" cy="6.5" r="2.3" fill="#603814"/>
    <circle cx="9.7" cy="12" r="1.1" fill="#f5d6a8"/>
    <circle cx="14.3" cy="12" r="1.1" fill="#f5d6a8"/>
    <path d="M10 15.5c.6.6 3.4.6 4 0" stroke="#f5d6a8" stroke-width="1.1" stroke-linecap="round"/>
  </svg>`,

  tanstackquery: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c2.5 3.5.5 5 0 7-.5-2-2.5-3.5 0-7z" fill="#ff4154"/>
    <path d="M12 21c-5 0-8-3.2-8-7.2 0-3 2-5.3 4.6-6.3-1 2-1.1 4 .4 5.7 1-1.6 2.6-2 3-3.7.9 1.8 3 3 3 6 0 3-1.4 5.5-3 5.5z"
      fill="#ff4154" fill-opacity="0.85"/>
  </svg>`,

  cloudfront: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 16a3.5 3.5 0 0 1-.5-6.96A5 5 0 0 1 15.9 8.1 4 4 0 0 1 17.5 16h-11z" fill="#FF9900" fill-opacity="0.85"/>
    <path d="M9 19l3-3 3 3M12 16v5" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  githubactions: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="4" stroke="#2088FF" stroke-width="1.4"/>
    <path d="M6.8 6.6l2.6 1.4-2.6 1.4V6.6z" fill="#2088FF"/>
    <circle cx="16" cy="16" r="4" stroke="#2088FF" stroke-width="1.4" opacity="0.6"/>
    <path d="M14.8 14.6l2.6 1.4-2.6 1.4v-2.8z" fill="#2088FF" opacity="0.6"/>
    <path d="M8 12v2a3 3 0 0 0 3 3h1" stroke="#2088FF" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  sonarqube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#4E9BCD" stroke-width="1.5"/>
    <path d="M8 13c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5-1.8 4.5-4 4.5" stroke="#4E9BCD" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M8.5 16.5L7 18" stroke="#4E9BCD" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  ollama: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="13" rx="6" ry="7" fill="#ffffff" fill-opacity="0.92"/>
    <path d="M8 6.5c-.5-1.5-.2-3 .8-3.5M16 6.5c.5-1.5.2-3-.8-3.5" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round"/>
    <circle cx="9.5" cy="12" r="1" fill="#0a0f24"/>
    <circle cx="14.5" cy="12" r="1" fill="#0a0f24"/>
    <path d="M10 16c.7.5 3.3.5 4 0" stroke="#0a0f24" stroke-width="1" stroke-linecap="round"/>
  </svg>`,

  openai: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5a4.2 4.2 0 0 0-4 5.6 4.2 4.2 0 0 0 0 7.8 4.2 4.2 0 0 0 8 0 4.2 4.2 0 0 0 0-7.8 4.2 4.2 0 0 0-4-5.6z"
      stroke="#ffffff" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M8 9.6l4 2.4 4-2.4M12 12v4.8" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

};

export function getIconSvg(name) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICONS[normalizedName] || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#7c3aed"/></svg>`;
}

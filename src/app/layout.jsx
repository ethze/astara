import './globals.scss';

const themeScript = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
`;

const langScript = `
  try {
    var path = window.location.pathname;
    var m = path.match(/^\\/(en|id|zh)/);
    if (m) document.documentElement.lang = m[1];
    else document.documentElement.lang = 'en';
  } catch(e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

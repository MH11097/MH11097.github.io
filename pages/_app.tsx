import '../styles/globals.scss';
import '../styles/github-theme.scss';
import 'highlight.js/styles/github.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { SITE_NAME } from '../utils/consts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="flex justify-center items-center bg-stone-100 h-16 font-serif border-b">
        <div className="container-center center-horizontal text-stone-500 font-bold font-mono text-sm">
          <Link href="/" className="font-bold text-stone-700 hover:underline">
            {SITE_NAME}
          </Link>
          <span className="text-stone-500 inline-block animate-blink ml-1">▮</span>
        </div>
      </header>
      
      <Component {...pageProps} />
      
      <footer className="flex font-mono justify-center items-center h-16 bg-stone-100 text-stone-500 text-sm border-t mt-auto">
        <div className="container-center center-horizontal">
          <p>© 2024 {SITE_NAME}. Built with Next.js</p>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
import type { AppProps } from 'next/app';
import '../src/index.css';
import '../src/App.css';
import '../src/components/NBL/NBLExperienceEnhanced.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

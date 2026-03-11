import '../styles/globals.css';
import BackgroundShader from '../components/BackgroundShader';
import CustomCursor from '../components/CustomCursor';

export const metadata = {
  title: 'CREATIVEVERSE | Where Art Meets Opportunity',
  description: 'The world-class creative ecosystem for artists and clients.',
  manifest: '/manifest.json',
  themeColor: '#b8ff00',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-rose selection:text-white">
        <BackgroundShader />
        <CustomCursor />
        <div className="grain-overlay" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

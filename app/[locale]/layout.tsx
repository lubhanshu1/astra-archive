import '../globals.css'
import { Inter, Space_Mono } from 'next/font/google'
import Navigation from '@/components/ui/Navigation'
import SystemsLoader from '@/components/ui/SystemsLoader'
import Providers from '@/components/Providers'
import CommandPalette from '@/components/ui/CommandPalette'
import SettingsPanel from '@/components/ui/SettingsPanel'
import TimeController from '@/components/ui/TimeController'
import OfflineBanner from '@/components/ui/OfflineBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'ASTRA // THE SPACE ARTIFACT ARCHIVE',
  description: 'Humanity\'s journey beyond Earth — preserved, reconstructed, and explored.',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#020617',
}

export default async function RootLayout(props: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <html lang={params.locale || 'en'} className={`${inter.variable} ${mono.variable}`}>
      {/* Added suppressHydrationWarning below to block extension-related hydration errors */}
      <body
        className="bg-slate-950 text-slate-200 antialiased selection:bg-cyan-900 selection:text-cyan-50"
        suppressHydrationWarning
      >
        <Providers>
          <OfflineBanner />
          <SystemsLoader />
          <CommandPalette />
          <SettingsPanel />
          <Navigation />

          <main className="min-h-screen pt-16 pb-24">
            {props.children}
          </main>

          <TimeController />
        </Providers>
      </body>
    </html>
  )
}
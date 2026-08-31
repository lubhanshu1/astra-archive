import createNextIntlPlugin from 'next-intl/plugin';

// Explicitly point to the i18n configuration file we created in the root directory
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep any existing Next.js config options here if you had them
};

export default withNextIntl(nextConfig);
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'hi'];

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();

    return {
        locale: locale as string, // Added "as string" to bypass the undefined type error
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
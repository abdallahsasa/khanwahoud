import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './layouts/Layout';

// const appName = import.meta.env.VITE_APP_NAME || 'Khan Wahoud';

createInertiaApp({
    title: (title) => `${title} Khan Wahoud`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        let page: any = pages[`./pages/${name}.tsx`];

        if (!page) throw new Error(`Page not found: ${name}`);
        // set a default layout if the page didn’t define one
        page.default.layout = page.default.layout || ((child: React.ReactNode) => <Layout>{child}</Layout>);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <I18nextProvider i18n={i18n}>
                    <App {...props} />
                </I18nextProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

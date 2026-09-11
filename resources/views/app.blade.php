<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" />
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
        media="print" onload="this.media='all'" />
    <link rel="preload" href="/fonts/Israr-Syria-Regular.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="/fonts/thmanyah-serif-display-regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/fonts/thmanyah-serif-display-bold.woff2" as="font" type="font/woff2" crossorigin>

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: #FFFFF5;
        }

        html.dark {
            background-color: #000000;
        }
    </style>

    {{-- Phase-1 (2026-08-06): hide retired surfaces (membership, admin link, dead forms/links) + legible fixed header
    --}}
    <style>
        a[href="/membership"],
        a[href="/admin"] {
            display: none !important;
        }

        li:has(> a[href="/membership"]),
        li:has(> a[href="/admin"]) {
            display: none !important;
        }

        div:has(> a[href="/membership"]):not(:has(a[href]:not([href="/membership"]))) {
            display: none !important;
        }

        footer a[href="#"] {
            display: none !important;
        }

        form {
            display: none !important;
        }

        /* hide the entire section that hosted a dead form (empty "Get in Touch" card, etc.) */
        main section:has(form) {
            display: none !important;
        }

        header {
            background-color: rgba(24, 20, 17, 0.92) !important;
            -webkit-backdrop-filter: blur(6px);
            backdrop-filter: blur(6px);
        }

        /* bouncing scroll-mouse button retired (founder 2026-08-07) */
        button.animate-bounce {
            display: none !important;
        }


        /* duplicate footer dining link */
        footer li:has(a[href="/dining"])~li:has(a[href="/dining"]) {
            display: none !important;
        }

        /* mobile call bar + centered home logo (injected below) */
        #kw-callbar {
            display: none;
        }

        #kw-mlogo {
            display: none;
        }

        #kw-mphone {
            display: none;
        }

        @media (max-width: 900px) {
            #kw-mlogo {
                display: block;
                position: fixed;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
            }

            #kw-mlogo img {
                height: 44px;
                width: auto;
            }

            #kw-mphone {
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 10px;
                right: 12px;
                z-index: 10000;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #9E2B21;
                color: #fff;
            }
        }

        @media (max-width: 900px) {
            #kw-callbar {
                display: flex;
                align-items: center;
                gap: 8px;
                position: fixed;
                left: 50%;
                transform: translateX(-50%);
                bottom: calc(14px + env(safe-area-inset-bottom));
                z-index: 9999;
                background: rgba(24, 20, 17, 0.92);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                padding: 6px;
                border-radius: 50px;
                border: 1px solid rgba(233, 223, 204, 0.25);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
                font-family: Montserrat, sans-serif;
                width: auto;
                max-width: calc(100% - 28px);
            }

            #kw-callbar a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 10px 18px;
                border-radius: 40px;
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                letter-spacing: .02em;
                white-space: nowrap;
                transition: all 0.25s ease;
            }

            #kw-callbar .kw-solid {
                background: #9E2B21;
                color: #fff;
                box-shadow: 0 2px 10px rgba(158, 43, 33, 0.35);
            }

            #kw-callbar .kw-line {
                border: 1px solid rgba(233, 223, 204, 0.4);
                background: rgba(255, 255, 255, 0.04);
                color: #F3EBDD;
            }

            body {
                padding-bottom: 72px;
            }
        }

        /* desktop: luxury floating action pill bottom-right */
        @media (min-width: 901px) {
            #kw-callbar {
                display: flex;
                align-items: center;
                gap: 10px;
                position: fixed;
                left: auto;
                right: 24px;
                bottom: 24px;
                z-index: 9999;
                background: rgba(24, 20, 17, 0.92);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                padding: 6px 8px;
                border-radius: 50px;
                border: 1px solid rgba(233, 223, 204, 0.25);
                box-shadow: 0 10px 32px rgba(0, 0, 0, 0.45);
                font-family: Montserrat, sans-serif;
            }

            #kw-callbar a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 10px 20px;
                border-radius: 40px;
                font-size: 13px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.25s ease;
            }

            #kw-callbar a:hover {
                transform: translateY(-2px);
            }

            #kw-callbar .kw-solid {
                background: #9E2B21;
                color: #fff;
                box-shadow: 0 4px 14px rgba(158, 43, 33, 0.4);
            }

            #kw-callbar .kw-solid:hover {
                background: #b53227;
            }

            #kw-callbar .kw-line {
                border: 1px solid rgba(233, 223, 204, 0.4);
                background: rgba(255, 255, 255, 0.04);
                color: #F3EBDD;
            }

            #kw-callbar .kw-line:hover {
                border-color: #F3EBDD;
                background: rgba(255, 255, 255, 0.1);
            }

            html[lang="ar"] #kw-callbar a,
            [dir="rtl"] #kw-callbar a {
                font-size: 16px;
            }
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/favicon.png">

    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>

<body class=" font-sans antialiased">
    @inertia




    {{-- Persistent luxury floating contact pill (Call & WhatsApp) --}}
    <div id="kw-callbar">
        <a class="kw-solid" href="tel:+963930012015" aria-label="Call to reserve">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span class="kw-call-text">Call</span>
        </a>
        <a class="kw-line" href="https://wa.me/963930012015" target="_blank" rel="noopener"
            aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path
                    d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.4 1.24-1.92 1.32-.5.08-1.15.11-3.32-.78-2.77-1.15-4.56-3.96-4.7-4.14-.14-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.01.96-2.28.25-.27.55-.34.73-.34.18 0 .36.01.52.02.17.01.39-.06.61.47.23.55.78 1.9.85 2.04.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.35-.42.47-.14.14-.29.3-.12.59.16.29.73 1.21 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.7-.17 1.37z" />
            </svg>
            <span class="kw-wa-text">WhatsApp</span>
        </a>
    </div>

    {{-- Phase-1b: motion failsafe — content must never stay invisible if an animation doesn't fire --}}
    <script>
        // /menu/ is a static page: force a real navigation so the SPA router can't intercept it.
        document.addEventListener('click', function (e) {
            var a = e.target.closest && e.target.closest('a[href^="/menu"]');
            if (a) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = a.getAttribute('href');
            }
        }, true);
    </script>
    <script>
        (function () {
            function rescue() {
                var vh = window.innerHeight;
                document.querySelectorAll('main [style*="opacity"], #app [style*="opacity"]').forEach(function (el) {
                    var o = parseFloat(getComputedStyle(el).opacity);
                    if (o < 0.05) {
                        var r = el.getBoundingClientRect();
                        if (r.top < vh * 0.92 && r.bottom > 0 && r.height > 0) {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                        }
                    }
                });
            }
            var t;
            window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(rescue, 700); }, { passive: true });
            setInterval(rescue, 1500);
        })();
    </script>
</body>

</html>
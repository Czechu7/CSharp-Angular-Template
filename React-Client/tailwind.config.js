/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                figtree: ['Figtree', 'sans-serif'],
            },
            spacing: {
                bottomTab: 'calc(-0.5rem - 1px)',
                yearBorder: 'calc(12rem - 1px)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                panel: '0 3px 6px #2A2A35',
                header: '0 3px 6px #161B1C',
                header2: '0 3px 6px #0000003B',
                switch: '0 0 6px #00000029',
                user: '0 3px 6px #918F9717',
                rightPanel: '-3px 0px 10px #0000005C',
                box: '0 0 6px #DBDBEB17',
            },
            colors: {
                blue: '#3863E3',
                darkGray: '#232734',
                borderGray: '#3B3D4E',
                gray2: '#2B2F3D',
                gray3: '#918F97',
                red: '#E8697D',
                redError: '#DE3149',
                green: '#02A773',
                orange: '#E5A753',
                textColor: '#C5C5DC',
                textHeader: '#9F9DA4',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
                brand: {
                    DEFAULT: 'hsl(var(--brand))',
                    foreground: 'hsl(var(--brand-foreground))',
                },
                highlight: {
                    DEFAULT: 'hsl(var(--highlight))',
                    foreground: 'hsl(var(--highlight-foreground))',
                },
            },
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'context-appear': {
                    '0%': {
                        transform: 'translateY(-10px)',
                        opacity: '0.5',
                    },
                    '100%': {
                        transform: 'none',
                        opacity: '1',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in .4s ease-out',
                'context-appear': 'context-appear .2s cubic-bezier(.175, .885, .32, 1.275)',
            },
            screens: {
                'main-hover': {
                    raw: '(hover: hover)',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};

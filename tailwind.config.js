module.exports = {
    purge: ["./components/**/*.ts", "./pages/**/*.ts", "./components/**/*.tsx", "./pages/**/*.tsx"],
    theme: {
        extend: {
            minHeight: {
                'with-nav': 'calc(100vh - 4rem);'
            },
            maxHeight: {
                'with-nav': 'calc(100vh - 4rem);',
                '48perc': '48%'
            },
            height: {
                'with-nav': 'calc(100vh - 4rem);'
            },
            width: {
                '48perc': '48%',
                '72': "18rem",
                'content': `calc(100vw - 18rem)`
            },
            colors: {
                'dark': {
                    '010': '#fcfcfc',
                    '020': '#f9f9f9',
                    '030': '#f6f6f6',
                    '040': '#f3f3f3',
                    '050': '#f0f0f0',
                    '100': '#e6e6e6',
                    '200': '#c9c9c9',
                    '300': '#adadad',
                    '400': '#919191',
                    '500': '#757575',
                    '600': '#5c5c5c',
                    '700': '#454545',
                    '800': '#2e2e2e',
                    '900': '#1b1b1b',
                }
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd']
    },
    plugins: [
        require('tailwindcss-dark-mode')(),
    ],
};

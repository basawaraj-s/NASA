/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    dark: '#0a0e27',
                    blue: '#1a237e',
                    light: '#283593'
                },
                nasa: {
                    red: '#fc3d21',
                    blue: '#0b3d91'
                }
            },
            fontFamily: {
                'space': ['"Orbitron"', 'sans-serif']
            }
        },
    },
    plugins: [],
}

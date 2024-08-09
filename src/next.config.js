// next.config.js
module.exports = {
    reactStrictMode: true, // Habilita o modo estrito do React para desenvolvimento
    swcMinify: true,       // Utiliza o SWC para minificação mais rápida
    webpack: (config) => {
        // Customizações de Webpack, se necessário
        return config;
    },
};

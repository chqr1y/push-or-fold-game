module.exports = {
    // https://github.com/vercel/next.js/issues/21079
    // Remove this workaround whenever the issue is fixed
    images: {
        loader: "imgix",
        path: "https://chqr1y.github.io/push-or-fold-game/",
    },
    basePath: '/push-or-fold-game',
    assetPrefix: '/push-or-fold-game',
};

const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#13227A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                },
            ],
        ],
    },
};

const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3B80FF',
              '@font-size-base': '18px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}

const config = {
  mode: 'site',
  title: 'Wuxiao.io\'s Blog',
  description: '架构|思路|效率',
  publicPath: '/',
  base: '/',
  exportStatic: {},
  dynamicImport: {},
  theme: {
    '@primary-color': '#00A7D6',
  },
  navs: [
    null
  ]
};

if (process.env.NODE_ENV !== 'development') {
  config.ssr = {};
}

export default config;

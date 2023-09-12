import path from 'path';
import versions from '../src/versions';
import docConfig from '../src/doc.config';

const nav = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '文档',
    items: versions.map((version) => ({
      text: version,
      link: `/${version}/`
    }))
  }
];

if (docConfig.website) {
  nav.push({
    text: "官网",
    link: docConfig.website
  });
}

export const sidebar = versions.reduce(
  (sidebars, version) => ({
    ...sidebars,
    [`/${version}/`]: require(path.join(
      __dirname,
      `../src/${version}/sidebar`
    ))
  }),
  {}
)

export default {
  lang: "zh-CN",
  title: docConfig.title,
  description: docConfig.description,
  srcDir: "src",
  outDir: "dist",
  srcExclude: [],
  scrollOffset: 'header',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],

  themeConfig: {
    nav,
    sidebar,

    logo: '/logo-icon.svg',

    socialLinks: [
      { icon: 'github', link: docConfig.github },
    ],
  },
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: []
    },
    // @ts-ignore
    ssr: {
      external: []
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
}

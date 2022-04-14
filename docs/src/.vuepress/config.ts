import { config } from 'dotenv'
import { resolve } from 'path'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

config({ path: resolve(__dirname, '.env') })

export default defineUserConfig<DefaultThemeOptions>({
  title: 'Vue Flow',
  description: 'Visualize your ideas with Vue Flow, a highly customizable Vue3 Flowchart library.',
  head: [],

  dest: resolve(__dirname, '../../dist'),
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      plugins: [
        AutoImport({
          imports: ['vue', '@vueuse/core'],
          dts: resolve(__dirname, './auto-imports.d.ts'),
        }),
        WindiCSS({
          transformCSS: 'pre',
          config: resolve(__dirname, './windi.config.ts'),
        }),
        Components({
          dirs: [resolve(__dirname, '../../components')],
          deep: true,
          // allow auto load markdown components under `./src/components/`
          extensions: ['vue', 'md'],
          // allow auto import and register components used in markdown
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: resolve(__dirname, './components.d.ts'),
          resolvers: [IconsResolver()],
        }),
        Icons({
          compiler: 'vue3',
        }),
      ],
    },
  },

  plugins: [],

  theme: resolve(__dirname, './theme/index.ts'),

  themeConfig: {
    repo: 'user/my-repo',
    docsDir: 'docs/src/',
    docsBranch: 'master',
    lastUpdated: true,
    contributors: true,
    darkMode: true,
    logo: '/favicons/android-chrome-512x512.png',
    sidebar: {
      '/guide/': [],
      '/examples/': [],
    },
    navbar: [
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      {
        text: 'Examples',
        link: '/examples/',
        activeMatch: '^/examples/',
      },
    ],
  },
})

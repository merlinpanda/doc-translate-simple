import './styles/index.css'
import { h } from 'vue'
import Footer from './components/Footer.vue'
import DefaultTheme from 'vitepress/theme'

export default Object.assign({
  ...DefaultTheme,
  Layout: () => {
    // @ts-ignore
    return h(DefaultTheme.Layout, null, {
      // banner: () => h(Banner),
      'layout-bottom': () => h(Footer)
    })
  }
})

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Formatting is Prettier's job, and Prettier always writes void elements as <img />
    'vue/html-self-closing': 'off',
  },
})

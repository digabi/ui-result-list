import digabiConfig from '@digabi/eslint-config'

export default [
  ...digabiConfig(),
  {
    ignores: ['node_modules', 'lib', '.idea', '.npmrc', '.DS_Store']
  }
]

import i18next from 'i18next'
import { getTranslationResources } from './translation'

const i18n = i18next.createInstance(
  {
    lng: 'fi',
    fallbackLng: 'fi',
    ns: ['translation'],
    defaultNS: 'translation',
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
    resources: getTranslationResources()
  },
  (err, t) => {
    if (err) return console.log(err)
  }
)

export default i18n

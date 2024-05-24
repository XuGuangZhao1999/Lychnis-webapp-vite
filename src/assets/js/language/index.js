import { createI18n } from 'vue-i18n'

import zhCn from './zh'
import en from './en'

const messages = {
    zhCn,
    en
}

const i18n = new createI18n({
    locale: 'en',
    globalInjection: true,
    messages
})

export default i18n
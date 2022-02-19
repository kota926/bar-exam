import { Middleware } from '@nuxt/types'

const onHomeMiddleware: Middleware = (context) => {
    if (!context.$auth.loggedIn && process.client) {
      return context.redirect('/auth')
    }
}
export default onHomeMiddleware
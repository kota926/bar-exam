import { Middleware } from '@nuxt/types'

const onAuthMiddleware: Middleware = (context) => {
    if (context.$auth.loggedIn && process.client) {
      return context.redirect('/')
    }
}
export default onAuthMiddleware
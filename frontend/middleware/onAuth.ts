import { Middleware } from '@nuxt/types'

const onAuthMiddleware: Middleware = (context) => {
    console.log('onAuth')
    console.log(process.client)
    console.log(context.$auth.loggedIn)
    console.log(context.$auth)
    if (context.$auth.loggedIn && process.client) {
      return context.redirect('/')
    }
}
export default onAuthMiddleware
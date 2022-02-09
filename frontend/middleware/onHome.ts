import { Middleware } from '@nuxt/types'

const onHomeMiddleware: Middleware = (context) => {
    console.log('onHome')
    console.log(process.client)
    console.log(context.$auth.loggedIn)
    console.log(context.$auth)
    if (!context.$auth.loggedIn && process.client) {
      return context.redirect('/auth')
    }
}
export default onHomeMiddleware
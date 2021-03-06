export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - 司法試験',
    title: '短答式対策アプリ',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "司法試験予備試験短答式対策ができるアプリです。ユーザー登録でログを保存。PC、スマホ対応。" },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/common'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // composition-api
    '@nuxtjs/composition-api/module',
    // fontawesome
    '@nuxtjs/fontawesome',
    // pwa
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
    browserBaseURL: process.env.BROWSER_BASE_URL,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3,
    //     },
    //   },
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // nuxt-auth
  auth: {
    redirect: {
      login: '/auth',   // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: '/auth',  // ログアウト時のリダイレクトURL
      callback: false,   // Oauth認証等で必要となる コールバックルート
      home: '/',         // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: false},
        },
      }
    }
  },

  // router: {
  //   middleware: ['auth']
  // },

  fontawesome: {
    icons: {
      solid: [
        'faHome',
        'faTimes',
        'faCheck',
        'faExclamationTriangle',
        'faChevronRight',
        'faCaretRight',
        'faSignOutAlt',
        'faKey',
        'faUserTimes'
      ],
      regular: [
        'faEdit',
        'faCaretSquareLeft',
        'faCircle',
        'faClock',
        'faAddressCard',
        'faUserCircle',
        'faTrashAlt'
      ]
    }
  },
  // @nuxtjs/pwa Configuration
  manifest: {
    name: '司法試験短答式対策アプリ',
    lang: 'ja',
    short_name: '短答式対策',
    title: '司法試験短答式対策アプリ',
    description: "司法試験予備試験短答式対策ができるアプリです。ユーザー登録でログを保存。PC、スマホ対応。",
    start_url: '/auth',
    display: 'fullscreen',
  },
}

// Example: Redirect legacy routes.
// Uncomment and customize for your product.
//
// export default defineNuxtRouteMiddleware((to) => {
//   const redirects: Record<string, string> = {
//     '/home': '/',
//     '/old-pricing': '/pricing'
//   }
//   const target = redirects[to.path]
//   if (target) {
//     return navigateTo(target, { redirectCode: 301 })
//   }
// })

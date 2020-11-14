// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vaults',
        permanent: true
      }
    ]
  }
}

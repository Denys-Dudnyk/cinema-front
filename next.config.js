/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://cinemaapi-production.up.railway.app/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'https://cinemaapi-production.up.railway.app/uploads/:path*',
				
			},
		]
	},
	swcMinify: true,
}

module.exports = nextConfig

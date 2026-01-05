const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-autolink-headings'), { behavior: 'wrap' }],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    unoptimized: false,
  },
  // 确保 Mermaid 等客户端库正确打包
  webpack: (config, { isServer }) => {
    // 如果是服务端构建，排除 mermaid
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('mermaid')
    }
    return config
  },
}

module.exports = withMDX(nextConfig)

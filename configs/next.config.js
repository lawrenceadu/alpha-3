function withDefault(options = {}) {
  const nextConfig = {
    ...options,
    compiler: {
      removeConsole: false,
      reactRemoveProperties: false,
    },
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        {
          // protocol: 'https',
          hostname: '**',
        },
      ],
    },
    experimental: {
      // optimizePackageImports: [
      //   '@alpha-2/ui',
      //   '@alpha-2/utils',
      //   '@phosphor-icons/react',
      // ],
    },
  };

  return {
    ...nextConfig,
  };
}

module.exports = withDefault;

// Add this to next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kepsoencjtypmdqdrjqb.supabase.co',
        pathname: '/storage/v1/object/sign/post-images/**',
      },
    ],
    unoptimized: true, // Required for signed URLs
  },
}
// next.config.js
// Chatbase Help Center Integration – with your Agent ID

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Your unique Chatbase Agent ID (from your help center URL)
    const agentId = "zbdAasmqIQ1gvjTeKApdT";

    return [
      // Main help center route
      {
        source: "/help",
        destination: `https://chatbase.co/${agentId}/help`,
      },
      // All sub-pages of the help center
      {
        source: "/help/:path*",
        destination: `https://chatbase.co/${agentId}/help/:path*`,
      },
      // Static assets (JS, CSS, images) used by Chatbase
      {
        source: "/__cb/:path*",
        destination: "https://chatbase.co/__cb/:path*",
      },
      // Chat API endpoints (if your help center uses live chat)
      {
        source: `/api/chat/${agentId}/:path*`,
        destination: `https://chatbase.co/api/chat/${agentId}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

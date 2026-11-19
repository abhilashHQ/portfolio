import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/blog-post", destination: "/writing/oversight-arena", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/tags/:path*", destination: "/writing", permanent: true },
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects", permanent: true },
      {
        source: "/resume",
        destination: "https://drive.google.com/file/d/1H0mKGg6zKlIv4JX1op4lCwsDkWdYutu4/view?usp=sharing",
        permanent: true,
      },
      { source: "/linkedin", destination: "https://www.linkedin.com/in/abhilashreddymanda/", permanent: true },
      { source: "/github", destination: "https://github.com/abhilashHQ", permanent: true },
      { source: "/discord", destination: "https://discord.com/users/abhilash_2429", permanent: true },
      { source: "/twitter", destination: "https://twitter.com/abhilash2429", permanent: true },
    ];
  },
};

export default nextConfig;

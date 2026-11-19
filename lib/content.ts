export const profile = {
  name: "abhilash",
  location: "hyd, india",
  tagline: "builder · ai engineer · curious",
  avatar: "/avatar.jpg",
  email: "abhilashreddy2429@gmail.com",
  github: "abhilashHQ",
  about: [
    "20 y/o builder from hyd, india. i build ai agents and the backends that keep them running, from a rough prompt loop to something people use every day. so far that's a coding agent harness from scratch, a voice assistant for the mac notch, and cited search over 512k documents. mostly python.",
    "open to full-time remote roles in applied ai and backend engineering. if i'm not building, find me out on a run, watching the markets, or reading.",
  ],
};

export const socials = [
  { name: "twitter", url: "https://twitter.com/abhilash2429" },
  { name: "github", url: "https://github.com/abhilashHQ" },
  { name: "linkedin", url: "https://www.linkedin.com/in/abhilashreddymanda" },
  { name: "discord", url: "https://discordapp.com/users/abhilash_2429" },
  { name: "email", url: "mailto:abhilashreddy2429@gmail.com" },
] as const;

export type FeaturedProject = {
  name: string;
  description: string;
  cover: string;
  href: string;
  previewVideo?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "CookCode",
    description:
      "Coding agent harness built from scratch on a replayable event log. Every run can be resumed, forked and replayed byte for byte. 0.80 on a Terminal-Bench 2.0 slice.",
    cover: "/covers/CookCode.png",
    href: "https://github.com/abhilashHQ/CookCode",
  },
  {
    name: "Macky",
    description:
      "macOS voice assistant in the screen notch with push-to-talk real-time streaming, background sub-agent orchestration, and MCP integrations.",
    cover: "/covers/Macky.png",
    href: "https://heymacky.vercel.app/",
  },
  {
    name: "Enterprise Search",
    description:
      "Cited answers over 512K company docs. +20 points over BM25 on a held-out test split (95% CI +15.7 to +24.5).",
    cover: "/covers/EnterpriseSearch.jpg",
    href: "https://github.com/abhilashHQ/enterprise-search-rag",
    previewVideo: "/previews/enterprise-search.mp4",
  },
  {
    name: "DeepRead",
    description:
      "AI system that breaks down ML research papers with a 4-stage LangGraph pipeline and an SSE-streamed PyTorch code Q&A agent.",
    cover: "/covers/DeepRead.png",
    href: "https://deep-read-seven.vercel.app/",
  },
];

export type Hackathon = {
  statement: string;
  date: string;
  link?: string;
};

export const hackathons: Hackathon[] = [
  {
    statement: "won the tcs ai hackathon out of ~30 teams with a customer-feedback analysis agent",
    date: "jul 2026",
    link: "https://drive.google.com/file/d/10CNecnstq9_I7sGFySNo0rsbjeyZCStA/view?usp=sharing",
  },
  {
    statement: "grand finalist at meta x pytorch x openenv from 52,000+ registrants with oversight arena",
    date: "may 2026",
    link: "https://drive.google.com/file/d/1WuTUidWNzSoFeN349NXxyhVj-Tt4AKbd/view",
  },
  {
    statement: "finalist at the iit hyderabad innovation hackathon with intelli-credit",
    date: "mar 2026",
    link: "https://drive.google.com/file/d/12bqjwjR-m-M1cy7cO535n9wDSOPxa5L8/view",
  },
];

export type Contribution = {
  repo: string;
  number: number;
  title: string;
  status: "merged" | "open";
  url: string;
};

export const openSource: Contribution[] = [
  {
    repo: "kornia/kornia",
    number: 5361,
    title: "Fix torch.compile on augmentation containers",
    status: "merged",
    url: "https://github.com/kornia/kornia/pull/5361",
  },
  {
    repo: "pipecat-ai/pipecat",
    number: 6024,
    title: "Keep the OpenAI Realtime receive loop alive",
    status: "open",
    url: "https://github.com/pipecat-ai/pipecat/pull/6024",
  },
];

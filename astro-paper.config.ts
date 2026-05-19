import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://www.noahjohnson.ai/",
    title: "Noah Johnson",
    description: "AI-augmented engineering, methodology, and case studies.",
    author: "Noah Johnson",
    profile: "https://www.noahjohnson.ai/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/New_York",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/nojoatx" },
    { name: "mail",   url: "mailto:noah.johnson00@gmail.com" },
  ],
  shareLinks: [
    { name: "x",     url: "https://x.com/intent/post?url=" },
    { name: "mail",  url: "mailto:?subject=See%20this%20post&body=" },
  ],
});

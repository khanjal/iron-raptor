// =============================================================================
// SITE CONFIGURATION — Iron Raptor
// Edit this file to customize your entire site. All content is driven from here.
// =============================================================================

export interface NavItem {
  label: string;
  fragment: string;
  path?: string; // Optional route path (e.g. '/pages/minecraft')
}

export interface Page {
  slug: string;
  title: string;
  paragraphs: string[];
}

export interface Service {
  icon: string;     // Any emoji, or swap for an SVG path in the template
  title: string;
  description: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string | null;   // e.g. 'Owner, Acme Co.' — set null to omit
  quote: string;
  rating: number;        // 1–5 stars
  avatarUrl: string | null; // URL or path inside public/, null for initials fallback
}

export interface SocialLinks {
  email: string | null;
  phone: string | null;
  linkedin: string | null;   // Full URL  e.g. 'https://linkedin.com/company/acme'
  github: string | null;     // Full URL  e.g. 'https://github.com/acme'
  instagram: string | null;  // Full URL  e.g. 'https://instagram.com/acme'
  facebook: string | null;   // Full URL  e.g. 'https://facebook.com/acme'
}

export interface InfoSection {
  heading: string;
  minecraft: {
    servers: Array<{
      name: string;
      ip: string | null;
      status: string;
      notes?: string | null;
    }>;
    rules: string[];
  };
  twitch: {
    channel: string | null;
    url: string | null;
    schedule: string | null;
  };
}

export interface SiteConfig {
  business: {
    name: string;
    tagline: string;
    year: number;
  };
  nav: NavItem[];
  social: SocialLinks;
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaFragment: string;
    secondaryCtaLabel: string | null;
    secondaryCtaFragment: string | null;
  };
  services: Service[];
  about: {
    heading: string;
    paragraphs: string[];
    highlights: Highlight[];
    imagePath: string | null; // Path inside public/, e.g. 'about.jpg'
  };
  info?: InfoSection;
  pages?: Page[];
  testimonials: {
    heading: string;
    items: Testimonial[];
    /**
     * Link to your Google Business Profile reviews page.
     * e.g. 'https://g.page/r/YOUR_PLACE_ID/review'
     * Set to null to hide the "See all reviews" button.
     */
    googleReviewsUrl: string | null;
  };
  contact: {
    heading: string;
    subheading: string;
    /**
     * Formspree form ID for serverless email delivery.
     * 1. Sign up free at https://formspree.io
     * 2. Create a new form and copy the ID (e.g. 'xpwzdzzl')
     * 3. Paste it here.
     * If null, clicking Submit opens the visitor's mail client instead.
     */
    formspreeId: string | null;
  };
}

export const SITE_CONFIG: SiteConfig = {

  // ── Business identity ──────────────────────────────────────────────────────
  business: {
    name:    'Iron Raptor',
    tagline: 'Always Clever.',
    year:    2008,
  },

  // ── Navigation (fragment maps to a section id on the home page) ───────────
  nav: [
    { label: 'Games',      fragment: 'services' },
    { label: 'Minecraft',  fragment: 'info', path: '/pages/minecraft' },
    { label: 'Geocaching', fragment: 'about', path: '/pages/geocaching' },
    { label: 'Gaming',     fragment: 'services', path: '/pages/gaming' },
    { label: 'About',      fragment: 'about' },
  ],

  // ── Social / contact ───────────────────────────────────────────────────────
  social: {
    email:     null,
    phone:     null,
    linkedin:  null,
    github:    null,
    instagram: null,
    facebook:  'https://www.facebook.com/pages/Iron-Raptor/289506364491998',
  },

  // ── Hero section ───────────────────────────────────────────────────────────
  hero: {
    headline:             'Iron Raptor',
    subheadline:          'A gaming community built around Minecraft, competitive shooters, and more — always clever.',
    ctaLabel:             'See Our Games',
    ctaFragment:          'services',
    secondaryCtaLabel:    'About Us',
    secondaryCtaFragment: 'about',
  },

  // ── Games section ──────────────────────────────────────────────────────────
  services: [
    {
      icon:        '⛏️',
      title:       'Minecraft',
      description: 'Our longest-running home. Community servers, contraptions, and countless nights keeping the lights on.',
    },
    {
      icon:        '🎯',
      title:       'Airsoft',
      description: 'We organized field days and team events. While no longer active on the field, the memories are locked in.',
    },
    {
      icon:        '🎮',
      title:       'PC Gaming',
      description: 'From Guild Wars 2 and DayZ to whatever drops next — we\'re always down for the next adventure.',
    },
  ],

  // ── About section ──────────────────────────────────────────────────────────
  about: {
    heading: 'About Iron Raptor',
    paragraphs: [
      'Iron Raptor grew out of friends playing together in the early 2000s and formally founded as a group around 2008. What began with home-hosted Minecraft servers expanded into community-run servers, competitive shooters, and long-running gaming nights.',
      'Even if the servers are quiet now and the airsoft gear sits in the closet, the community endures through shared stories, Steam friends lists, and the occasional reunion session.',
    ],
    highlights: [
      { value: '2008',        label: 'Founded'                    },
      { value: 'Early 2000s', label: 'Playing Together Since'     },
      { value: '10+',         label: 'Games Played'               },
    ],
    imagePath: null,
  },

  // ── Info section (Minecraft servers, Twitch) ──────────────────────────────
  info: {
    heading: 'Minecraft & Streams',
    minecraft: {
      servers: [
        {
          name: 'Main (historical)',
          ip: null,
          status: 'Check posts',
          notes: 'Server IPs and details were historically posted on the old site — see archive: https://www.ironraptor.com/category/gaming/minecraft/. Update this entry with current IP addresses.',
        },
        {
          name: 'Hub (Bungee)',
          ip: null,
          status: 'Legacy',
          notes: 'Bungee Cord proxy was historically used; see https://www.ironraptor.com/bungee-cord-now-being-used-for-minecraft-servers/ for context.',
        },
      ],
      rules: [
        'No griefing or stealing.',
        'Be respectful to other players.',
        'No cheating, exploits, or client-side hacks.',
      ],
    },
    twitch: {
      channel: null,
      url: null,
      schedule: 'Occasional community streams — follow Facebook for live announcements.',
    },
  },

  // ── Additional standalone pages (route: /pages/:slug) ───────────────────
  pages: [
    {
      slug: 'minecraft',
      title: 'Minecraft',
      paragraphs: [
        'Iron Raptor has a long history with Minecraft — community servers, Bungee hub setups, and many plugin experiments over the years. The canonical server details and archive posts can be found on the legacy site (https://www.ironraptor.com/category/gaming/minecraft/).',
        'See the Info page for current connection notes and streaming updates. If you have a current server IP to publish, add it to the `info.minecraft.servers` array in `src/app/site.config.ts`.',
      ],
    },
    {
      slug: 'geocaching',
      title: 'Geocaching',
      paragraphs: [
        'We occasionally ran geocaching outings as a group — lightweight hikes, puzzle caches, and community meetups. This page is a place to record common meeting spots, hints, and past event notes.',
        'If you want to add upcoming geocaching events, add them here or open an issue in the repository so we can coordinate dates.',
      ],
    },
    {
      slug: 'gaming',
      title: 'Gaming',
      paragraphs: [
        'Gaming nights include Minecraft, Guild Wars 2, DayZ, and other multiplayer sessions. We also documented airsoft events and team days in the past.',
        'Check the Services section for a quick list of games and activities. To add a new game or project, update the `services` array in `src/app/site.config.ts`.',
      ],
    },
  ],

  // ── Testimonials — empty array hides the section ───────────────────────────
  testimonials: {
    heading:          'What the Group Says',
    googleReviewsUrl: null,
    items:            [],
  },

  // ── Contact section ────────────────────────────────────────────────────────
  contact: {
    heading:    'Connect',
    subheading: 'Find us on Facebook or Steam. Always down to game.',
    formspreeId: null,
  },
};

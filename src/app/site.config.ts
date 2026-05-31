// =============================================================================
// SITE CONFIGURATION — Iron Raptor
// Edit this file to customize your entire site. All content is driven from here.
// =============================================================================

export interface NavDropdownItem {
  label: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  fragment?: string;       // scroll to this id on the home page
  externalUrl?: string;    // external link (opens in new tab)
  children?: NavDropdownItem[]; // dropdown sub-items (decorative / labels)
}

export interface Page {
  slug: string;
  title: string;
  paragraphs: string[];
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Activity {
  icon: string;
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
  gaming: {
    heading: string;
    subheading: string;
    items: Service[];
    streamsUrl: string | null;  // link to streaming group/channel
    streamsLabel: string | null;
  };
  activities: {
    heading: string;
    subheading: string;
    items: Activity[];
  };
  about: {
    heading: string;
    paragraphs: string[];
    highlights: Highlight[];
    imagePath: string | null;
  };
  // legacy field kept so existing template refs don't break during transition
  services: Service[];
  info?: InfoSection;
  pages?: Page[];
  testimonials: {
    heading: string;
    items: Testimonial[];
    googleReviewsUrl: string | null;
  };
  contact: {
    heading: string;
    subheading: string;
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

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    {
      label: 'Gaming',
      fragment: 'gaming',
      children: [
        { label: 'Minecraft',  icon: '⛏️' },
        { label: 'PC Gaming',  icon: '🎮' },
        { label: 'Board Games', icon: '♟️' },
      ],
    },
    {
      label: 'Activities',
      fragment: 'activities',
      children: [
        { label: 'Laser Tag',   icon: '🔫' },
        { label: 'Airsoft',     icon: '🎯' },
        { label: 'Geocaching',  icon: '🗺️' },
      ],
    },
    {
      label: 'Streams',
      externalUrl: 'https://www.twitch.tv/ironraptor', // update to your stream URL
    },
    { label: 'About', fragment: 'about' },
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
    ctaLabel:             'Our Games',
    ctaFragment:          'gaming',
    secondaryCtaLabel:    'Activities',
    secondaryCtaFragment: 'activities',
  },

  // ── Gaming section ─────────────────────────────────────────────────────────
  gaming: {
    heading:      'Gaming',
    subheading:   'What we play',
    streamsUrl:   'https://www.twitch.tv/ironraptor', // update to your stream URL
    streamsLabel: 'Watch Us Live',
    items: [
      {
        icon:        '⛏️',
        title:       'Minecraft',
        description: 'Our longest-running home. Community servers, contraptions, and countless nights keeping the lights on.',
      },
      {
        icon:        '🎮',
        title:       'PC Gaming',
        description: 'From Guild Wars 2 and DayZ to whatever drops next — we\'re always down for the next adventure.',
      },
      {
        icon:        '♟️',
        title:       'Board Games',
        description: 'Tabletop nights and game-day sessions rounding out the mix.',
      },
    ],
  },

  // ── Activities section ─────────────────────────────────────────────────────
  activities: {
    heading:    'Activities',
    subheading: 'Beyond the screen',
    items: [
      {
        icon:        '🔫',
        title:       'Laser Tag',
        description: 'Team-based laser tag sessions and competitive events — all the fun, none of the bruises.',
      },
      {
        icon:        '🎯',
        title:       'Airsoft',
        description: 'We organized field days and team events. While no longer active on the field, the memories are locked in.',
      },
      {
        icon:        '🗺️',
        title:       'Geocaching',
        description: 'Lightweight hikes, puzzle caches, and community meetups — a great excuse to get outside.',
      },
    ],
  },

  // ── About section ──────────────────────────────────────────────────────────
  about: {
    heading: 'About Iron Raptor',
    paragraphs: [
      'Iron Raptor grew out of friends playing together in the early 2000s and formally founded as a group around 2008. What began with home-hosted Minecraft servers expanded into community-run servers, competitive shooters, and long-running gaming nights.',
      'Even if the servers are quiet now and the airsoft gear sits in the closet, the community endures through shared stories, Steam friends lists, and the occasional reunion session.',
    ],
    highlights: [
      { value: '2008',        label: 'Founded'                },
      { value: 'Early 2000s', label: 'Playing Together Since' },
      { value: '10+',         label: 'Games Played'           },
    ],
    imagePath: null,
  },

  // ── Legacy: kept for any remaining template refs ───────────────────────────
  services: [],

  // ── Testimonials — empty array hides the section ──────────────────────────
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

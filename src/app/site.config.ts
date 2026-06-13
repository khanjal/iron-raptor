// SITE CONFIG — Iron Raptor (final, cleaned)

export interface NavItem { label: string; fragment?: string; routerLink?: string; externalUrl?: string; children?: NavItem[]; icon?: string }
export interface Service { icon: string; title: string; description: string; details?: any[]; rules?: string[]; games?: any[] }
export interface Activity { icon: string; title: string; description: string; details?: string[]; imagePath?: string; externalUrl?: string; routerLink?: string }
export type StreamPlatform = 'twitch' | 'youtube' | 'rumble';
export interface StreamerGroup { platform: StreamPlatform; streamers: { name: string; username?: string }[] }
export interface HistoryEntry { year: string; title: string; description: string; tags?: string[] }
export interface Page { slug: string; title?: string; heading?: string; content?: string; paragraphs?: string[] }

export interface SiteConfig { business: { name: string; tagline: string; year: number }; nav: NavItem[]; social: any; hero: any; gaming: any; activities: any; about: any; history?: HistoryEntry[]; pages?: Page[]; testimonials: any; contact: any }

export const SITE_CONFIG: SiteConfig = {
  business: { name: 'Iron Raptor', tagline: 'Never bring a human to a raptor fight', year: 2007 },
  nav: [ { label: 'Gaming', routerLink: '/games' }, { label: 'Activities', routerLink: '/activities' }, { label: 'About', fragment: 'about' }, { label: 'History', routerLink: '/history' } ],
  social: { email: null, phone: null, linkedin: null, github: null, instagram: null, facebook: null, steam: 'https://steamcommunity.com/groups/ironraptor' },
  hero: { headline: 'Iron Raptor', subheadline: 'A gaming community built around Minecraft, competitive shooters, and more — always clever.', ctaLabel: 'Our Games', ctaFragment: 'gaming', secondaryCtaLabel: 'Activities', secondaryCtaFragment: 'activities' },

  gaming: {
    heading: 'Gaming', subheading: 'What we play', streamsGroupUrl: null, streamsLabel: 'Streams',
    streamerGroups: [ { platform: 'twitch', streamers: [ { name: 'Edman545' }, { name: 'Khan Jal' } ] }, { platform: 'rumble', streamers: [ { name: 'Edman545', username: 'MeatheadsMachines' } ] } ],
    items: [
      { icon: '⛏️', title: 'Minecraft', description: 'Community servers and creative builds.', details: [ { label: 'Server software', value: 'Paper' } ], rules: [ 'No griefing.' ], routerLink: '/games/minecraft' },
      { icon: '🎮', title: 'PC Gaming', description: 'LANs and competitive play.' },
      { icon: '♟️', title: 'Board Games', description: 'Tabletop nights.' },
      { icon: '🧭', title: 'EverQuest', description: 'Classic EverQuest nights and nostalgia runs.' },
      { icon: '🔗', title: 'Steam', description: 'Community group and events. Join our Steam group.', details: [ 'Steam group: https://steamcommunity.com/groups/ironraptor' ], routerLink: '/games/steam' }
    ]
  },

  activities: {
    heading: 'Activities', subheading: 'Beyond the screen', items: [
      { icon: '🔫', title: 'Laser Tag', description: 'Outdoor team battles.', details: [ 'Laser tag active 2000–2003', 'Two original teams: Laser Commandos and Nod Laser Challenge', 'Social meetups and post-match LAN nights through 2006' ], imagePath: 'assets/images/activities/laser-tag.svg' },
      { icon: '🎯', title: 'Airsoft', description: 'Field events and community skirmishes during the Iron Raptor era (2007–2009).', details: [ 'Organized Iron Raptor airsoft events', 'Active 2007–2009', 'Events: Field Day 2007, Skirmish at Ridge 2008' ], imagePath: 'assets/images/activities/airsoft-1.svg' },
      { icon: '🗺️', title: 'Geocaching', description: 'Puzzle caches and hikes.', imagePath: 'assets/images/activities/geocaching.svg', routerLink: '/activities/geocaching' },
      { icon: '🚴', title: 'Bicycling', description: 'Group rides.', imagePath: 'assets/images/activities/biking.svg' }
    ]
  },

  about: { heading: 'About Iron Raptor', paragraphs: [ 'Iron Raptor grew from friends playing in the early 2000s and was founded in 2007.', 'Community endures through shared stories and occasional meetups.' ], highlights: [ { value: '2007', label: 'Founded' } ], imagePath: null },

  history: [
    { year: 'Sep 2000', title: 'First Battle', description: "Two rival laser tag crews met for the first time — our first game together.", tags: ['Laser Tag'] },
    { year: '2000–2006', title: 'Pre‑Iron Raptor', description: 'Played laser tag (2000–2003); LAN parties and social meetups continued through 2006.', tags: ['Laser Tag','LAN'] },
    { year: '2001–2009', title: 'LAN Parties Era', description: 'Regular LAN nights with full setups and rotating titles.', tags: ['LAN'] },
    { year: '2007', title: 'Iron Raptor Founded', description: 'The group adopted the Iron Raptor name and began organizing under that banner.', tags: ['Founding'] },
    { year: '2007–2009', title: 'Airsoft Era', description: 'Iron Raptor took to the fields — organized airsoft events and community skirmishes.', tags: ['Airsoft'] },
    { year: '2011–2014', title: 'Minecraft Prime', description: 'Community servers peaked with many builds and events.', tags: ['Minecraft'] },
    { year: '2015–Present', title: 'Continuing Online', description: 'Smaller online gatherings and continued friendships.', tags: ['Online'] },
    { year: 'Ongoing', title: 'Motto', description: 'Never bring a human to a raptor fight.', tags: ['Culture'] },
  ],

  pages: [
    {
      slug: 'laser-tag',
      title: 'Laser Commandos — Game Log',
      paragraphs: [
        'This page summarizes Laser Commandos game activity from 2000–2004. Full logs (dates, times, participants, and photos) are available at https://khanjal.com/lasertag/lasercommandos_games.html',
        'Teams: Laser Commandos, Nod Laser Challenge.',
        'Yearly summary: 2000 — 39 games; 2001 — 19 games; 2002 — 2 games; 2003 — 3 games; 2004 — 1 game.',
        'If you want, I can import the full game logs into this site or add photo galleries. Reply if you want the full import.'
      ]
    }
  ],
  testimonials: { heading: 'What people say', items: [], googleReviewsUrl: null },
  contact: { heading: 'Get in touch', subheading: 'Have a question or want to join? Reach out.', formspreeId: null }
}

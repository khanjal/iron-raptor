// SITE CONFIG — Iron Raptor (final, cleaned)

export interface NavItem { label: string; fragment?: string; routerLink?: string; externalUrl?: string; children?: NavItem[]; icon?: string }
export interface Service { icon: string; title: string; description: string; details?: any[]; rules?: string[]; games?: any[] }
export interface Activity { icon: string; title: string; description: string; details?: string[]; imagePath?: string; externalUrl?: string; routerLink?: string }
export type StreamPlatform = 'twitch' | 'youtube' | 'rumble';
export interface StreamerGroup { platform: StreamPlatform; streamers: { name: string; username?: string }[] }
export interface HistoryEntry { year: string; title: string; description: string; tags?: string[] }
export interface Page { slug: string; title?: string; heading?: string; content?: string; paragraphs?: string[] }

export interface SiteConfig { business: { name: string; tagline: string; year: number }; nav: NavItem[]; social: any; hero: any; gaming: any; activities: any; about: any; history?: HistoryEntry[]; pages?: Page[]; contact: any }

export const SITE_CONFIG: SiteConfig = {
  business: { name: 'Iron Raptor', tagline: 'Never bring a human to a raptor fight', year: 2007 },
  nav: [
    { label: 'Games', routerLink: '/games', children: [
      { label: 'Minecraft', routerLink: '/games/minecraft', icon: '⛏️' },
      { label: 'Steam', routerLink: '/games/steam', icon: '🔗' },
      { label: 'Blizzard', routerLink: '/games/blizzard', icon: '❄️' },
      { label: 'Diablo 3', routerLink: '/games/diablo-3', icon: '😈' },
      { label: 'Star Trek Online', routerLink: '/games/star-trek-online', icon: '🖖' },
      { label: 'Marvel Strike Force', routerLink: '/games/marvel-strike-force', icon: '🦸' }
    ] },
    { label: 'Activities', routerLink: '/activities' },
    { label: 'About', fragment: 'about' },
    { label: 'History', routerLink: '/history' }
  ],
  // discord: set to null to hide the Discord button everywhere. talk.ironraptor.com redirects to this invite.
  social: { email: null, phone: null, steam: 'https://steamcommunity.com/groups/ironraptor', discord: 'https://discord.gg/67kJuw7' },
  hero: { headline: 'Iron Raptor', subheadline: 'A gaming community since 2007 — Minecraft, Blizzard, Star Trek Online and more. Always clever.', ctaLabel: 'Our Games', ctaFragment: 'gaming', secondaryCtaLabel: 'Activities', secondaryCtaFragment: 'activities' },

  gaming: {
    heading: 'Gaming', subheading: 'What we play',
    streamerGroups: [ { platform: 'twitch', streamers: [ { name: 'Edman545' }, { name: 'Khan Jal' } ] }, { platform: 'rumble', streamers: [ { name: 'Edman545', username: 'MeatheadsMachines' } ] } ],
    items: [
      { icon: '⛏️', title: 'Minecraft', description: 'Community servers, live map and survival guide.', routerLink: '/games/minecraft' },
      { icon: '🔗', title: 'Steam', description: 'Our community group and the games we play together.', routerLink: '/games/steam' },
      { icon: '❄️', title: 'Blizzard', description: 'Battle.net tags for the crew.', routerLink: '/games/blizzard' },
      { icon: '😈', title: 'Diablo 3', description: 'The [IR] Iron Raptor clan and player profiles.', routerLink: '/games/diablo-3' },
      { icon: '🖖', title: 'Star Trek Online', description: 'The Iron Raptor fleet and its captains.', routerLink: '/games/star-trek-online' },
      { icon: '🦸', title: 'Marvel Strike Force', description: 'Alliance resources and spreadsheet.', routerLink: '/games/marvel-strike-force' }
    ]
  },

  activities: {
    heading: 'Activities', subheading: 'Beyond the screen', items: [
      { icon: '🔫', title: 'Laser Tag', description: 'Outdoor team battles.', details: [ 'Laser tag active 2000–2004', 'Two original teams: Laser Commandos and Nod Laser Challenge', 'Social meetups and post-match LAN nights through 2006' ], imagePath: 'assets/images/activities/laser-tag.svg' },
      { icon: '🎯', title: 'Airsoft', description: 'Field events and community skirmishes during the Iron Raptor era (2007–2009).', details: [ 'Organized Iron Raptor airsoft events', 'Active 2007–2009', 'Events: Field Day 2007, Skirmish at Ridge 2008' ], imagePath: 'assets/images/activities/airsoft-1.svg' },
      { icon: '🗺️', title: 'Geocaching', description: 'Puzzle caches and hikes.', imagePath: 'assets/images/activities/geocaching.svg', routerLink: '/activities/geocaching' },
      { icon: '🚴', title: 'Bicycling', description: 'Group rides.', imagePath: 'assets/images/activities/biking.svg' }
    ]
  },

  about: { heading: 'About Iron Raptor', paragraphs: [ 'Iron Raptor grew from friends playing in the early 2000s and was founded in 2007.', 'Community endures through shared stories and occasional meetups.' ], highlights: [ { value: '2007', label: 'Founded' } ], imagePath: null },

  history: [
    { year: 'Sep 2000', title: 'First Battle', description: "Two rival laser tag crews met for the first time — our first game together.", tags: ['Laser Tag'] },
    { year: '2000–2006', title: 'Pre‑Iron Raptor', description: 'Played laser tag (2000–2004); LAN parties and social meetups continued through 2006.', tags: ['Laser Tag','LAN'] },
    { year: '2001–2009', title: 'LAN Parties Era', description: 'Regular LAN nights with full setups and rotating titles.', tags: ['LAN'] },
    { year: '2007', title: 'Iron Raptor Founded', description: 'The group adopted the Iron Raptor name and began organizing under that banner.', tags: ['Founding'] },
    { year: '2007–2009', title: 'Airsoft Era', description: 'Iron Raptor took to the fields — organized airsoft events and community skirmishes.', tags: ['Airsoft'] },
    { year: '2011–2014', title: 'Minecraft Prime', description: 'Community servers peaked with many builds and events.', tags: ['Minecraft'] },
    { year: '2013', title: 'BungeeCord Network', description: 'Minecraft moved to a BungeeCord proxy so several servers could share one address (Jan 2013); the Minecraft Server Manager entered closed beta that fall.', tags: ['Minecraft'] },
    { year: '2013–2017', title: 'Server Upgrades', description: 'The Minecraft servers followed each release, from 1.5 in April 2013 to 1.11 in November 2016, and came back online in June 2017.', tags: ['Minecraft'] },
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
        'Yearly summary: 2000 — 39 games; 2001 — 19 games; 2002 — 2 games; 2003 — 3 games; 2004 — 1 game.'

      ]
    }
  ],
  contact: { heading: 'Join the community', subheading: 'Chat with us on Discord or join the Steam group.' }
}

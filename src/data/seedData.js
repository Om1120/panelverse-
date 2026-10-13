// Seed data for PANELVERSE - Neo-Comic Brutalism Comic & Manga Universe
export const SEED_GENRES = [
  { id: 'superheroes', name: 'Superheroes', color: '#FF3B30', desc: 'Vigilantes, cosmic gods, and masked anomalies fighting extinction.', icon: 'Zap' },
  { id: 'manga', name: 'Manga & Shonen', color: '#8B5CF6', desc: 'High-octane battles, deep spirit bonds, and right-to-left epics.', icon: 'Flame' },
  { id: 'sci-fi', name: 'Sci-Fi & Cyberpunk', color: '#00F0FF', desc: 'Neon skylines, synthetic memories, and rogue neural systems.', icon: 'Cpu' },
  { id: 'fantasy', name: 'Dark Fantasy', color: '#DFFF00', desc: 'Cursed blades, forgotten pantheons, and blood-oath kingdoms.', icon: 'Shield' },
  { id: 'horror', name: 'Horror & Occult', color: '#FF0055', desc: 'Psychological rot, cosmic dread, and eldritch ink.', icon: 'Skull' },
  { id: 'mystery', name: 'Mystery & Noir', color: '#A3A3A3', desc: 'Rain-soaked detectives, corporate conspiracy, and missing witnesses.', icon: 'Search' },
  { id: 'action', name: 'Street Action', color: '#B7FF3C', desc: 'Underground fighting rings, heist crews, and high-speed chases.', icon: 'Target' },
  { id: 'indie', name: 'Indie & Experimental', color: '#F5F1E8', desc: 'Radical print zines, subversive art, and raw storytelling.', icon: 'Feather' },
  { id: 'webcomics', name: 'Webcomics', color: '#FACC15', desc: 'Vertical endless scroll masterpieces formatted for mobile screens.', icon: 'Smartphone' },
  { id: 'slice-of-life', name: 'Slice of Life', color: '#FB7185', desc: 'Late night ramen shops, indie rock bands, and bittersweet romance.', icon: 'Coffee' }
];

export const SEED_AUTHORS = [
  {
    id: 'creator-01',
    name: 'Kaelen Voss',
    slug: 'kaelen-voss',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    biography: 'Cyberpunk visual storyteller and underground zine pioneer from Neo-Berlin. Known for high-contrast screentones and hard-edge linework.',
    country: 'Germany / International',
    roles: ['Writer', 'Artist', 'Letterer'],
    bookIds: ['pv-001', 'pv-005', 'pv-012']
  },
  {
    id: 'creator-02',
    name: 'Yukihiro Sato',
    slug: 'yukihiro-sato',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    biography: 'Former shonen assistant turned rogue creator. Master of dynamic kinetic speed lines and supernatural battle choreography.',
    country: 'Japan',
    roles: ['Mangaka', 'Storyboarder'],
    bookIds: ['pv-002', 'pv-008']
  },
  {
    id: 'creator-03',
    name: 'Mara Thorne',
    slug: 'mara-thorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    biography: 'Eisner-nominated dark fantasy author exploring cursed heirlooms, monstrous biology, and eldritch folklore.',
    country: 'United Kingdom',
    roles: ['Writer'],
    bookIds: ['pv-003', 'pv-009']
  },
  {
    id: 'creator-04',
    name: 'Damon Cross',
    slug: 'damon-cross',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    biography: 'Illustrator and comic brutalist based in Chicago. Celebrated for heavy ink splatter, raw spray-paint textures, and kinetic graffiti lettering.',
    country: 'United States',
    roles: ['Artist', 'Colourist'],
    bookIds: ['pv-004', 'pv-007']
  },
  {
    id: 'creator-05',
    name: 'Aoi Katsuragi',
    slug: 'aoi-katsuragi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    biography: 'Creator of the smash webcomic sensory phenomenon Void Signal. Blends gentle slice-of-life humor with sudden cosmic terror.',
    country: 'Japan',
    roles: ['Creator', 'Artist'],
    bookIds: ['pv-006', 'pv-011']
  },
  {
    id: 'creator-06',
    name: 'Santiago Reyes',
    slug: 'santiago-reyes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    biography: 'Graphic novelist blending Mexican magical realism with retro arcade mecha aesthetics.',
    country: 'Mexico',
    roles: ['Writer', 'Artist'],
    bookIds: ['pv-010', 'pv-014']
  }
];

export const SEED_SERIES = [
  {
    id: 'series-01',
    name: 'CYBERPUNK ZERO: PROTOCOL',
    description: 'An unrelenting journey through the neon underbelly of Megacity 09 where rogue androids harvest human dreams.',
    creatorName: 'Kaelen Voss',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    genre: 'Sci-Fi & Cyberpunk',
    bookIds: ['pv-001', 'pv-005', 'pv-012'],
    readingOrder: ['pv-001', 'pv-005', 'pv-012']
  },
  {
    id: 'series-02',
    name: 'KAIJU BREAKER: RESURGENCE',
    description: 'When tectonic beasts breach the Pacific shelf, teenagers equipped with bio-neural synaptic rigs are drafted into the vanguard.',
    creatorName: 'Yukihiro Sato',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    genre: 'Manga & Shonen',
    bookIds: ['pv-002', 'pv-008'],
    readingOrder: ['pv-002', 'pv-008']
  },
  {
    id: 'series-03',
    name: 'THE HOLLOW KINGDOM',
    description: 'A dark medieval tapestry of fallen heraldry, sentient plague swords, and a silent queen who speaks only in thunder.',
    creatorName: 'Mara Thorne',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    genre: 'Dark Fantasy',
    bookIds: ['pv-003', 'pv-009'],
    readingOrder: ['pv-003', 'pv-009']
  }
];

// Reusable mock digital page generator for reading experience
const createDigitalPages = (title, count = 8, themeColor = '#DFFF00') => {
  return Array.from({ length: count }, (_, idx) => {
    const pageNum = idx + 1;
    return {
      pageNumber: pageNum,
      title: `${title} - Page ${pageNum}`,
      imageUrl: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
      ][idx % 8],
      panels: [
        {
          id: `p-${pageNum}-1`,
          caption: pageNum === 1 ? 'THE SKY WAS STRIPPED OF STARS.' : `SEQUENCE 0${pageNum}: NEURAL LOCK ENGAGED.`,
          dialogue: [
            { character: 'NEXUS', text: `Status report on Sector ${pageNum * 7}. Synaptic bleed is accelerating!` },
            { character: 'KIRA', text: 'Hold the frequency! If the relay fractures now, everything burns.' }
          ]
        },
        {
          id: `p-${pageNum}-2`,
          caption: 'KRAAA-KOOOM!',
          dialogue: [
            { character: 'UNKNOWN', text: 'You were warned never to open the seventh vault...' }
          ]
        }
      ]
    };
  });
};

export const SEED_BOOKS = [
  {
    id: 'pv-001',
    title: 'NEON GHOST: PROTOCOL 9',
    slug: 'neon-ghost-protocol-9',
    subtitle: 'The Neural Rebellion Begins',
    description: 'In Neo-Kyoto 2099, a burnt-out synaptic detective discovers her synthetic memories are being auctioned to corporate elites. She has 48 hours before her core personality is permanently wiped.',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    creators: ['Kaelen Voss', 'Damon Cross'],
    seriesId: 'series-01',
    seriesName: 'CYBERPUNK ZERO: PROTOCOL',
    issueNumber: 1,
    isbn: '978-1-9882-0101-3',
    publisher: 'Radical Circuit Press',
    publicationDate: '2024-01-15',
    pageCount: 36,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Sci-Fi & Cyberpunk', 'Action', 'Mystery & Noir'],
    rating: 4.9,
    reviewCount: 38,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Act I: Ghost in the RAM', startPage: 1 },
      { id: 2, title: 'Act II: The Auctioneer', startPage: 5 }
    ],
    digitalPages: createDigitalPages('NEON GHOST', 8, '#DFFF00'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 3,
      availableCopies: 2,
      copies: [
        { id: 'c1-1', copyNumber: '#01', barcode: 'NGP-001-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c1-2', copyNumber: '#02', barcode: 'NGP-001-B', condition: 'Very Good', status: 'AVAILABLE' },
        { id: 'c1-3', copyNumber: '#03', barcode: 'NGP-001-C', condition: 'Good', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: true,
    isTrending: true,
    isNewDrop: false,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-002',
    title: 'KAIJU BREAKER: VOL. 1',
    slug: 'kaiju-breaker-vol-1',
    subtitle: 'Tectonic Awakening',
    description: 'When Level-7 colossi surface in the Sea of Japan, juvenile inmate Ren is fused with an experimental bio-titan shell. One rule: if his heart stops, the titan detonates.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    creators: ['Yukihiro Sato'],
    seriesId: 'series-02',
    seriesName: 'KAIJU BREAKER: RESURGENCE',
    issueNumber: 1,
    isbn: '978-4-08-872001-2',
    publisher: 'Shonen Strike Shuppan',
    publicationDate: '2023-11-20',
    pageCount: 192,
    language: 'English',
    readingDirection: 'rtl',
    genres: ['Manga & Shonen', 'Action', 'Sci-Fi & Cyberpunk'],
    rating: 4.8,
    reviewCount: 94,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Chapter 1: Blood Tide', startPage: 1 },
      { id: 2, title: 'Chapter 2: Neural Synchrony', startPage: 5 }
    ],
    digitalPages: createDigitalPages('KAIJU BREAKER', 8, '#FF3B30'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 4,
      availableCopies: 1,
      copies: [
        { id: 'c2-1', copyNumber: '#01', barcode: 'KB-VOL1-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c2-2', copyNumber: '#02', barcode: 'KB-VOL1-B', condition: 'Good', status: 'LOANED' },
        { id: 'c2-3', copyNumber: '#03', barcode: 'KB-VOL1-C', condition: 'Fair', status: 'LOANED' },
        { id: 'c2-4', copyNumber: '#04', barcode: 'KB-VOL1-D', condition: 'Mint', status: 'RESERVED' }
      ]
    },
    status: 'active',
    featured: true,
    isTrending: true,
    isNewDrop: false,
    isManga: true,
    isIndie: false
  },
  {
    id: 'pv-003',
    title: 'THE HOLLOW KINGDOM #01',
    slug: 'the-hollow-kingdom-01',
    subtitle: 'Throne of Black Ash',
    description: 'An ancient kingdom shrouded in perpetual eclipse. The only defense against the creeping Void rot is a cast of disgraced knights armed with whisper-steel broadswords.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    creators: ['Mara Thorne'],
    seriesId: 'series-03',
    seriesName: 'THE HOLLOW KINGDOM',
    issueNumber: 1,
    isbn: '978-0-7564-0012-8',
    publisher: 'Obsidian Grimoire Press',
    publicationDate: '2024-02-01',
    pageCount: 48,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Dark Fantasy', 'Horror & Occult'],
    rating: 4.7,
    reviewCount: 42,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'The Silent Coronation', startPage: 1 }
    ],
    digitalPages: createDigitalPages('THE HOLLOW KINGDOM', 8, '#8B5CF6'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 0, // OUT OF STOCK to test reservation flow!
      copies: [
        { id: 'c3-1', copyNumber: '#01', barcode: 'HK-001-A', condition: 'Good', status: 'LOANED' },
        { id: 'c3-2', copyNumber: '#02', barcode: 'HK-001-B', condition: 'Mint', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: true,
    isTrending: false,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-004',
    title: 'STREET APEX: GRAFFITI WAR',
    slug: 'street-apex-graffiti-war',
    subtitle: 'Underground Turf Syndicate',
    description: 'Spray tags aren’t just territory markers—they are arcane sigils that manipulate gravity and concrete. The tagger crew known as ACID ROYALS fights to liberate District 4.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    creators: ['Damon Cross'],
    seriesId: null,
    seriesName: null,
    issueNumber: 1,
    isbn: '978-0-9988-7711-2',
    publisher: 'Concrete Noise Ink',
    publicationDate: '2024-03-10',
    pageCount: 32,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Street Action', 'Indie & Experimental', 'Superheroes'],
    rating: 4.9,
    reviewCount: 51,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Can You Hear The Spray?', startPage: 1 }
    ],
    digitalPages: createDigitalPages('STREET APEX', 8, '#B7FF3C'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 3,
      availableCopies: 3,
      copies: [
        { id: 'c4-1', copyNumber: '#01', barcode: 'SA-GW-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c4-2', copyNumber: '#02', barcode: 'SA-GW-B', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c4-3', copyNumber: '#03', barcode: 'SA-GW-C', condition: 'Very Good', status: 'AVAILABLE' }
      ]
    },
    status: 'active',
    featured: true,
    isTrending: true,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-005',
    title: 'CYBERPUNK ZERO: OVERCLOCK',
    slug: 'cyberpunk-zero-overclock',
    subtitle: 'Issue #002 of Protocol Saga',
    description: 'The adrenaline-soaked continuation: the underground rail lines are hijacked by rogue bio-hackers while automated drones lock down the city perimeter.',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    creators: ['Kaelen Voss'],
    seriesId: 'series-01',
    seriesName: 'CYBERPUNK ZERO: PROTOCOL',
    issueNumber: 2,
    isbn: '978-1-9882-0102-0',
    publisher: 'Radical Circuit Press',
    publicationDate: '2024-02-18',
    pageCount: 32,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Sci-Fi & Cyberpunk', 'Action'],
    rating: 4.8,
    reviewCount: 29,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'High Velocity Hijack', startPage: 1 }
    ],
    digitalPages: createDigitalPages('CYBERPUNK ZERO: OVERCLOCK', 8, '#00F0FF'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 1,
      copies: [
        { id: 'c5-1', copyNumber: '#01', barcode: 'CPZ-002-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c5-2', copyNumber: '#02', barcode: 'CPZ-002-B', condition: 'Good', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: true,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-006',
    title: 'VOID SIGNAL: APARTMENT 404',
    slug: 'void-signal-apartment-404',
    subtitle: 'A Webcomic Horror Thriller',
    description: 'A quiet freelance animator notices her apartment windows look out into a skyline that doesn’t exist on any Tokyo map. Then the intercom rings.',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    creators: ['Aoi Katsuragi'],
    seriesId: null,
    seriesName: null,
    issueNumber: 1,
    isbn: '978-4-10-998822-1',
    publisher: 'Moonlight Scroll',
    publicationDate: '2024-03-01',
    pageCount: 64,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Horror & Occult', 'Webcomics', 'Mystery & Noir'],
    rating: 4.9,
    reviewCount: 88,
    digitalAvailability: true,
    digitalContentType: 'full',
    chapters: [
      { id: 1, title: 'Episode 1: The Wrong Floor', startPage: 1 },
      { id: 2, title: 'Episode 2: Dial Tone In Reverse', startPage: 5 }
    ],
    digitalPages: createDigitalPages('VOID SIGNAL', 8, '#FF0055'),
    physicalBorrowingEnabled: false, // Digital-only webcomic!
    physicalInventory: {
      totalCopies: 0,
      availableCopies: 0,
      copies: []
    },
    status: 'active',
    featured: true,
    isTrending: true,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-007',
    title: 'SOLAR KNIGHT: ECLIPSE PROTOCOL',
    slug: 'solar-knight-eclipse-protocol',
    subtitle: 'The Last Sentinel of Sol',
    description: 'When the sun is shrouded by a Dyson swarm, the lone protector of terrestrial life must ignite his celestial core or let eternal frost claim humanity.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    creators: ['Damon Cross'],
    seriesId: null,
    seriesName: null,
    issueNumber: 1,
    isbn: '978-0-1234-5678-9',
    publisher: 'Vanguard Comics',
    publicationDate: '2023-10-12',
    pageCount: 40,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Superheroes', 'Sci-Fi & Cyberpunk'],
    rating: 4.6,
    reviewCount: 31,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Solar Flare', startPage: 1 }
    ],
    digitalPages: createDigitalPages('SOLAR KNIGHT', 8, '#DFFF00'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 2,
      copies: [
        { id: 'c7-1', copyNumber: '#01', barcode: 'SK-EP-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c7-2', copyNumber: '#02', barcode: 'SK-EP-B', condition: 'Very Good', status: 'AVAILABLE' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: false,
    isNewDrop: false,
    isManga: false,
    isIndie: false
  },
  {
    id: 'pv-008',
    title: 'KAIJU BREAKER: VOL. 2',
    slug: 'kaiju-breaker-vol-2',
    subtitle: 'Deep Trench Clash',
    description: 'Ren faces the Leviathan Alpha in the depths of the Mariana Trench while military brass debates incinerating the entire sector with sub-zero warheads.',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    creators: ['Yukihiro Sato'],
    seriesId: 'series-02',
    seriesName: 'KAIJU BREAKER: RESURGENCE',
    issueNumber: 2,
    isbn: '978-4-08-872002-9',
    publisher: 'Shonen Strike Shuppan',
    publicationDate: '2024-01-10',
    pageCount: 208,
    language: 'English',
    readingDirection: 'rtl',
    genres: ['Manga & Shonen', 'Action'],
    rating: 4.9,
    reviewCount: 67,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Submerged Depths', startPage: 1 }
    ],
    digitalPages: createDigitalPages('KAIJU BREAKER VOL 2', 8, '#FF3B30'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 3,
      availableCopies: 0, // All copies loaned to test reservation
      copies: [
        { id: 'c8-1', copyNumber: '#01', barcode: 'KB-VOL2-A', condition: 'Mint', status: 'LOANED' },
        { id: 'c8-2', copyNumber: '#02', barcode: 'KB-VOL2-B', condition: 'Good', status: 'LOANED' },
        { id: 'c8-3', copyNumber: '#03', barcode: 'KB-VOL2-C', condition: 'Fair', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: true,
    isNewDrop: true,
    isManga: true,
    isIndie: false
  },
  {
    id: 'pv-009',
    title: 'THE HOLLOW KINGDOM #02',
    slug: 'the-hollow-kingdom-02',
    subtitle: 'Whispers from the Tomb',
    description: 'The black plague swords begin to sing. Lady Evelyn ventures alone into the catacombs of the dead emperors to forge an alliance with the tomb spirits.',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    creators: ['Mara Thorne'],
    seriesId: 'series-03',
    seriesName: 'THE HOLLOW KINGDOM',
    issueNumber: 2,
    isbn: '978-0-7564-0013-5',
    publisher: 'Obsidian Grimoire Press',
    publicationDate: '2024-03-20',
    pageCount: 52,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Dark Fantasy', 'Horror & Occult'],
    rating: 4.8,
    reviewCount: 22,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Into the Tomb', startPage: 1 }
    ],
    digitalPages: createDigitalPages('THE HOLLOW KINGDOM #2', 8, '#8B5CF6'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 2,
      copies: [
        { id: 'c9-1', copyNumber: '#01', barcode: 'HK-002-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c9-2', copyNumber: '#02', barcode: 'HK-002-B', condition: 'Mint', status: 'AVAILABLE' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: false,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-010',
    title: 'LUCHA MECHA: VOLT AZTECA',
    slug: 'lucha-mecha-volt-azteca',
    subtitle: 'Ring of Steel & Spirit',
    description: 'In Mexico City 2140, masked luchadores pilot 60-foot hydraulic robotic armor inside the Aztec Arena. When cartel oligarchs fix the championship, champion Jaguar Dorado refuses to take a dive.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    creators: ['Santiago Reyes'],
    seriesId: null,
    seriesName: null,
    issueNumber: 1,
    isbn: '978-6-0701-4455-8',
    publisher: 'Arena Futura Press',
    publicationDate: '2023-12-05',
    pageCount: 112,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Street Action', 'Sci-Fi & Cyberpunk', 'Indie & Experimental'],
    rating: 4.9,
    reviewCount: 45,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Round 1: Aztec Steel', startPage: 1 }
    ],
    digitalPages: createDigitalPages('LUCHA MECHA', 8, '#B7FF3C'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 1,
      copies: [
        { id: 'c10-1', copyNumber: '#01', barcode: 'LM-VA-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c10-2', copyNumber: '#02', barcode: 'LM-VA-B', condition: 'Very Good', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: true,
    isNewDrop: false,
    isManga: false,
    isIndie: true
  },
  {
    id: 'pv-011',
    title: 'MIDNIGHT RAMEN DIARIES',
    slug: 'midnight-ramen-diaries',
    subtitle: 'Noodles, Cats, and Quiet Regrets',
    description: 'A cozy, heartfelt slice-of-life comedy about a culinary dropout who runs a back-alley ramen cart open only between 1:00 AM and 5:00 AM, serving strange midnight wanderers.',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    creators: ['Aoi Katsuragi'],
    seriesId: null,
    seriesName: null,
    issueNumber: 1,
    isbn: '978-4-09-182334-1',
    publisher: 'Showa Vibe Editions',
    publicationDate: '2023-08-14',
    pageCount: 160,
    language: 'English',
    readingDirection: 'rtl',
    genres: ['Slice of Life', 'Manga & Shonen'],
    rating: 4.9,
    reviewCount: 112,
    digitalAvailability: true,
    digitalContentType: 'full',
    chapters: [
      { id: 1, title: 'Bowl 1: Chashu at 2 AM', startPage: 1 }
    ],
    digitalPages: createDigitalPages('MIDNIGHT RAMEN', 8, '#FB7185'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 3,
      availableCopies: 2,
      copies: [
        { id: 'c11-1', copyNumber: '#01', barcode: 'MRD-001-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c11-2', copyNumber: '#02', barcode: 'MRD-001-B', condition: 'Good', status: 'AVAILABLE' },
        { id: 'c11-3', copyNumber: '#03', barcode: 'MRD-001-C', condition: 'Fair', status: 'LOANED' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: true,
    isNewDrop: false,
    isManga: true,
    isIndie: true
  },
  {
    id: 'pv-012',
    title: 'CYBERPUNK ZERO: FINAL REVISION',
    slug: 'cyberpunk-zero-final-revision',
    subtitle: 'Issue #003 of Protocol Saga',
    description: 'The mind-bending finale: Detective Voss confronts the neural architects at the peak of the Sky-Tower as the entire memory network of the city disintegrates.',
    coverImage: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=800&q=80',
    creators: ['Kaelen Voss'],
    seriesId: 'series-01',
    seriesName: 'CYBERPUNK ZERO: PROTOCOL',
    issueNumber: 3,
    isbn: '978-1-9882-0103-7',
    publisher: 'Radical Circuit Press',
    publicationDate: '2024-03-25',
    pageCount: 48,
    language: 'English',
    readingDirection: 'ltr',
    genres: ['Sci-Fi & Cyberpunk', 'Action', 'Mystery & Noir'],
    rating: 5.0,
    reviewCount: 18,
    digitalAvailability: true,
    digitalContentType: 'sample',
    chapters: [
      { id: 1, title: 'Terminal Output', startPage: 1 }
    ],
    digitalPages: createDigitalPages('CYBERPUNK ZERO #3', 8, '#00F0FF'),
    physicalBorrowingEnabled: true,
    physicalInventory: {
      totalCopies: 2,
      availableCopies: 2,
      copies: [
        { id: 'c12-1', copyNumber: '#01', barcode: 'CPZ-003-A', condition: 'Mint', status: 'AVAILABLE' },
        { id: 'c12-2', copyNumber: '#02', barcode: 'CPZ-003-B', condition: 'Mint', status: 'AVAILABLE' }
      ]
    },
    status: 'active',
    featured: false,
    isTrending: false,
    isNewDrop: true,
    isManga: false,
    isIndie: true
  }
];

export const SEED_REVIEWS = [
  {
    id: 'rev-01',
    bookId: 'pv-001',
    userId: 'u-alex',
    userName: 'Alex Rider',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The neo-noir atmosphere is breathtaking. The typography in the dialogue bubbles feels like listening to an analog radio in a rain-slicked alley.',
    createdAt: '2024-03-01T12:00:00Z'
  },
  {
    id: 'rev-02',
    bookId: 'pv-001',
    userId: 'u-hana',
    userName: 'Hana Kuroda',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Read it three times already. Physical edition is in top condition when borrowed too. Highly recommended!',
    createdAt: '2024-03-05T15:30:00Z'
  },
  {
    id: 'rev-03',
    bookId: 'pv-002',
    userId: 'u-alex',
    userName: 'Alex Rider',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The kinetic double-spreads in the combat scenes are unreal. Yukihiro Sato is on another level right now.',
    createdAt: '2024-03-12T09:14:00Z'
  }
];

export const SEED_USERS = [
  {
    id: 'u-alex',
    email: 'reader@panelverse.io',
    displayName: 'Alex Rider',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    preferredGenres: ['Sci-Fi & Cyberpunk', 'Manga & Shonen', 'Dark Fantasy'],
    createdAt: '2024-01-01'
  },
  {
    id: 'u-admin',
    email: 'admin@panelverse.io',
    displayName: 'Vesper (Head Curator)',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    preferredGenres: ['All Genres'],
    createdAt: '2023-12-01'
  }
];

export const SEED_BORROWINGS = [
  {
    id: 'bw-901',
    userId: 'u-alex',
    userName: 'Alex Rider',
    bookId: 'pv-001',
    bookTitle: 'NEON GHOST: PROTOCOL 9',
    bookCover: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    copyId: 'c1-3',
    copyNumber: '#03',
    barcode: 'NGP-001-C',
    requestDate: '2024-03-02',
    approvalDate: '2024-03-03',
    issueDate: '2024-03-04',
    dueDate: '2024-03-25',
    returnDate: null,
    status: 'ISSUED',
    fineAmount: 0
  },
  {
    id: 'bw-902',
    userId: 'u-alex',
    userName: 'Alex Rider',
    bookId: 'pv-002',
    bookTitle: 'KAIJU BREAKER: VOL. 1',
    bookCover: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    copyId: 'c2-2',
    copyNumber: '#02',
    barcode: 'KB-VOL1-B',
    requestDate: '2024-02-10',
    approvalDate: '2024-02-11',
    issueDate: '2024-02-12',
    dueDate: '2024-03-05',
    returnDate: '2024-03-04',
    status: 'RETURNED',
    fineAmount: 0
  }
];

export const SEED_RESERVATIONS = [
  {
    id: 'res-401',
    userId: 'u-alex',
    userName: 'Alex Rider',
    bookId: 'pv-003',
    bookTitle: 'THE HOLLOW KINGDOM #01',
    bookCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    queuePosition: 1,
    createdAt: '2024-03-10T14:22:00Z',
    status: 'WAITING',
    notifiedAt: null
  }
];

export const SEED_NOTIFICATIONS = [
  {
    id: 'notif-01',
    userId: 'u-alex',
    type: 'borrowing',
    title: 'Physical Copy Issued!',
    message: 'Your loan for NEON GHOST: PROTOCOL 9 (#03) has been confirmed. Return by March 25.',
    read: false,
    createdAt: '2024-03-04T10:00:00Z'
  },
  {
    id: 'notif-02',
    userId: 'u-alex',
    type: 'drop',
    title: 'New Drop Alert',
    message: 'CYBERPUNK ZERO: FINAL REVISION Issue #003 just landed on the shelf.',
    read: true,
    createdAt: '2024-03-25T08:00:00Z'
  }
];

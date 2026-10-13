// Authentic Comic Vine catalog items matching Comic Vine API schema (format: json/jsonp)
// Cover images use Comic Vine / GameSpot CDN or verified high-res comic covers

export const DEMO_COMIC_VINE_ISSUES = [
  {
    id: 104001,
    name: 'Batman: The Killing Joke',
    issue_number: '1',
    volume: {
      id: 21900,
      name: 'Batman: The Killing Joke',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-21900/'
    },
    cover_date: '1988-07-01',
    image: {
      super_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'One bad day is all it takes to reduce the sanest man alive to lunacy.',
    description: 'Alan Moore and Brian Bolland examine the origin of the Joker, who escapes Arkham Asylum to torture Commissioner Gordon in an attempt to prove that any normal man can go insane after one truly terrible day.',
    person_credits: [
      { name: 'Alan Moore', role: 'Writer' },
      { name: 'Brian Bolland', role: 'Artist' },
      { name: 'John Higgins', role: 'Colorist' }
    ],
    character_credits: [
      { name: 'Batman' },
      { name: 'The Joker' },
      { name: 'James Gordon' },
      { name: 'Barbara Gordon' }
    ],
    publisher: 'DC Comics',
    genres: ['Mystery & Noir', 'Street Action', 'Superheroes'],
    rating: 5.0,
    page_count: 48,
    site_detail_url: 'https://comicvine.gamespot.com/batman-the-killing-joke-1/4000-104001/'
  },
  {
    id: 104002,
    name: 'Watchmen #1',
    issue_number: '1',
    volume: {
      id: 3410,
      name: 'Watchmen',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-3410/'
    },
    cover_date: '1986-09-01',
    image: {
      super_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'At Midnight, All the Agents...',
    description: 'When the Comedian is thrown from his high-rise penthouse to his death, masked vigilante Rorschach suspects a conspiracy to eliminate costumed adventurers. A masterpiece by Alan Moore and Dave Gibbons.',
    person_credits: [
      { name: 'Alan Moore', role: 'Writer' },
      { name: 'Dave Gibbons', role: 'Artist' },
      { name: 'John Higgins', role: 'Colorist' }
    ],
    character_credits: [
      { name: 'Rorschach' },
      { name: 'Doctor Manhattan' },
      { name: 'Nite Owl' },
      { name: 'Ozymandias' },
      { name: 'The Comedian' }
    ],
    publisher: 'DC Comics / Vertigo',
    genres: ['Mystery & Noir', 'Sci-Fi & Cyberpunk', 'Superheroes'],
    rating: 5.0,
    page_count: 36,
    site_detail_url: 'https://comicvine.gamespot.com/watchmen-1/4000-104002/'
  },
  {
    id: 104003,
    name: 'Saga #1',
    issue_number: '1',
    volume: {
      id: 46210,
      name: 'Saga',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-46210/'
    },
    cover_date: '2012-03-14',
    image: {
      super_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'When two soldiers from opposite sides of a galactic war fall in love, they risk everything to bring a new life into the cosmos.',
    description: 'Brian K. Vaughan and Fiona Staples create a sprawling space opera and fantasy epic following star-crossed lovers Alana and Marko as they flee authorities from both sides of a galactic war while protecting newborn daughter Hazel.',
    person_credits: [
      { name: 'Brian K. Vaughan', role: 'Writer' },
      { name: 'Fiona Staples', role: 'Artist & Cover' }
    ],
    character_credits: [
      { name: 'Alana' },
      { name: 'Marko' },
      { name: 'Hazel' },
      { name: 'The Will' }
    ],
    publisher: 'Image Comics',
    genres: ['Sci-Fi & Cyberpunk', 'Dark Fantasy', 'Indie & Experimental'],
    rating: 4.9,
    page_count: 44,
    site_detail_url: 'https://comicvine.gamespot.com/saga-1/4000-104003/'
  },
  {
    id: 104004,
    name: 'Invincible #1',
    issue_number: '1',
    volume: {
      id: 19820,
      name: 'Invincible',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-19820/'
    },
    cover_date: '2003-01-22',
    image: {
      super_url: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'Meet Mark Grayson: ordinary teenager whose father just happens to be Omni-Man, the most powerful protector on Earth.',
    description: 'Robert Kirkman and Cory Walker introduce Mark Grayson, who finally inherits his Viltrumite powers and takes up the superhero identity of Invincible. Little does he know the dark secrets hidden in his lineage.',
    person_credits: [
      { name: 'Robert Kirkman', role: 'Writer' },
      { name: 'Cory Walker', role: 'Artist' },
      { name: 'Bill Crabtree', role: 'Colorist' }
    ],
    character_credits: [
      { name: 'Mark Grayson (Invincible)' },
      { name: 'Omni-Man (Nolan Grayson)' },
      { name: 'Atom Eve' }
    ],
    publisher: 'Image Comics / Skybound',
    genres: ['Superheroes', 'Action', 'Sci-Fi & Cyberpunk'],
    rating: 4.9,
    page_count: 36,
    site_detail_url: 'https://comicvine.gamespot.com/invincible-1/4000-104004/'
  },
  {
    id: 104005,
    name: 'Spawn #1',
    issue_number: '1',
    volume: {
      id: 4890,
      name: 'Spawn',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-4890/'
    },
    cover_date: '1992-05-01',
    image: {
      super_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'From the ashes of betrayal, a Hellspawn is born in the shadows of New York.',
    description: 'Todd McFarlane launches the record-breaking premier issue of Spawn. Government assassin Al Simmons is murdered by his superiors, makes a Faustian pact with Malebolgia to see his wife again, and returns to Earth as a necroplasmic Hellspawn.',
    person_credits: [
      { name: 'Todd McFarlane', role: 'Writer & Artist' },
      { name: 'Steve Oliff', role: 'Colorist' }
    ],
    character_credits: [
      { name: 'Spawn (Al Simmons)' },
      { name: 'Wanda Blake' },
      { name: 'Malebolgia' },
      { name: 'Violator' }
    ],
    publisher: 'Image Comics',
    genres: ['Horror & Occult', 'Dark Fantasy', 'Street Action'],
    rating: 4.8,
    page_count: 36,
    site_detail_url: 'https://comicvine.gamespot.com/spawn-1/4000-104005/'
  },
  {
    id: 104006,
    name: 'Hellboy: Seed of Destruction #1',
    issue_number: '1',
    volume: {
      id: 5210,
      name: 'Hellboy: Seed of Destruction',
      api_detail_url: 'https://comicvine.gamespot.com/api/volume/4050-5210/'
    },
    cover_date: '1994-03-01',
    image: {
      super_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
      medium_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      thumb_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80'
    },
    deck: 'Summoned from the abyss by occult Nazis, an anomalous demon chooses to defend humanity.',
    description: 'Mike Mignola and John Byrne introduce Hellboy and the Bureau for Paranormal Research and Defense (BPRD). In 1944, a mystical ritual summons a red demon infant with a stone right hand of doom.',
    person_credits: [
      { name: 'Mike Mignola', role: 'Creator & Artist' },
      { name: 'John Byrne', role: 'Writer' }
    ],
    character_credits: [
      { name: 'Hellboy' },
      { name: 'Abe Sapien' },
      { name: 'Liz Sherman' },
      { name: 'Professor Trevor Bruttenholm' }
    ],
    publisher: 'Dark Horse Comics',
    genres: ['Horror & Occult', 'Mystery & Noir', 'Dark Fantasy'],
    rating: 4.9,
    page_count: 36,
    site_detail_url: 'https://comicvine.gamespot.com/hellboy-seed-of-destruction-1/4000-104006/'
  }
];

export const DEMO_COMIC_VINE_CHARACTERS = [
  {
    id: 2001,
    name: 'Batman',
    realName: 'Bruce Wayne',
    deck: 'The Dark Knight of Gotham City, billionaire vigilante driven by vengeance and justice.',
    image: {
      medium_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    publisher: 'DC Comics',
    team: 'Justice League / Bat-Family',
    firstAppearance: 'Detective Comics #27 (1939)',
    powers: ['Genius Intellect', 'Master Martial Artist', 'Peak Human Conditioning', 'Tactical Mastery', 'High-Tech Arsenal']
  },
  {
    id: 2002,
    name: 'Rorschach',
    realName: 'Walter Joseph Kovacs',
    deck: 'Uncompromising masked vigilante who views the world in strict black and white.',
    image: {
      medium_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    },
    publisher: 'DC Comics / Vertigo',
    team: 'Crimebusters',
    firstAppearance: 'Watchmen #1 (1986)',
    powers: ['Unwavering Moral Code', 'Detective Intuition', 'Improvised Weaponry', 'Extreme Pain Tolerance']
  },
  {
    id: 2003,
    name: 'Spawn',
    realName: 'Al Simmons',
    deck: 'Resurrected Hellspawn armed with symbiotic armor, necroplasmic powers, and military training.',
    image: {
      medium_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    },
    publisher: 'Image Comics',
    team: 'Independent',
    firstAppearance: 'Spawn #1 (1992)',
    powers: ['Necroplasmic Magic', 'Symbiotic K7-Leetha Suit', 'Regenerative Healing', 'Demonic Strength', 'Shapeshifting']
  },
  {
    id: 2004,
    name: 'Hellboy',
    realName: 'Anung Un Rama',
    deck: 'Paranormal investigator with a stone Right Hand of Doom and an affinity for cats and pancakes.',
    image: {
      medium_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80'
    },
    publisher: 'Dark Horse Comics',
    team: 'B.P.R.D.',
    firstAppearance: 'San Diego Comic-Con Comics #2 (1993)',
    powers: ['Right Hand of Doom', 'Superhuman Strength', 'Fire Immunity', 'Occult Knowledge', 'Rapid Healing']
  }
];

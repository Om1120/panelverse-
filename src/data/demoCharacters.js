// Authentic Marvel characters dataset matching official Marvel API schema & high-res artwork
export const DEMO_CHARACTERS = [
  {
    id: 1009610,
    name: 'Spider-Man',
    realName: 'Peter Parker',
    description: 'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength, and abilities of a spider. Driven by the tragic loss of Uncle Ben, he lives by the creed: With great power comes great responsibility.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a3c97ab',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ED1D24',
    secondaryColor: '#1769FF',
    team: 'Avengers / Web-Warriors',
    firstAppearance: 'Amazing Fantasy #15 (1962)',
    creators: ['Stan Lee', 'Steve Ditko'],
    comicsCount: 4320,
    seriesCount: 780,
    quote: "With great power comes great responsibility.",
    powers: ['Wall-Crawling', 'Spider-Sense', 'Superhuman Agility', 'Web-Shooters', 'Proportionate Spider Strength']
  },
  {
    id: 1009368,
    name: 'Iron Man',
    realName: 'Tony Stark',
    description: 'Genius, billionaire, playboy, philanthropist. Wounded by shrapnel, industrialist Tony Stark created a powered exosuit to keep his heart beating and escape captivity, forging an invincible technological protector for Earth.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ED1D24',
    secondaryColor: '#FFD400',
    team: 'Avengers / Illuminati',
    firstAppearance: 'Tales of Suspense #39 (1963)',
    creators: ['Stan Lee', 'Larry Lieber', 'Don Heck', 'Jack Kirby'],
    comicsCount: 3820,
    seriesCount: 650,
    quote: "I am Iron Man.",
    powers: ['Powered Armor', 'Repulsor Blasts', 'Uni-Beam', 'Supersonic Flight', 'Genius-Level Intellect']
  },
  {
    id: 1009718,
    name: 'Wolverine',
    realName: 'Logan / James Howlett',
    description: 'A mutant gifted with animal-keen senses, enhanced physical capabilities, a lethal regenerative healing factor, and an indestructible Adamantium-coated skeleton with retractable razor-sharp claws.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#FFD400',
    secondaryColor: '#1769FF',
    team: 'X-Men / X-Force',
    firstAppearance: 'The Incredible Hulk #181 (1974)',
    creators: ['Roy Thomas', 'Len Wein', 'John Romita Sr.'],
    comicsCount: 2680,
    seriesCount: 520,
    quote: "I'm the best there is at what I do, but what I do best isn't very nice.",
    powers: ['Regenerative Healing Factor', 'Adamantium Claws', 'Retractable Skeleton', 'Berserker Rage', 'Enhanced Senses']
  },
  {
    id: 1009664,
    name: 'Thor',
    realName: 'Thor Odinson',
    description: 'The Norse God of Thunder and prince of Asgard. Wielding the enchanted uru hammer Mjolnir, Thor commands lightning, storms, and dimensional thunder to defend Midgard and the Nine Realms from cosmic peril.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#1769FF',
    secondaryColor: '#FFD400',
    team: 'Avengers / Asgardians',
    firstAppearance: 'Journey into Mystery #83 (1962)',
    creators: ['Stan Lee', 'Larry Lieber', 'Jack Kirby'],
    comicsCount: 2410,
    seriesCount: 490,
    quote: "Whosoever holds this hammer, if he be worthy, shall possess the power of Thor.",
    powers: ['God of Thunder', 'Mjolnir Command', 'Weather Manipulation', 'Immortality', 'Godly Super Strength']
  },
  {
    id: 1009187,
    name: 'Black Panther',
    realName: "T'Challa",
    description: "King of the technologically advanced African nation of Wakanda. Blessed by the Panther Goddess Bast and empowered by the Heart-Shaped Herb, T'Challa is a master tactician, warrior, and global protector.",
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8B5CF6',
    secondaryColor: '#0B0B0D',
    team: 'Wakandan Royal Court / Avengers',
    firstAppearance: 'Fantastic Four #52 (1966)',
    creators: ['Stan Lee', 'Jack Kirby'],
    comicsCount: 1250,
    seriesCount: 280,
    quote: "Wakanda Forever!",
    powers: ['Vibranium Weave Suit', 'Heart-Shaped Herb Physiology', 'Panther Knowledge', 'Master Martial Artist']
  },
  {
    id: 1009562,
    name: 'Scarlet Witch',
    realName: 'Wanda Maximoff',
    description: 'Capable of manipulating chaos magic and rewriting the fabric of probability and reality itself. Wanda Maximoff is one of the most formidable beings in the multiverse, walking the line between salvation and total devastation.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/70/5261a7d7c394b',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ED1D24',
    secondaryColor: '#8B1118',
    team: 'Avengers / Brotherhood',
    firstAppearance: 'The X-Men #4 (1964)',
    creators: ['Stan Lee', 'Jack Kirby'],
    comicsCount: 1670,
    seriesCount: 310,
    quote: "No more mutants.",
    powers: ['Chaos Magic', 'Reality Warping', 'Hex Bolts', 'Telekinesis', 'Probability Manipulation']
  },
  {
    id: 1009262,
    name: 'Daredevil',
    realName: 'Matt Murdock',
    description: 'Blinded as a boy by radioactive chemicals, attorney Matt Murdock discovered his remaining senses heightened to superhuman levels. By night, he prowls Hell\'s Kitchen as the fearless Devil of Hell\'s Kitchen.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/50/537ba813d8142',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ED1D24',
    secondaryColor: '#8B1118',
    team: 'Defenders / Knights',
    firstAppearance: 'Daredevil #1 (1964)',
    creators: ['Stan Lee', 'Bill Everett'],
    comicsCount: 1980,
    seriesCount: 340,
    quote: "Justice is blind, but I am not.",
    powers: ['Radar Sense', 'Superhuman Echolocation', 'Master Acrobat', 'Billy Club Combat', 'Lie Detection']
  },
  {
    id: 1009282,
    name: 'Doctor Strange',
    realName: 'Stephen Strange',
    description: 'Former arrogant neurosurgeon who, after a career-ending car crash, journeyed to Kamar-Taj and became the Sorcerer Supreme, protecting Earth from trans-dimensional terrors and mystical entities.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a82a5c214',
      extension: 'jpg'
    },
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#FFD400',
    secondaryColor: '#ED1D24',
    team: 'Midnight Sons / Defenders',
    firstAppearance: 'Strange Tales #110 (1963)',
    creators: ['Stan Lee', 'Steve Ditko'],
    comicsCount: 1850,
    seriesCount: 320,
    quote: "By the Vishanti!",
    powers: ['Eye of Agamotto', 'Cloak of Levitation', 'Astral Projection', 'Mystic Arts Mastery', 'Dimensional Portals']
  }
];

import { md5 } from '../utils/md5';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_CHARACTERS } from '../data/demoCharacters';
import { formatComicData } from '../utils/comicFormatting';

const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

// Simple in-memory LRU / Map cache for fast repeat requests
const apiCache = new Map();

// LocalStorage keys for optional user-provided Marvel API Keys
const STORAGE_PUBLIC_KEY = 'pv_marvel_public_key';
const STORAGE_PRIVATE_KEY = 'pv_marvel_private_key';

/**
 * Get configured credentials (from LocalStorage or Vite Env)
 */
export function getMarvelCredentials() {
  const publicKey = localStorage.getItem(STORAGE_PUBLIC_KEY) || import.meta.env.VITE_MARVEL_PUBLIC_KEY || '';
  const privateKey = localStorage.getItem(STORAGE_PRIVATE_KEY) || import.meta.env.VITE_MARVEL_PRIVATE_KEY || '';
  return { publicKey: publicKey.trim(), privateKey: privateKey.trim() };
}

/**
 * Save Marvel API keys into LocalStorage for user testing
 */
export function setMarvelCredentials(publicKey, privateKey) {
  if (publicKey) {
    localStorage.setItem(STORAGE_PUBLIC_KEY, publicKey.trim());
  } else {
    localStorage.removeItem(STORAGE_PUBLIC_KEY);
  }

  if (privateKey) {
    localStorage.setItem(STORAGE_PRIVATE_KEY, privateKey.trim());
  } else {
    localStorage.removeItem(STORAGE_PRIVATE_KEY);
  }
}

/**
 * Generate authenticated URL query params for Marvel Developer API
 */
function buildAuthParams() {
  const { publicKey, privateKey } = getMarvelCredentials();
  if (!publicKey) return null;

  const ts = new Date().getTime().toString();
  const params = new URLSearchParams();
  params.set('apikey', publicKey);
  params.set('ts', ts);

  // If private key is provided, compute md5(ts + privateKey + publicKey)
  if (privateKey) {
    const hash = md5(ts + privateKey + publicKey);
    params.set('hash', hash);
  }

  return params;
}

/**
 * Fetch comics from Marvel API with fallback to curated demo catalog
 */
export async function fetchComics({
  limit = 20,
  offset = 0,
  titleStartsWith = '',
  characterId = null,
  orderBy = '-onsaleDate',
  format = 'comic',
  signal = null
} = {}) {
  const { publicKey } = getMarvelCredentials();

  // If no public key is configured, instantly return normalized demo data
  if (!publicKey) {
    return getFilteredDemoComics({ limit, offset, titleStartsWith, characterId, orderBy });
  }

  const cacheKey = `comics_${limit}_${offset}_${titleStartsWith}_${characterId}_${orderBy}_${format}`;
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  try {
    const authParams = buildAuthParams();
    const url = new URL(`${MARVEL_BASE_URL}/comics`);
    authParams.forEach((val, key) => url.searchParams.set(key, val));

    url.searchParams.set('limit', String(Math.min(limit, 100)));
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('format', format);
    url.searchParams.set('orderBy', orderBy);

    if (titleStartsWith && titleStartsWith.trim()) {
      url.searchParams.set('titleStartsWith', titleStartsWith.trim());
    }

    if (characterId) {
      url.searchParams.set('characters', String(characterId));
    }

    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[Marvel API] Response status ${response.status}: ${errorText}. Falling back to demo data.`);
      return getFilteredDemoComics({ limit, offset, titleStartsWith, characterId, orderBy, apiError: `Marvel API returned status ${response.status}` });
    }

    const json = await response.json();
    const results = json?.data?.results || [];
    const formatted = results.map(formatComicData).filter(Boolean);

    const output = {
      comics: formatted,
      total: json?.data?.total || formatted.length,
      offset: json?.data?.offset || 0,
      limit: json?.data?.limit || limit,
      isLiveApi: true,
      attribution: json?.attributionText || 'Data provided by Marvel. © 2026 MARVEL'
    };

    apiCache.set(cacheKey, output);
    return output;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err;
    }
    console.warn('[Marvel API] Network or CORS failure:', err.message, 'Falling back to demo dataset.');
    return getFilteredDemoComics({ limit, offset, titleStartsWith, characterId, orderBy, apiError: err.message });
  }
}

/**
 * Fetch a single comic by ID (supports Marvel ID or Panelverse ID)
 */
export async function fetchComicById(id, { signal = null } = {}) {
  const cacheKey = `comic_${id}`;
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  // Check demo catalog first
  const demoMatch = DEMO_COMICS.find(c => String(c.id) === String(id) || String(c.marvelId) === String(id));
  if (demoMatch) {
    const formatted = formatComicData(demoMatch);
    apiCache.set(cacheKey, formatted);
    return formatted;
  }

  const { publicKey } = getMarvelCredentials();
  if (!publicKey) {
    return formatComicData(DEMO_COMICS[0]);
  }

  try {
    const authParams = buildAuthParams();
    const url = new URL(`${MARVEL_BASE_URL}/comics/${id}`);
    authParams.forEach((val, key) => url.searchParams.set(key, val));

    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
      return formatComicData(DEMO_COMICS[0]);
    }

    const json = await response.json();
    const result = json?.data?.results?.[0];
    if (!result) return formatComicData(DEMO_COMICS[0]);

    const formatted = formatComicData(result);
    apiCache.set(cacheKey, formatted);
    return formatted;
  } catch {
    return formatComicData(DEMO_COMICS[0]);
  }
}

/**
 * Fetch Marvel Characters list
 */
export async function fetchCharacters({ limit = 12, nameStartsWith = '', signal = null } = {}) {
  const { publicKey } = getMarvelCredentials();
  if (!publicKey) {
    return {
      characters: DEMO_CHARACTERS.slice(0, limit),
      total: DEMO_CHARACTERS.length,
      isLiveApi: false
    };
  }

  const cacheKey = `characters_${limit}_${nameStartsWith}`;
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  try {
    const authParams = buildAuthParams();
    const url = new URL(`${MARVEL_BASE_URL}/characters`);
    authParams.forEach((val, key) => url.searchParams.set(key, val));
    url.searchParams.set('limit', String(limit));
    if (nameStartsWith) {
      url.searchParams.set('nameStartsWith', nameStartsWith);
    }

    const res = await fetch(url.toString(), { signal });
    if (!res.ok) {
      return { characters: DEMO_CHARACTERS.slice(0, limit), total: DEMO_CHARACTERS.length, isLiveApi: false };
    }

    const json = await res.json();
    const characters = (json?.data?.results || []).map(c => ({
      id: c.id,
      name: c.name,
      description: c.description || 'Iconic hero of the Marvel Universe.',
      thumbnail: c.thumbnail,
      comicsCount: c.comics?.available || 0,
      seriesCount: c.series?.available || 0,
      accentColor: '#ED1D24',
      quote: `Witness the power of ${c.name}!`
    }));

    const result = {
      characters: characters.length > 0 ? characters : DEMO_CHARACTERS.slice(0, limit),
      total: json?.data?.total || characters.length,
      isLiveApi: true
    };
    apiCache.set(cacheKey, result);
    return result;
  } catch {
    return { characters: DEMO_CHARACTERS.slice(0, limit), total: DEMO_CHARACTERS.length, isLiveApi: false };
  }
}

/**
 * Helper to filter & paginate local demo comics
 */
function getFilteredDemoComics({ limit = 20, offset = 0, titleStartsWith = '', characterId = null, orderBy = '-onsaleDate', apiError = null }) {
  let list = [...DEMO_COMICS];

  if (titleStartsWith && titleStartsWith.trim()) {
    const query = titleStartsWith.trim().toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(query) || c.seriesName.toLowerCase().includes(query));
  }

  if (characterId) {
    list = list.filter(c => c.characterIds && c.characterIds.includes(Number(characterId)));
  }

  // Sort
  if (orderBy === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (orderBy === '-title') {
    list.sort((a, b) => b.title.localeCompare(a.title));
  } else if (orderBy === 'issueNumber') {
    list.sort((a, b) => a.issueNumber - b.issueNumber);
  } else {
    // default -onsaleDate / year
    list.sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  const paginated = list.slice(offset, offset + limit).map(formatComicData);

  return {
    comics: paginated,
    total: list.length,
    offset,
    limit,
    isLiveApi: false,
    apiError,
    attribution: 'Marvel Universe Curated Archive (Demo Mode) • Add API Key to query live gateway.marvel.com'
  };
}

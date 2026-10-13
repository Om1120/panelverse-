import { fetchComics, fetchComicById, getMarvelCredentials } from './marvelApi';
import { fetchComicVineIssues, fetchComicVineIssueById, getComicVineApiKey } from './comicVineApi';
import { DEMO_COMICS } from '../data/demoComics';
import { DEMO_COMIC_VINE_ISSUES, DEMO_COMIC_VINE_CHARACTERS } from '../data/demoComicVine';
import { formatComicVineIssue } from './comicVineApi';
import { formatComicData } from '../utils/comicFormatting';

const STORAGE_PROVIDER_KEY = 'pv_active_provider';

/**
 * Get active API Provider: 'marvel' | 'comicvine' | 'all'
 */
export function getActiveProvider() {
  return localStorage.getItem(STORAGE_PROVIDER_KEY) || 'marvel';
}

/**
 * Set active API Provider
 */
export function setActiveProvider(provider) {
  localStorage.setItem(STORAGE_PROVIDER_KEY, provider);
  window.dispatchEvent(new Event('comic-provider-changed'));
}

/**
 * Unified fetch comics routing to Marvel, Comic Vine, or merged results
 */
export async function fetchUnifiedComics({
  limit = 20,
  offset = 0,
  query = '',
  characterId = null,
  provider = null,
  signal = null
} = {}) {
  const active = provider || getActiveProvider();

  if (active === 'comicvine') {
    return fetchComicVineIssues({ limit, offset, query });
  }

  if (active === 'marvel') {
    return fetchComics({ limit, offset, titleStartsWith: query, characterId, signal });
  }

  // 'all' / Merged Multiverse Provider:
  try {
    const [marvelRes, cvRes] = await Promise.allSettled([
      fetchComics({ limit: Math.ceil(limit / 2), offset, titleStartsWith: query, characterId, signal }),
      fetchComicVineIssues({ limit: Math.ceil(limit / 2), offset, query })
    ]);

    const marvelComics = marvelRes.status === 'fulfilled' ? marvelRes.value.comics : [];
    const cvComics = cvRes.status === 'fulfilled' ? cvRes.value.comics : [];

    const merged = [...marvelComics, ...cvComics];
    return {
      comics: merged,
      total: (marvelRes.value?.total || 0) + (cvRes.value?.total || 0),
      offset,
      limit,
      isLiveApi: (marvelRes.value?.isLiveApi || false) || (cvRes.value?.isLiveApi || false),
      provider: 'Multiverse (Marvel + Comic Vine)',
      attribution: 'Data provided by Marvel Comics and Comic Vine (GameSpot).'
    };
  } catch {
    return fetchComics({ limit, offset, titleStartsWith: query, characterId, signal });
  }
}

/**
 * Unified fetch single comic by ID (supports Marvel or Comic Vine ID)
 */
export async function fetchUnifiedComicById(id, { signal = null } = {}) {
  const idStr = String(id);

  if (idStr.startsWith('cv-')) {
    return fetchComicVineIssueById(idStr);
  }

  // Check Comic Vine demo issues
  const cvDemo = DEMO_COMIC_VINE_ISSUES.find(c => String(c.id) === idStr);
  if (cvDemo) {
    return formatComicVineIssue(cvDemo);
  }

  // Check Marvel API / Demo
  return fetchComicById(id, { signal });
}

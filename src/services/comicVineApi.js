import { DEMO_COMIC_VINE_ISSUES, DEMO_COMIC_VINE_CHARACTERS } from '../data/demoComicVine';
import { truncateText } from '../utils/comicFormatting';

const COMIC_VINE_BASE_URL = 'https://comicvine.gamespot.com/api';
const STORAGE_COMIC_VINE_KEY = 'pv_comicvine_api_key';

// In-memory cache
const comicVineCache = new Map();

/**
 * Get Comic Vine API Key from LocalStorage or Vite Env
 */
export function getComicVineApiKey() {
  const key = localStorage.getItem(STORAGE_COMIC_VINE_KEY) || import.meta.env.VITE_COMICVINE_API_KEY || '';
  return key.trim();
}

/**
 * Save Comic Vine API Key into LocalStorage
 */
export function setComicVineApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem(STORAGE_COMIC_VINE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_COMIC_VINE_KEY);
  }
}

/**
 * JSONP client for browser requests to Comic Vine API (circumvents browser CORS limitations)
 */
function requestComicVineJsonp(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `cv_cb_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const url = new URL(`${COMIC_VINE_BASE_URL}/${endpoint}`);

    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });

    url.searchParams.set('format', 'jsonp');
    url.searchParams.set('json_callback', callbackName);

    const script = document.createElement('script');
    script.src = url.toString();
    script.async = true;

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Comic Vine API request timed out'));
    }, 12000);

    function cleanup() {
      clearTimeout(timer);
      if (window[callbackName]) {
        delete window[callbackName];
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (data) => {
      cleanup();
      if (data && data.status_code === 1) {
        resolve(data);
      } else {
        reject(new Error(data?.error || `Comic Vine API Error Code: ${data?.status_code}`));
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Comic Vine network or script loading error'));
    };

    document.head.appendChild(script);
  });
}

/**
 * Format raw Comic Vine issue into uniform Panelverse model
 */
export function formatComicVineIssue(raw) {
  if (!raw) return null;

  const creators = Array.isArray(raw.person_credits)
    ? raw.person_credits.map(p => `${p.name} (${p.role || 'Creator'})`)
    : ['Comic Vine Creators'];

  const characters = Array.isArray(raw.character_credits)
    ? raw.character_credits.map(c => c.name)
    : [];

  let year = 2024;
  if (raw.cover_date) {
    const parsed = new Date(raw.cover_date).getFullYear();
    if (!isNaN(parsed) && parsed > 1930) year = parsed;
  }

  let description = raw.deck || raw.description || '';
  if (typeof description === 'string') {
    description = description.replace(/<[^>]*>?/gm, '').trim();
  }
  if (!description) {
    description = `An iconic comic issue cataloged by Comic Vine. Issue #${raw.issue_number || '1'} of ${raw.volume?.name || raw.name}.`;
  }

  const coverImage = raw.image?.super_url || raw.image?.medium_url || raw.image?.small_url || raw.image?.thumb_url ||
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80';

  const title = raw.name || (raw.volume?.name ? `${raw.volume.name} #${raw.issue_number || 1}` : 'Comic Vine Issue');

  return {
    id: `cv-${raw.id}`,
    comicVineId: raw.id,
    title,
    seriesName: raw.volume?.name || 'Independent Series',
    seriesId: raw.volume?.id ? `cv-vol-${raw.volume.id}` : 'series-cv',
    issueNumber: raw.issue_number ? parseInt(raw.issue_number, 10) || raw.issue_number : 1,
    description,
    coverImage,
    year,
    publicationDate: raw.cover_date || '',
    publisher: raw.publisher || 'Comic Vine Index',
    rating: raw.rating || 4.9,
    reviewCount: 180,
    creators,
    characters,
    genres: raw.genres || ['Superheroes', 'Action'],
    format: 'Comic',
    price: '$3.99',
    pageCount: raw.page_count || 36,
    isTrending: true,
    featured: true,
    isComicVine: true,
    siteDetailUrl: raw.site_detail_url || null
  };
}

/**
 * Fetch issues from Comic Vine API
 */
export async function fetchComicVineIssues({
  limit = 20,
  offset = 0,
  query = '',
  sort = 'cover_date:desc'
} = {}) {
  const apiKey = getComicVineApiKey();

  // If no API key configured, return authentic Comic Vine demo items
  if (!apiKey) {
    return getFilteredDemoComicVine({ limit, offset, query });
  }

  const cacheKey = `cv_issues_${limit}_${offset}_${query}_${sort}`;
  if (comicVineCache.has(cacheKey)) {
    return comicVineCache.get(cacheKey);
  }

  try {
    let data;
    if (query && query.trim()) {
      // Use Comic Vine search endpoint
      data = await requestComicVineJsonp('search/', {
        api_key: apiKey,
        query: query.trim(),
        resources: 'issue',
        limit: Math.min(limit, 50),
        page: Math.floor(offset / limit) + 1
      });
    } else {
      // Use Comic Vine issues list endpoint
      data = await requestComicVineJsonp('issues/', {
        api_key: apiKey,
        limit: Math.min(limit, 50),
        offset,
        sort
      });
    }

    const results = data.results || [];
    const formatted = results.map(formatComicVineIssue).filter(Boolean);

    const output = {
      comics: formatted,
      total: data.number_of_total_results || formatted.length,
      offset,
      limit,
      isLiveApi: true,
      provider: 'Comic Vine',
      attribution: 'Data provided by Comic Vine (GameSpot). © Fandom / Red Ventures'
    };

    comicVineCache.set(cacheKey, output);
    return output;
  } catch (err) {
    console.warn('[Comic Vine API] Request failed:', err.message, 'Falling back to demo dataset.');
    return getFilteredDemoComicVine({ limit, offset, query, apiError: err.message });
  }
}

/**
 * Fetch single issue by ID
 */
export async function fetchComicVineIssueById(id) {
  const cleanId = String(id).replace('cv-', '');
  const demoMatch = DEMO_COMIC_VINE_ISSUES.find(c => String(c.id) === cleanId);
  if (demoMatch) {
    return formatComicVineIssue(demoMatch);
  }

  const apiKey = getComicVineApiKey();
  if (!apiKey) {
    return formatComicVineIssue(DEMO_COMIC_VINE_ISSUES[0]);
  }

  try {
    const data = await requestComicVineJsonp(`issue/4000-${cleanId}/`, { api_key: apiKey });
    if (data.results) {
      return formatComicVineIssue(data.results);
    }
    return formatComicVineIssue(DEMO_COMIC_VINE_ISSUES[0]);
  } catch {
    return formatComicVineIssue(DEMO_COMIC_VINE_ISSUES[0]);
  }
}

/**
 * Helper to filter local Comic Vine demo items
 */
function getFilteredDemoComicVine({ limit = 20, offset = 0, query = '', apiError = null }) {
  let list = [...DEMO_COMIC_VINE_ISSUES];

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.volume?.name?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  }

  const paginated = list.slice(offset, offset + limit).map(formatComicVineIssue);

  return {
    comics: paginated,
    total: list.length,
    offset,
    limit,
    isLiveApi: false,
    apiError,
    provider: 'Comic Vine (Demo Archive)',
    attribution: 'Comic Vine Curated Archive • Add Comic Vine API Key to query live comicvine.gamespot.com'
  };
}

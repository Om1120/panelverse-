// Comic Data Normalizer & Marvel API Thumbnail Helper

// Fallback high-contrast comic artwork placeholder when cover image is unavailable
const DEFAULT_COMIC_COVER_FALLBACK = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80';

/**
 * Construct high-res cover URL from Marvel thumbnail object
 * @param {Object} thumbnail - { path: string, extension: string }
 * @param {string} variant - 'portrait_uncanny' | 'portrait_incredible' | 'portrait_fantastic' | 'detail'
 */
export function getMarvelCoverUrl(thumbnail, variant = 'portrait_uncanny') {
  if (!thumbnail || !thumbnail.path) {
    return DEFAULT_COMIC_COVER_FALLBACK;
  }
  
  // Marvel returns 'image_not_available' when no cover exists
  if (thumbnail.path.includes('image_not_available')) {
    return DEFAULT_COMIC_COVER_FALLBACK;
  }

  let cleanPath = thumbnail.path;
  // Upgrade HTTP to HTTPS for modern browser security
  if (cleanPath.startsWith('http://')) {
    cleanPath = cleanPath.replace('http://', 'https://');
  }

  // Remove existing trailing slash
  cleanPath = cleanPath.replace(/\/$/, '');

  return `${cleanPath}/${variant}.${thumbnail.extension || 'jpg'}`;
}

/**
 * Format raw comic from Marvel API or local dataset into uniform Panelverse model
 */
export function formatComicData(raw) {
  if (!raw) return null;

  // If already in Panelverse format
  if (raw.coverImage && raw.title && !raw.thumbnail) {
    return {
      ...raw,
      id: raw.id || `comic-${Math.random().toString(36).substr(2, 9)}`,
      rating: raw.rating || 4.8,
      creators: Array.isArray(raw.creators) ? raw.creators : ['Marvel Bullpen'],
      characters: Array.isArray(raw.characters) ? raw.characters : []
    };
  }

  // Extract creators from Marvel API creators structure: { items: [{ name, role }] }
  let formattedCreators = [];
  if (raw.creators?.items) {
    formattedCreators = raw.creators.items.map(c => `${c.name} (${c.role})`);
  } else if (Array.isArray(raw.creators)) {
    formattedCreators = raw.creators;
  } else {
    formattedCreators = ['Marvel Creative Team'];
  }

  // Extract characters from Marvel API characters structure: { items: [{ name }] }
  let formattedCharacters = [];
  if (raw.characters?.items) {
    formattedCharacters = raw.characters.items.map(c => c.name);
  } else if (Array.isArray(raw.characters)) {
    formattedCharacters = raw.characters;
  }

  // Extract publication date & year
  let publicationDate = raw.publicationDate || '';
  let year = raw.year || 2024;
  if (raw.dates && Array.isArray(raw.dates)) {
    const onSale = raw.dates.find(d => d.type === 'onsaleDate') || raw.dates[0];
    if (onSale && onSale.date) {
      publicationDate = onSale.date.split('T')[0];
      const parsedYear = new Date(onSale.date).getFullYear();
      if (!isNaN(parsedYear) && parsedYear > 1930) {
        year = parsedYear;
      }
    }
  }

  // Clean description of HTML tags
  let description = raw.description || raw.textObjects?.[0]?.text || '';
  if (typeof description === 'string') {
    description = description.replace(/<[^>]*>?/gm, '').trim();
  }
  if (!description) {
    description = `An iconic Marvel issue featuring ${raw.title}. Delve into this pulse-pounding chapter of the Marvel Universe.`;
  }

  // Cover image construction
  const coverImage = raw.coverImage || (raw.thumbnail ? getMarvelCoverUrl(raw.thumbnail, 'portrait_uncanny') : DEFAULT_COMIC_COVER_FALLBACK);

  // Price formatting
  let price = '$3.99';
  if (raw.prices && raw.prices.length > 0) {
    const printPrice = raw.prices.find(p => p.type === 'printPrice') || raw.prices[0];
    if (printPrice?.price && printPrice.price > 0) {
      price = `$${printPrice.price.toFixed(2)}`;
    }
  }

  return {
    id: raw.id || raw.marvelId || String(raw.digitalId || Math.random()),
    marvelId: raw.id || raw.marvelId,
    title: raw.title || 'Untitled Marvel Comic',
    issueNumber: raw.issueNumber !== undefined ? raw.issueNumber : 1,
    seriesName: raw.series?.name || raw.seriesName || 'Marvel Series',
    seriesId: raw.series?.resourceURI?.split('/').pop() || raw.seriesId || 'series-01',
    description,
    coverImage,
    thumbnail: raw.thumbnail,
    pageCount: raw.pageCount || 36,
    year,
    publicationDate,
    publisher: 'Marvel Comics',
    rating: raw.rating || 4.8,
    reviewCount: raw.reviewCount || 140,
    creators: formattedCreators,
    characters: formattedCharacters,
    genres: raw.genres || ['Superheroes', 'Action'],
    format: raw.format || 'Comic',
    price,
    isTrending: raw.isTrending ?? (year > 2015),
    featured: raw.featured ?? false,
    isEssential: raw.isEssential ?? false,
    samplePages: raw.samplePages || null,
    isMarvelApi: !!raw.dates || !!raw.thumbnail
  };
}

export function truncateText(text, maxLength = 120) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

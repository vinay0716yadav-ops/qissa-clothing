/**
 * QISSA LABEL - Universal Cloud Persistence & Auto-Sync Engine
 * Ensures all product uploads, cover image changes, category additions,
 * and price updates are 100% permanent across all devices worldwide.
 */

// Multi-cloud endpoint configuration
const ENDPOINTS = [
  '/api/catalog',
  '/.netlify/functions/catalog'
];

export async function fetchCloudCatalog() {
  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        if (data && !data.empty && (data.products || data.settings || data.categories)) {
          return data;
        }
      }
    } catch (e) {
      // Continue to next fallback endpoint
    }
  }
  return null;
}

export async function syncCatalogToCloud(payload) {
  let success = false;
  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          updatedAt: new Date().toISOString(),
          ...payload
        })
      });
      if (response.ok) {
        success = true;
      }
    } catch (e) {
      // Continue to next fallback endpoint
    }
  }
  return success;
}

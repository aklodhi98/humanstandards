/**
 * Search Human Standards documentation
 */

import { StandardsIndex } from '../types/index.js';

export function searchDocumentation(
  query: string,
  index: StandardsIndex
): Array<{ title: string; path: string; description: string; relevance: number }> {
  const results: Array<{ title: string; path: string; description: string; relevance: number }> = [];
  const queryLower = query.toLowerCase();

  // Search through all categories and documents
  for (const [categoryName, category] of Object.entries(index.categories)) {
    for (const doc of category.documents) {
      let relevance = 0;

      // Check title match
      if (doc.title.toLowerCase().includes(queryLower)) {
        relevance += 10;
      }

      // Check description match
      if (doc.description.toLowerCase().includes(queryLower)) {
        relevance += 5;
      }

      // Check key points match
      for (const point of doc.key_points) {
        if (point.toLowerCase().includes(queryLower)) {
          relevance += 2;
        }
      }

      // Check category match
      if (categoryName.toLowerCase().includes(queryLower)) {
        relevance += 3;
      }

      if (relevance > 0) {
        results.push({
          title: doc.title,
          path: doc.path,
          description: doc.description,
          relevance
        });
      }
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, 10); // Top 10 results
}

// Utility function to generate URL-friendly slugs
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

// Get provider URL slug - Format: category-name-area-city-id (unique + SEO friendly)
export const getProviderSlug = (provider) => {
  const nameSlug = generateSlug(provider.name);
  const categorySlug = generateSlug(provider.category.replace("-", " "));
  const areaSlug = provider.area ? generateSlug(provider.area) : generateSlug(provider.city);
  const citySlug = generateSlug(provider.city);
  
  // Format: "{category}-{name}-{area}-{city}-{id}"
  // Example: "electrician-qamar-saddar-rawalpindi-1"
  return `${categorySlug}-${nameSlug}-${areaSlug}-${citySlug}-${provider.id}`;
};

// Find provider by slug - Extract ID from end and lookup
export const findProviderBySlug = (slug, providers) => {
  // Extract ID from end of slug
  const idMatch = slug.match(/-(\d+)$/);
  if (!idMatch) return null;
  
  const providerId = parseInt(idMatch[1]);
  const provider = providers.find(p => p.id === providerId);
  
  // Verify slug matches (prevent accessing different provider via modified slug)
  if (provider && getProviderSlug(provider) === slug) {
    return provider;
  }
  
  return null;
};

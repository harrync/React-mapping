import { MapEntity } from '../utils/types'

/**
 * Filter map based on user selections
 */
export default function useFilters(
  mapElements: MapEntity[],
  activeFilters: number[]
) {
  return mapElements.filter(mapElement => {
    // Filter by Term IDs
    const categoriesMatch = mapElement.categories?.filter((term: number) => {
      return activeFilters.includes(term)
    }).length

    if (!categoriesMatch) return null

    return categoriesMatch > 0
  })
}

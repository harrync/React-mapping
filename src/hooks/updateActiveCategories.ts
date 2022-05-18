export default function updateActiveCategories(
  tid: number,
  toUpdate: number[],
  mapRef: React.RefObject<HTMLElement> | null
) {
  const activeFilters = [...toUpdate]
  const matchingTerm = activeFilters.indexOf(tid)

  // If tid is present remove it, else add it to array
  if (matchingTerm > -1) {
    activeFilters.splice(matchingTerm, 1)
  } else {
    activeFilters.push(tid)

    // Scroll to map
    mapRef && mapRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return activeFilters
}

/**
 * REST API url
 */
// export const baseUrl = `${window.location.origin}/wp-json/bloo/v1`
export const baseUrl = `https://demos.harryedwards.dev/wp-json/bloo/v1`

/**
 * OS Maps API key
 */
export const apiKey = 'YP2NQmvLpXZWIwiaOQofh1AAC8cBfqoE'

/**
 * OS Maps servive url
 */
export const serviceUrl = 'https://api.os.uk/maps/raster/v1/zxy'

/**
 * Render HTML from string
 */
export function htmlDecode(input: string) {
  var doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

/**
 * Check if 2 arrays share a common element
 */
export function findCommonElements(
  arr1: [string | number],
  arr2: [string | number]
) {
  return arr1.some((item: string | number) => arr2.includes(item))
}

/**
 * Styled components breakpoints
 */
export const sizes = {
  xs: '(max-width:500px)',
  sm: '(max-width:768px)',
  md: '(max-width:1024px)',
  lg: '(max-width:1300px)',
  xl: '(max-width:1500px)',
}

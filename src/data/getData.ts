import { baseUrl } from '../helpers'
import { AppState, StateAction } from '../utils/types'
import { LinkEntity, TaxonomyEntity } from '../utils/types'

// type Props = {
//   categories: string
// }

interface MapEntityRaw {
  summary?: string | null
  content?: string | null
  distance?: string | null
  postcode?: string | null
  accessibility_terrain_walk_info?: string | null
  facilities_accessibility?: string | null
  id?: number | null
  title?: string | null
  image?: boolean | null
  imageAlt?: boolean | null
  categories?: TaxonomyEntity[] | null
  links?: LinkEntity[] | null
  download?: string | null
}

interface MarkerRaw extends MapEntityRaw {
  lat?: string | null
  lng?: string | null
}
interface RouteRaw extends MapEntityRaw {
  shape_file: string
}

export default async function getData(
  dispatch: React.Dispatch<StateAction>,
  categories: string,
  routes: string
) {
  const filteredMarkersApi = `${baseUrl}/markers/${categories}`
  const filteredRoutesApi = `${baseUrl}/routes/${routes}`

  const getMarkers = fetch(filteredMarkersApi)
    .then(blob => blob.json())
    .then(data => {
      // Add data to markers array.
      const markerData = Object.values(data)

      // Get marker data
      const mapMarkers = markerData.map((marker: any) => {
        const markerCategories = marker.categories?.map(
          (category: TaxonomyEntity) => {
            return category.tid
          }
        )

        return {
          lat: marker.lat,
          lng: marker.lng,
          position: [parseFloat(marker?.lat), parseFloat(marker.lng)],
          summary: marker.summary,
          content: marker.content,
          distance: marker.distance,
          postcode: marker.postcode,
          accessibility_terrain_walk_info:
            marker.accessibility_terrain_walk_info,
          facilities_accessibility: marker.facilities_accessibility,
          id: marker.id,
          title: marker.title,
          image: marker.image,
          imageAlt: marker.imageAlt,
          categories: markerCategories,
          links: marker.links,
          download: marker.download,
        }
      })

      // Get taxo data
      // Get user provided term IDs and convert to array of tid ints
      const chosenCategories = categories.split(',').map(tid => +tid)

      const mapCategoryParents = markerData
        .map((marker: any) => {
          return marker.categories.filter((term: any) => term.parent === 0)
        })
        .flat()
        // Remove duplicates
        .filter(
          (termToCheck: TaxonomyEntity, i: number, terms: TaxonomyEntity[]) =>
            terms.findIndex(
              (term: TaxonomyEntity) => term.tid === termToCheck.tid
            ) === i
        )
        // Only add user chosen categories to array
        .filter((parentCat: TaxonomyEntity) =>
          chosenCategories.includes(parentCat.tid)
        )

      // Combine parent & child categories to form filters, removing any that aren't in the list provided by the user
      const categoryData = mapCategoryParents
        // Find child terms & add to parent term object
        .map((category: TaxonomyEntity) => {
          const childTerms = markerData
            .map((marker: any) => {
              return marker.categories.filter(
                (term: TaxonomyEntity) => term.parent !== 0
              )
            })
            .flat()
            // Remove duplicates
            .filter(
              (
                termToCheck: TaxonomyEntity,
                i: number,
                terms: TaxonomyEntity[]
              ) =>
                terms.findIndex(
                  (term: TaxonomyEntity) => term.tid === termToCheck.tid
                ) === i
            )
            // Filter to children of the parent term
            .filter(
              (childTerm: TaxonomyEntity) => category.tid === childTerm.parent
            )

          return {
            ...category,
            children: childTerms,
          }
        })

      dispatch({ type: AppState.SET_DATA, mode: mapMarkers })
      dispatch({ type: AppState.SET_CATEGORIES, mode: categoryData })
    })
    .catch(err => {
      dispatch({ type: AppState.ERROR, mode: true })
      throw Error(err)
    })

  let getRoutes

  if (routes) {
    getRoutes = fetch(filteredRoutesApi)
      .then(blob => blob.json())
      .then(data => {
        // Add data to routes array.
        const routeData = Object.values(data)

        // Get route data
        const mapRoutes = routeData.map((route: any) => {
          const routeCategories = route.categories?.map(
            (category: TaxonomyEntity) => {
              return category.tid
            }
          )

          return {
            shape_file: route.shape_file,
            summary: route.summary,
            content: route.content,
            distance: route.distance,
            postcode: route.postcode,
            accessibility_terrain_walk_info:
              route.accessibility_terrain_walk_info,
            facilities_accessibility: route.facilities_accessibility,
            id: route.id,
            title: route.title,
            image: route.image,
            imageAlt: route.imageAlt,
            categories: routeCategories,
            links: route.links,
            download: route.download,
          }
        })

        // Get taxo data
        const chosenCategories = routes.split(',').map(tid => +tid)

        const categoryData = routeData
          .map((route: any) => {
            return route.categories.filter(
              (term: TaxonomyEntity) => term.parent === 0
            )
          })
          .flat()
          // Remove duplicates
          .filter(
            (termToCheck: TaxonomyEntity, i: number, terms: TaxonomyEntity[]) =>
              terms.findIndex(
                (term: TaxonomyEntity) => term.tid === termToCheck.tid
              ) === i
          )
          // Only add user chosen categories to array
          .filter((parentCat: TaxonomyEntity) =>
            chosenCategories.includes(parentCat.tid)
          )

        dispatch({ type: AppState.SET_ROUTES, mode: mapRoutes })
        dispatch({ type: AppState.SET_ROUTE_CATEGORIES, mode: categoryData })
      })
      .catch(err => {
        dispatch({ type: AppState.ERROR, mode: true })
        throw Error(err)
      })
  }

  await Promise.all([await getMarkers, routes ? await getRoutes : null])
    .then(() => {
      dispatch({ type: AppState.IS_LOADING, mode: false })
    })
    .catch(err => {
      dispatch({ type: AppState.ERROR, mode: true })
      throw Error(err)
    })
}

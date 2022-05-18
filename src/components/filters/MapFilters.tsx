import { useContext } from 'react'
import MarkerCategories from './MarkerCategories'
import { StateContext, DispatchContext } from '../../MapApp'
import { AppState, DispatchContextT, StateContextT } from '../../utils/types'
import Button from '../../ui/Button'
import RouteCategoryFilters from './RouteCategoryFilters'
import CategoryFiltersStyles from './CategoryFitlers.styles'
import { AnimatePresence, motion } from 'framer-motion'
import FiltersStyles from './MapFilters.styles'

/**
 * Filters panel
 */
export default function MapFilters() {
  const { state } = useContext(StateContext) as StateContextT
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const { activeMarkerFilters, activeRouteFilters, routeData, markerData } =
    state

  return (
    <FiltersStyles>
      <h3>Click on categories &amp; explore the map</h3>

      <CategoryFiltersStyles>
        {routeData.length > 0 && <RouteCategoryFilters />}

        {markerData.length > 0 && <MarkerCategories />}
      </CategoryFiltersStyles>

      <div className="controls">
        <AnimatePresence>
          {(activeMarkerFilters.length > 0 ||
            activeRouteFilters.length > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
            >
              <Button
                clicked={() => {
                  dispatch({ type: AppState.SHOW_ALL, mode: true })

                  state?.containerRef?.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
                classes={'reset'}
              >
                Reset map
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FiltersStyles>
  )
}

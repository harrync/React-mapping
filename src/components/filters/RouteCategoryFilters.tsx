import { Fragment, useContext, useState } from 'react'
import { htmlDecode } from '../../helpers'
import { DispatchContext, StateContext } from '../../MapApp'
import Button from '../../ui/Button'
import {
  AppState,
  DispatchContextT,
  StateContextT,
  TaxonomyEntity,
} from '../../utils/types'
import { motion } from 'framer-motion'

export default function RouteCategoryFilters() {
  const [open, setOpen] = useState(false)

  const { state } = useContext(StateContext) as StateContextT
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const { routeCategoryData, activeRouteFilters } = state

  // Hide/show category buttons
  function handleToggleCategory() {
    setOpen(!open)
  }

  return (
    <>
      <Button
        classes={`category-label ${open && 'active'} ${
          activeRouteFilters.length > 0 && 'selected'
        }`}
        clicked={handleToggleCategory}
        ariaLabel={`Click to toggle routes`}
      >
        <span role="img" aria-label="Category arrow"></span>
        Routes
      </Button>

      {open && (
        <motion.div
          className="filters-dropdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut' }}
        >
          {routeCategoryData.map((category: TaxonomyEntity) => (
            <Fragment key={category.tid}>
              <Button
                clicked={() =>
                  dispatch({
                    type: AppState.ACTIVE_ROUTE_CATEGORIES,
                    mode: category.tid,
                  })
                }
                classes={`category ${
                  activeRouteFilters.includes(category.tid) && 'active'
                }`}
                data-tid={category.tid}
              >
                <span
                  className="check"
                  role="checkbox"
                  aria-checked={activeRouteFilters.includes(category.tid)}
                  aria-label="Visual checkbox for category"
                ></span>
                {htmlDecode(category.name)}
                <span
                  className="icon"
                  style={{ backgroundColor: category.route_colour }}
                ></span>
              </Button>
            </Fragment>
          ))}
        </motion.div>
      )}
    </>
  )
}

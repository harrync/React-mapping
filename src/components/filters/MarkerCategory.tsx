import { useContext, useEffect, useState } from 'react'
import { htmlDecode } from '../../helpers'
import { DispatchContext, StateContext } from '../../MapApp'
import Button from '../../ui/Button'
import {
  AppState,
  DispatchContextT,
  StateContextT,
  TaxonomyEntity,
} from '../../utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import { markerIcons } from '../../data/markerIcons'
import updateActiveCategories from '../../hooks/updateActiveCategories'

type Props = {
  category: TaxonomyEntity
}

/**
 * Top level marker categories, rendering out the parent & child categories
 */
export default function MarkerCategory({ category }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [currentTids, setCurrentTids] = useState<any[]>([])
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const { dispatch } = useContext(DispatchContext) as DispatchContextT
  const { state } = useContext(StateContext) as StateContextT
  const { activeMarkerFilters, mapRef } = state

  useEffect(() => {
    // If a tid from this cateogry is in state, set selected class to category toggle
    const isCategorySelected = currentTids.filter(tid => {
      const tidsMatch =
        currentTids.length > 0 ||
        tid.filter((term: number) => {
          return activeMarkerFilters.includes(term)
        }).length

      return tidsMatch !== undefined
    })

    setIsSelected(isCategorySelected.length > 0 ? true : false)

    // If no filters are selected, reset state to intital
    if (activeMarkerFilters.length === 0) {
      setIsSelected(false)
      setCurrentTids([])
    }
  }, [activeMarkerFilters, currentTids])

  // Hide/show category buttons
  function handleToggleCategory() {
    setOpen(!open)
  }

  function handleParentCategoryFilter(tid: number, children: TaxonomyEntity[]) {
    // Get child term IDs as array to cross reference against state
    const childTids = children.map(term => term.tid)

    // If child terms are present, remove them
    const childrenToRemove = activeMarkerFilters.filter(function (el) {
      return childTids.includes(el)
    })

    // Remove child TIDs from state - look in to more performant way to achieve this
    if (childrenToRemove.length > 0)
      childrenToRemove.forEach(tid => {
        dispatch({
          type: AppState.ACTIVE_MARKER_CATEGORIES,
          mode: tid,
        })
      })

    // Add parent TID to state
    dispatch({
      type: AppState.ACTIVE_MARKER_CATEGORIES,
      mode: tid,
    })

    // Toggle category in/out of state to manage parent button selected state
    const updatedTids = updateActiveCategories(tid, currentTids, mapRef)
    setCurrentTids(updatedTids)
  }

  function handleChildCategoryFilter(childTid: number, parentTid: number) {
    // Check if parent TID is in state, if so, remove it
    if (activeMarkerFilters.includes(parentTid)) {
      dispatch({
        type: AppState.ACTIVE_MARKER_CATEGORIES,
        mode: parentTid,
      })
    }

    // Add child TID to state
    dispatch({
      type: AppState.ACTIVE_MARKER_CATEGORIES,
      mode: childTid,
    })

    // Toggle category in/out of state to manage parent button selected state
    const updatedTids = updateActiveCategories(childTid, currentTids, mapRef)
    setCurrentTids(updatedTids)
  }

  function checkHasIcon(term: TaxonomyEntity) {
    const hasIcon = markerIcons.filter((icon: number) => term.tid === icon)

    return (
      <img
        src={`https://demos.harryedwards.dev/wp-content/themes/chilterns/dist/img/map/plain/${
          hasIcon ? +hasIcon : 0
        }.svg`}
        alt="Marker icon"
      />
    )
  }

  return (
    <>
      <Button
        classes={`category-label ${open && 'active'} ${
          isSelected && 'selected'
        }`}
        clicked={handleToggleCategory}
        ariaLabel={`Click to toggle ${htmlDecode(
          category.name
        )} category filters`}
        data-tid={category.tid}
      >
        <span role="img" aria-label="Category arrow"></span>
        {htmlDecode(category.name)}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="filters-dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
          >
            <Button
              clicked={() =>
                handleParentCategoryFilter(category.tid, category.children)
              }
              classes={`category ${
                activeMarkerFilters.includes(category.tid) && 'active'
              }`}
            >
              <span
                className="check"
                role="checkbox"
                aria-checked={activeMarkerFilters.includes(category.tid)}
                aria-label="Visual check for category"
              ></span>
              See all {htmlDecode(category.name)}
              {checkHasIcon(category)}
            </Button>

            {category.children.map((childCategory: TaxonomyEntity) => (
              <Button
                key={childCategory.tid}
                clicked={() =>
                  handleChildCategoryFilter(childCategory.tid, category.tid)
                }
                classes={`category ${
                  activeMarkerFilters.includes(childCategory.tid) && 'active'
                }`}
              >
                <span
                  className="check"
                  role="checkbox"
                  aria-checked={activeMarkerFilters.includes(childCategory.tid)}
                  aria-label="Visual check for category"
                ></span>
                {htmlDecode(childCategory.name)}
                {checkHasIcon(childCategory)}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

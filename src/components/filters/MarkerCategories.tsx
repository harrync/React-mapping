import { useContext } from 'react'
import { StateContext } from '../../MapApp'
import { StateContextT, TaxonomyEntity } from '../../utils/types'
import MarkerCategory from './MarkerCategory'

/**
 * Map marker category filters
 */
export default function MarkerCategories() {
  const { state } = useContext(StateContext) as StateContextT
  const { categoryData } = state

  return (
    <>
      {categoryData.map((category: TaxonomyEntity) => (
        <MarkerCategory key={category.tid} category={category} />
      ))}
    </>
  )
}

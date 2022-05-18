import React from 'react'
import ReactDOM from 'react-dom'
import MapApp from './MapApp'

const root = document.getElementById('root')

/**
 * Map app entry point
 */
if (root) {
  // const categories = root.dataset.categories as any
  // const routes = root.dataset.routes as any
  // const showAonb = !!Number(root.dataset.showAonb) as any
  const categories = '128,130,138,157,158,144,131'
  const routes = '198,197,196,194'
  const showAonb = true

  ReactDOM.render(
    <React.StrictMode>
      <MapApp categories={categories} routes={routes} showAonbArea={showAonb} />
    </React.StrictMode>,
    root
  )
}

import { Reducer } from 'react'
import updateActiveCategories from '../hooks/updateActiveCategories'
import { AppState, StateAction, State } from '../utils/types'

// Basic state setup
export const initialState: State = {
  loading: true,
  error: false,
  markerData: [],
  routeData: [],
  categoryData: [],
  routeCategoryData: [],
  activeMarkerFilters: [],
  activeRouteFilters: [],
  showAonbArea: false,
  infoBarContent: null,
  mapRef: null,
  containerRef: null,
}

/**
 * What's on reducer to manage state
 */
export default function mapReducer<R extends Reducer<State, StateAction>>(
  state: State,
  action: StateAction
) {
  switch (action.type) {
    case AppState.IS_LOADING:
      return {
        ...state,
        loading: action.mode,
      }
    case AppState.ERROR:
      return {
        ...state,
        error: action.mode,
      }
    case AppState.SET_DATA:
      return {
        ...state,
        markerData: action.mode,
      }
    case AppState.SET_ROUTES:
      return {
        ...state,
        routeData: action.mode,
      }
    case AppState.SET_CATEGORIES:
      return {
        ...state,
        categoryData: action.mode,
      }
    case AppState.SET_ROUTE_CATEGORIES:
      return {
        ...state,
        routeCategoryData: action.mode,
      }
    case AppState.SHOW_ALL:
      return {
        ...state,
        activeMarkerFilters: initialState.activeMarkerFilters,
        activeRouteFilters: initialState.activeRouteFilters,
      }
    case AppState.ACTIVE_MARKER_CATEGORIES:
      return {
        ...state,
        activeMarkerFilters: updateActiveCategories(
          action.mode,
          state.activeMarkerFilters,
          state.mapRef
        ),
        infoBarContent: null,
      }
    case AppState.ACTIVE_ROUTE_CATEGORIES:
      return {
        ...state,
        activeRouteFilters: updateActiveCategories(
          action.mode,
          state.activeRouteFilters,
          state.mapRef
        ),
        infoBarContent: null,
      }
    case AppState.SHOW_AONB_AREA:
      return {
        ...state,
        showAonbArea: action.mode,
      }
    case AppState.SHOW_INFO_BAR:
      return {
        ...state,
        infoBarContent: action.mode,
      }
    case AppState.MAP_REF:
      return {
        ...state,
        mapRef: action.mode,
      }
    case AppState.CONTAINER_REF:
      return {
        ...state,
        containerRef: action.mode,
      }
    default:
      throw new Error('Unknown action')
  }
}

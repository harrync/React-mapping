import { LatLngExpression } from 'leaflet'

export enum AppState {
  IS_LOADING = 'IS_LOADING',
  ERROR = 'ERROR',
  SHOW_ALL = 'SHOW_ALL',
  SHOW_AONB_AREA = 'SHOW_AONB_AREA',
  SHOW_INFO_BAR = 'SHOW_INFO_BAR',
  SET_DATA = 'SET_DATA',
  SET_ROUTES = 'SET_ROUTES',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_ROUTE_CATEGORIES = 'SET_ROUTE_CATEGORIES',
  ACTIVE_MARKER_CATEGORIES = 'ACTIVE_MARKER_CATEGORIES',
  ACTIVE_ROUTE_CATEGORIES = 'ACTIVE_ROUTE_CATEGORIES',
  MAP_REF = 'MAP_REF',
  CONTAINER_REF = 'CONTAINER_REF',
}

export type StateContextT = {
  state: State
}

export type DispatchContextT = {
  dispatch: React.Dispatch<any>
}

export type State = {
  loading: boolean
  error: boolean
  markerData: MarkerEntity[]
  routeData: RouteEntity[]
  categoryData: TaxonomyEntity[]
  routeCategoryData: TaxonomyEntity[]
  activeMarkerFilters: number[]
  activeRouteFilters: number[]
  showAonbArea: boolean
  infoBarContent: null | MarkerEntity | RouteEntity
  mapRef: null | React.RefObject<HTMLElement>
  containerRef: null | React.RefObject<HTMLElement>
}

export type StateAction = {
  type: AppState
  mode: any
}

export interface MapEntity {
  link?: string | LinkEntity
  links?: LinkEntity[]
  summary?: string
  content?: string
  distance?: string
  postcode?: string
  accessibility_terrain_walk_info?: string
  facilities_accessibility?: string
  id: number
  title: string
  image?: undefined | string
  imageAlt?: undefined | string
  categories?: number[] | null
  download?: string
}

export interface MarkerEntity extends MapEntity {
  lat: string
  lng: string
  position: LatLngExpression
}

export interface RouteEntity extends MapEntity {
  shape_file?: string
}

export interface LinkEntity {
  title: string
  url: string
  target: string
}

export interface TaxonomyEntity {
  tid: number
  name: string
  parent: number
  children: TaxonomyEntity[]
  route_colour?: string
}

export interface Icon {
  tid: number
  icon: string
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  isFiltersOpen: boolean
  theme: 'light' | 'dark'
  loading: {
    global: boolean
    products: boolean
    auth: boolean
    checkout: boolean
  }
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    timestamp: number
  }>
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isFiltersOpen: false,
  theme: 'light',
  loading: {
    global: false,
    products: false,
    auth: false,
    checkout: false,
  },
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen
    },
    closeSearch: (state) => {
      state.isSearchOpen = false
    },
    toggleFilters: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen
    },
    closeFilters: (state) => {
      state.isFiltersOpen = false
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setLoading: (state, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearAllNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  toggleFilters,
  closeFilters,
  setTheme,
  setLoading,
  addNotification,
  removeNotification,
  clearAllNotifications,
} = uiSlice.actions

export default uiSlice.reducer 
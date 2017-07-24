
export const PAGE_CHANGE_TOOLBAR_BACKGROUND = 'PAGE/CHANGE_TOOLBAR_BACKGROUND'
export const changeToolbarBackground = payload => new Object({ type: PAGE_CHANGE_TOOLBAR_BACKGROUND, payload })

export const PAGE_RESET_TOOLBAR_BACKGROUND = 'PAGE/RESET_TOOLBAR_BACKGROUND'
export const resetToolbarBackground = () => new Object({ type: PAGE_RESET_TOOLBAR_BACKGROUND })

export const PAGE_SEARCH = 'PAGE/SEARCH'
export const search = payload => new Object({ type: PAGE_SEARCH, payload })

export const PAGE_SEARCH_CLEAR = 'PAGE/SEARCH_CLEAR'
export const searchClear = () => new Object({ type: PAGE_SEARCH_CLEAR })
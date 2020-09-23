import { createSlice } from '@reduxjs/toolkit';

const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

export const initialState = {
  isSidebarOpened: true,

  language: checkLocalStorage('language', 'Русский'),

  searchFilterValue: checkLocalStorage('searchFilterValue', ''),

  componentsFilterValue: checkLocalStorage('componentsFilterValue', []),
  componentsModeStrict: checkLocalStorage('componentsModeStrict', 0),

  schoolsFilterValue: checkLocalStorage('schoolsFilterValue', []),

  levelsFilterValue:  checkLocalStorage('levelsFilterValue', [0, 9]),

  sourcesFilterValue: checkLocalStorage('sourcesFilterValue', ['PHB', 'XGTE', 'TOEE', 'SCAG']),

  classesFilterValue: checkLocalStorage('classesFilterValue', []),

  numberOfSpells: 0,

  sortValue: checkLocalStorage('sortValue', 0)
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.isSidebarOpened = !state.isSidebarOpened
    },

    changeLanguage: (state, { payload }) => {
      // navigator.language || navigator.userLanguage
      state.language = payload;
      placeToLocalStorage('language', payload);
    },

    changeSearchField: (state, { payload }) => {
      state.searchFilterValue = payload;
      placeToLocalStorage('searchFilterValue', payload);
    },
    clearSearchField: state => {
      state.searchFilterValue = '';
      placeToLocalStorage('searchFilterValue', '');
    },

    setComponentValue: (state, { payload }) => {
      const indexOfComponent = state.componentsFilterValue.indexOf(payload);
      if (indexOfComponent === -1) {
        state.componentsFilterValue = [...state.componentsFilterValue, payload];
        placeToLocalStorage('componentsFilterValue', [...state.componentsFilterValue, payload]);
      } else {
        state.componentsFilterValue = state.componentsFilterValue.filter((comp, i) => i !== indexOfComponent);
        placeToLocalStorage('componentsFilterValue', state.componentsFilterValue.filter((comp, i) => i !== indexOfComponent));
      }
    },
    setComponentsMode: (state, { payload }) => {
      state.componentsModeStrict = payload;
      placeToLocalStorage('componentsModeStrict', payload);
    },

    changeClasses: (state, { payload }) => {
      const indexOfClass = state.classesFilterValue.indexOf(payload);
      if (indexOfClass === -1) {
        state.classesFilterValue = [...state.classesFilterValue, payload];
        placeToLocalStorage('classesFilterValue', [...state.classesFilterValue, payload]);
      } else {
        state.classesFilterValue = state.classesFilterValue.filter((cls, i) => i !== indexOfClass);
        placeToLocalStorage('classesFilterValue', state.classesFilterValue.filter((cls, i) => i !== indexOfClass));
      }
    },

    changeSchools: (state, { payload }) => {
      const indexOfSChool = state.schoolsFilterValue.indexOf(payload);
      if (indexOfSChool === -1) {
        state.schoolsFilterValue = [...state.schoolsFilterValue, payload];
        placeToLocalStorage('schoolsFilterValue', [...state.schoolsFilterValue, payload]);
      } else {
        state.schoolsFilterValue = state.schoolsFilterValue.filter((schl, i) => i !== indexOfSChool);
        placeToLocalStorage('schoolsFilterValue', state.schoolsFilterValue.filter((schl, i) => i !== indexOfSChool));
      }
    },

    setLevelsValue: (state, { payload }) => {
      state.levelsFilterValue = payload;
      placeToLocalStorage('levelsFilterValue', payload);
    },

    changeSources: (state, { payload }) => {
      const indexOfSource = state.sourcesFilterValue.indexOf(payload);
      if (indexOfSource === -1) {
        state.sourcesFilterValue = [...state.sourcesFilterValue, payload];
        placeToLocalStorage('sourcesFilterValue', [...state.sourcesFilterValue, payload]);
      } else {
        state.sourcesFilterValue = state.sourcesFilterValue.filter((src, i) => i !== indexOfSource);
        placeToLocalStorage('sourcesFilterValue', state.sourcesFilterValue.filter((src, i) => i !== indexOfSource));
      }
    },

    changeNumberOfSpells: (state, { payload }) => {
      state.numberOfSpells = payload;
      // placeToLocalStorage('numberOfSpells', payload);
    },

    changeSort: (state, { payload }) => {
      state.sortValue = payload;
      placeToLocalStorage('sortValue', payload);
    }
  }
});

export const { toggleSidebar, changeLanguage, changeSearchField, clearSearchField, setComponentValue, setComponentsMode, changeSchools,
               setLevelsValue, changeSources, changeNumberOfSpells, changeSort, changeClasses } = filtersSlice.actions;

export const filtersSelector = state => state.filters;

export default filtersSlice.reducer;
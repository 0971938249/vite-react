import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from './action';
import { Slice, State } from './slice';
const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
export { setupStore, useAppDispatch, useTypedSelector, Action, Slice };
export type { State };

export * from './global';
export * from './data';
export * from './post';
import { globalSlice, dataSlice, postSlice } from './';
const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [postSlice.name]: postSlice.reducer,
});

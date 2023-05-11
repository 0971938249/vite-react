import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade, UserRole } from './user/role';
import { StoreFacade, StoreManagement, storeSlice } from './store-management';
import { Province, ProvinceFacade, provinceSlice } from './address/province';
import { District, DistrictFacade, districtSlice } from './address/district';
import { Ward, WardFacade, wardSlice } from './address/ward';
import { SupplierFacade, supplierSlice } from './supplier';
import { CategoryFacade, categorySlice } from './category';
import { ProductFacade, productSlice } from './product';
import { SubStoreFacade, subStoreSlice } from './store-management/sub-store';
import { connectSupplierSlice, ConnectSupplierFacade } from './store-connect-supplier';
import { inventoryProductSlice, inventoryProductFacade } from './product/inventory-product';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [storeSlice.name]: storeSlice.reducer,
  [provinceSlice.name]: provinceSlice.reducer,
  [districtSlice.name]: districtSlice.reducer,
  [wardSlice.name]: wardSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [subStoreSlice.name]: subStoreSlice.reducer,
  [connectSupplierSlice.name]: connectSupplierSlice.reducer,
  [inventoryProductSlice.name]: inventoryProductSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export {
  Action,
  Slice,
  User,
  UserRole,
  StoreManagement,
  Province,
  District,
  Ward,
  setupStore,
  useAppDispatch,
  useTypedSelector,
  GlobalFacade,
  UserFacade,
  UserRoleFacade,
  StoreFacade,
  ProvinceFacade,
  DistrictFacade,
  WardFacade,
  SupplierFacade,
  CategoryFacade,
  ProductFacade,
  SubStoreFacade,
  ConnectSupplierFacade,
  inventoryProductFacade
};

export type { State };

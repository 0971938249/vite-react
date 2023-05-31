import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Supplier } from '@store/supplier';
import { API, routerLinks } from '@utils';

const name = 'ConnectSupplier';

const action = {
    ...new Action<StoreConnectSupplier>(name),
    getStoreConnectSupplier: createAsyncThunk(
        name + '/get',
        async ({page, perPage, filter} : {page: number, perPage: number, filter: {idSuppiler: number, supplierType: string}}) => {
            const filterStoreConnectSupplier = JSON.parse(filter.toString() || '{}')
            console.log(filterStoreConnectSupplier)
            return await API.get(routerLinks(name, 'api'), {page, perPage, idSuppiler: filterStoreConnectSupplier.idSuppiler, supplierType: filterStoreConnectSupplier.supplierType})
        }
      ),
}

export const connectSupplierSlice = createSlice(new Slice<StoreConnectSupplier>(action));

export const ConnectSupplierFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<StoreConnectSupplier>),
        set: (values: State<StoreConnectSupplier>) => dispatch(action.set(values)),
        // get: (params: PaginationQuery<StoreConnectSupplier>) => dispatch(action.get(params)),
        get: ({page, perPage, filter} : {page: number, perPage: number, filter: {idSuppiler: number, supplierType: string}}) => dispatch(action.getStoreConnectSupplier({page,perPage,filter})),
    };
};

export class StoreConnectSupplier extends CommonEntity {
    constructor(
        public id?: string,
        public supplier?: Supplier,
    ) {
        super();
    }
}

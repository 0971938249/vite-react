import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Product';

const action = {
  ...new Action<Product>(name),
  getProduct: createAsyncThunk(
    name + '/getProduct',
    async ({
      page,
      perPage,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      filter: {
        storeId?: string;
        type: string;
        supplierId?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        isGetAll?: boolean;
        approveStatus?: string;
      };
      sorts?: {};
    }) => {
      const filterProduct = typeof filter != 'object' ? JSON.parse(filter || '{}') : filter;
      const sortProduct = sorts ? JSON.parse(sorts.toString() || '{}') : '';
      cleanObjectKeyNull(sortProduct);
      let data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page: page,
          perPage: perPage,
          storeId: filterProduct.storeId,
          type: filterProduct.type,
          approveStatus: filterProduct.approveStatus,
          supplierId: filterProduct.supplierId,
          categoryId: filterProduct.categoryId3
            ? filterProduct.categoryId3
            : filterProduct.categoryId2
              ? filterProduct.categoryId2
              : filterProduct.categoryId1
                ? filterProduct.categoryId1
                : null,
          categoryId1: filterProduct.categoryId1,
          categoryId2: filterProduct.categoryId2,
          categoryId3: filterProduct.categoryId3,
          productName: filterProduct.name,
          supplierBarcode: filterProduct.barcode,
          storeBarcode: filterProduct.storeBarcode,
          productCode: filterProduct.code,
          isGetAll: filterProduct.isGetAll,
          sort: { productCode: sortProduct.code, productName: sortProduct.name },
        }),
      );
      return data;
    },
  ),

  getproduct: createAsyncThunk(name + '/supplierwaitingappprove', async () => {
    const { data } = await API.get<Product>(`${routerLinks(name, 'api')}/list/supplier-waiting-appprove`);
    return data || {};
  }),
  getById1: createAsyncThunk(name + '/getById', async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Product> }) => {
    let { data } = await API.get<Product>(`${routerLinks(name, 'api')}/${id}`);
    const exportTaxId = data?.exportTax?.id;
    const importTaxId = data?.importTax?.id;
    const categoryId = data?.category?.id;
    data = { ...data, exportTaxId, importTaxId, categoryId }
    console.log(data)
    return { data, keyState };
  },)
};

export const productSlice = createSlice(new Slice<Product>(action, { result: {}, result2: {}, result3: {} }, (builder) =>
  builder
    .addCase(
      action.getProduct.pending,
      (
        state: State<Product>,
        action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
      ) => {
        state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
        state.queryParams = JSON.stringify(action.meta.arg);
        state.isLoading = true;
        state.status = 'getProduct.pending';
      },
    )

    .addCase(action.getProduct.fulfilled, (state: State<Product>, action: any) => {
      if (action.payload.data) {
        typeof action.meta.arg.filter == 'string' ? state.result = action.payload : state.result2 = action.payload;
        state.status = 'getProduct.fulfilled';
      } else state.status = 'idle';
      state.isLoading = false;
    })
    .addCase(action.getProduct.rejected, (state: State) => {
      state.status = 'getProduct.rejected';
      state.isLoading = false;
    })



    .addCase(action.getproduct.pending, (state: State<Product>, action) => {
      state.data = action.meta.arg;
      state.isLoading = true;
      state.status = 'getproduct.pending';
    })
    .addCase(action.getproduct.fulfilled, (state: State, action: PayloadAction<Product>) => {
      if (action.payload) {
        state.user = action.payload;
        state.status = 'getproduct.fulfilled';
      } else state.status = 'idle';
      state.isLoading = false;
    })
    .addCase(action.getproduct.rejected, (state: State) => {
      state.status = 'getproduct.rejected';
      state.isLoading = false;
    })

));

export const ProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Product>),
    set: (values: State<Product>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<Product>) => dispatch(action.get(params)),
    get: ({
      page,
      perPage,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      filter: {
        supplierId?: string;
        storeId?: string;
        type: string;
        approveStatus: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        isGetAll?: boolean;
      };
      sorts?: {};
    }) => {
      return dispatch(action.getProduct({ page, perPage, filter, sorts }));
    },
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Product> }) =>
      dispatch(action.getById1({ id, keyState })),
    post: (values: Product) => dispatch(action.post(values)),
    put: (values: Product) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getproduct: () => dispatch(action.getproduct()),
  };
};

export class Product extends CommonEntity {
  constructor(
    public stt?: number,
    public categoryId1?: string,
    public categoryId2?: string,
    public categoryId3?: string,
    public id?: string,
    public code?: string,
    public barcode?: string,
    public storeBarcode?: string,
    public name?: string,
    public description?: string,
    public brand?: string,
    public isOnlineBusinessWay?: boolean,
    public status?: string,
    public stockQuantity?: string,
    public supplierName?: string,
    public basicUnit?: string,
    public price?: string,
    public sellingPrice?: string,
    public exportTaxId?: string,
    public importTaxId?: string,
    public category?: {
      child: {
        child: {
          id: string;
          name: string;
        };
        id: string;
        name: string;
      };
      id: string;
      name: string;
    },
    public categoryId?: string,
    public exportTax?: {
      id: string;
      name: string;
    },
    public importTax?: {
      id: string;
      name: string;
    },
    public productPrice?: [
      {
        price: string;
        priceType: string;
        minQuantity: string;
      },
    ],
    public priceBalanceCommission?: [
      {
        amountBalance: string;
        revenue: string;
        percentBalance: string;
      },
    ],
    public child?: {},
    public photos?: [
      {
        url?: string;
      },
    ],
    public approveStatus?: string,
    public subOrg?: {
      id: string;
      name: string;
    },
    public capitalCost?: string,
    public abilitySupply?: {
      quarter: string;
      month: string;
      year: string;
    },
    public productCategory?: [
      {
        category: {
          name: string
        },
      }
    ]
  ) {
    super();
  }
}

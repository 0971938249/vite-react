import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';

const name = 'Product';
const action = {
  ...new Action<Product>(name),
  getProduct: createAsyncThunk(name + '/Product', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/Product`),
  ),
};
export const ProductSlice = createSlice(new Slice<Product>(action));
export const ProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Product>),
    set: (values: State<Product>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Product>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Product> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Product) => dispatch(action.post(values)),
    put: (values: Product) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getProduct: () => dispatch(action.getProduct()),
  };
};
export class Product extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public quanlity?: string,
    public price?: string,
    public images?: string[],
    public status?: string,
    public slug?: string,
    public mass?: string,
    public discount?: string,
    public productCategoryId?: string,
    public prodictStoreId?: string,
    public productStore?:{
      id?:string,
      isDisabled?:string,
      createdAt?:string,
      updatedAt?:string,
      name?:string,
      status?:string,
      phone?:string,
      description?:string,
      slug?:string,
      avatar?:string,
      userId?:string,
    },
    public productCategory?:{
      id?:string,
      isDisabled?:string,
      createdAt?:string,
      updatedAt?:string,
      name?:string,
      description?:string,
      slug?:string,
    },
    public isDisabled?: string,
    public createAt?: string,
    public updateAt?: string,
  ) {
    super();
  }
}

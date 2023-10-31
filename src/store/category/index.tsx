import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';

const name = 'Product-category';
const action = {
  ...new Action<Product-category>(name),
  getProduct-category: createAsyncThunk(name + '/Product-category', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/Product-category`),
  ),
};
export const Product-categorySlice = createSlice(new Slice<Product-category>(action));
export const Product-categoryFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Product-category>),
    set: (values: State<Product-category>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Product-category>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Product-category> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Product-category) => dispatch(action.post(values)),
    put: (values: Product-category) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getProduct-category: () => dispatch(action.getProduct-category()),
  };
};
export class Product-category extends CommonEntity {
  constructor(
    public id?: string,
    public isDisabled?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public name?: string,
    public description?: string,
    public slug?: string,
  ) {
    super();
  }
}

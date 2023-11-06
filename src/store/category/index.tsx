import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';

const name = 'Category';
const action = {
  ...new Action<Category>(name),
  getCategory: createAsyncThunk(name + '/product-category', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/Category`),
  ),
  getByIdCategory: createAsyncThunk(name + '/product-category', async (id: string) => {
    const data = await API.get<Category>(`${routerLinks(name, 'api')}/${id}`);
    return { data };
  }),
};
export const CategorySlice = createSlice(new Slice<Category>(action));
export const CategoryFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Category>),
    set: (values: State<Category>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Category>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Category> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Category) => dispatch(action.post(values)),
    put: (values: Category) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getCategory: () => dispatch(action.getCategory()),
    getByIdCategory:  ({  id }: { id: string })=> dispatch(action.getByIdCategory(id)),
  };
};
export class Category extends CommonEntity {
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

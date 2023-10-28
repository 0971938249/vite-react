import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';

const name = 'product';
const action = {
  ...new Action<product>(name),
  getPermission: createAsyncThunk(name + '/permission', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/permission`),
  ),
};
export const productSlice = createSlice(new Slice<product>(action, { keepUnusedDataFor: 9999 }));
export const productFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<product>),
    set: (values: State<product>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<product>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<product> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: product) => dispatch(action.post(values)),
    put: (values: product) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getPermission: () => dispatch(action.getPermission()),
  };
};
export class product extends CommonEntity {
  
}

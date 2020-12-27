import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';

export const userStateFeatureKey = 'userState';

export interface UserState {

}

export const reducers: ActionReducerMap<UserState> = {

};


export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];

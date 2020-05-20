import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { IStore } from 'types/store';

export type TDispatch = ThunkDispatch<IStore, void, Action>;

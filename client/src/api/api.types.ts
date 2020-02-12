import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from 'types/store';

export type TDispatch = ThunkDispatch<IStore, void, Action>;

import { ThunkDispatch } from 'redux-thunk';
import { IStore } from 'types/store';
import { Action } from 'redux';

export type TDispatch = ThunkDispatch<IStore, void, Action>;

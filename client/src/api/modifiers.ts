import fetch from 'cross-fetch';
import { modifiersStore, notificationsStore, targetModifiersStore } from 'store/slices';

import { TDispatch } from './api.types';

export const fetchModifiers = () => async (dispatch: TDispatch) => {
  dispatch(modifiersStore.actions.fetchModifiersPending());
  try {
    const request = await fetch('/api/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(modifiersStore.actions.fetchModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(modifiersStore.actions.fetchModifiersError({ error }));
    dispatch(
      notificationsStore.actions.addNotification({
        message: 'Failed to fetch modifiers',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchModifiers()),
        },
      }),
    );
  }
};

export const fetchTargetModifiers = () => async (dispatch: TDispatch) => {
  dispatch(targetModifiersStore.actions.fetchTargetModifiersPending());
  try {
    const request = await fetch('/api/target/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(targetModifiersStore.actions.fetchTargetModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(targetModifiersStore.actions.fetchTargetModifiersError({ error }));
    dispatch(
      notificationsStore.actions.addNotification({
        message: 'Failed to fetch target modifiers',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchTargetModifiers()),
        },
      }),
    );
  }
};

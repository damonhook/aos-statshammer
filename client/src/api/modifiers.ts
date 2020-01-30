import fetch from 'cross-fetch';
import { notifications, modifiers, targetModifiers } from 'store/slices';
import { TDispatch } from './api.types';

export const fetchModifiers = () => async (dispatch: TDispatch) => {
  dispatch(modifiers.actions.fetchModifiersPending());
  try {
    const request = await fetch('/api/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(modifiers.actions.fetchModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(modifiers.actions.fetchModifiersError({ error }));
    dispatch(
      notifications.actions.addNotification({
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
  dispatch(targetModifiers.actions.fetchTargetModifiersPending());
  try {
    const request = await fetch('/api/target/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(targetModifiers.actions.fetchTargetModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(targetModifiers.actions.fetchTargetModifiersError({ error }));
    dispatch(
      notifications.actions.addNotification({
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

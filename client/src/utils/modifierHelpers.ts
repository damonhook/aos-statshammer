import store from 'store';

// @ts-ignore
export const getModifiers = () => store.getState().modifiers.modifiers;

export const getModifierById = id => getModifiers().find(mod => mod.id === id);

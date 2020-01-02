import store from 'store';

export const getModifiers = () => store.getState().modifiers.modifiers;

export const getModifierById = id => getModifiers().find(mod => mod.id === id);

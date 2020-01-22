import store from 'store';

export const getModifiers = () => store.getState().modifiers.modifiers;

export const getModifierById = (id: string) => getModifiers().find(mod => mod.id === id);

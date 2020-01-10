import store from 'store';

export const getTargetModifiers = () => store.getState().targetModifiers.modifiers;

export const getTargetModifierById = (id: string) => getTargetModifiers().find(mod => mod.id === id);

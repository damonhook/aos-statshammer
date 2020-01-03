import store from 'store';

//@ts-ignore
export const getTargetModifiers = () => store.getState().targetModifiers.modifiers;

export const getTargetModifierById = id => getTargetModifiers().find(mod => mod.id === id);

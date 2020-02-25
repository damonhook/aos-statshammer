export const validateProfile = (data: any): string | undefined => {
  if (!data) return 'Data is not defined';
  const requiredProps = ['num_models', 'attacks', 'to_hit', 'to_wound', 'rend', 'damage'];
  let requiredPropsError: string | undefined;
  requiredProps.some(key => {
    if (data?.[key] == null) {
      requiredPropsError = `${key} is missing`;
      return true;
    }
    return false;
  });
  if (requiredPropsError) return requiredPropsError;
  const modifiers = data?.modifiers;
  if (!modifiers || !Array.isArray(modifiers)) return 'Modifiers are missing / invalid';
  return undefined;
};

export const validateUnit = (data: any): string | undefined => {
  if (!data) return 'Data is not defined';
  if (!data?.name || typeof data?.name !== 'string') return 'Name is not defined / is empty';
  const profiles = data?.weapon_profiles;
  if (!profiles || !Array.isArray(profiles)) return 'Weapon Profiles are missing / invalid';
  let profileError: string | undefined;
  profiles.some((profile: any, index: number) => {
    const v = validateProfile(profile);
    if (v) {
      profileError = `Invalid Weapon Profile #${index + 1}: ${v}`;
      return true;
    }
    return false;
  });
  return profileError;
};

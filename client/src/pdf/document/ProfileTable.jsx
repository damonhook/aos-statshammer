import React from 'react';
import Table from 'pdf/components/Table';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { getModifierById } from 'utils/modifierHelpers';
import { getFormattedDescription } from 'components/ModifierItem/ModifierDescription';
import 'pdf/font';


const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  heading: {
    fontSize: 14,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 12,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  modifiers: {
    marginHorizontal: 5,
  },
  modifier: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '2em',
    fontSize: 11,
  },
});

const ProfileTable = ({ profile }) => {
  const name = profile.name || 'Profile';
  return (
    <>
      <Text style={styles.subheading}>Weapon Profile</Text>
      <Table>
        <Table.Row>
          <Table.Cell style={[styles.name, styles.centered]} bold>{name}</Table.Cell>
        </Table.Row>
        <Table.Head>
          <Table.Row>
            <Table.Cell># Models</Table.Cell>
            <Table.Cell>Attacks</Table.Cell>
            <Table.Cell>To Hit</Table.Cell>
            <Table.Cell>To Wound</Table.Cell>
            <Table.Cell>Rend</Table.Cell>
            <Table.Cell>Damage</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Row>
          <Table.Cell>{profile.num_models}</Table.Cell>
          <Table.Cell>{profile.attacks}</Table.Cell>
          <Table.Cell>{profile.to_hit}</Table.Cell>
          <Table.Cell>{profile.to_wound}</Table.Cell>
          <Table.Cell>{profile.rend}</Table.Cell>
          <Table.Cell>{profile.damage}</Table.Cell>
        </Table.Row>
      </Table>
      {profile.modifiers && profile.modifiers.length
        ? (
          <View style={styles.modifiers}>
            <Text style={[styles.subheading, { margin: 5 }]}>Modifiers</Text>
            {profile.modifiers.map(({ id, options }) => {
              const definition = getModifierById(id);
              if (!definition) return null;
              return (
                <View style={styles.modifier}>
                  <Text style={{ fontWeight: 'bold' }}>{definition.name}</Text>
                  <Text>{getFormattedDescription(definition, options, false)}</Text>
                </View>
              );
            })}
          </View>
        ) : null}
    </>
  );
};

export default ProfileTable;

import React from 'react';
import {
  Document, Page, View, StyleSheet, Image, Text, Font,
} from '@react-pdf/renderer';
import StatsTable from './StatsTable';
import ProfileTable from './ProfileTable';
import 'pdf/font';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  subsection: {
    marginBottom: 5,
  },
  images: {
    margin: 5,
  },
});

const Pdf = ({ images, results, units }) => {
  const unitNames = units.map(({ name }) => name);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {units.map(({ name, weapon_profiles }) => (
            <View style={styles.subsection}>
              <Text>{name}</Text>
              {weapon_profiles.map((profile) => (
                <ProfileTable profile={profile} />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <StatsTable results={results} unitNames={unitNames} />
          <View style={styles.images}>
            {images.filter((src) => src != null).map((src) => (
              <Image src={src} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;

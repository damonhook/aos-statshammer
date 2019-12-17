import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Image,
} from '@react-pdf/renderer';
import StatsTable from './StatsTable';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  images: {
    margin: 5,
  },
});

const Pdf = ({ images, results, unitNames }) => (
  <Document>
    <Page size="A4" style={styles.page}>
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

export default Pdf;

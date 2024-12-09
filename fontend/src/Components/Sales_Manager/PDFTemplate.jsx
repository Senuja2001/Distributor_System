// PDFTemplate.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f4f4f4", // Light background color
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center",
    color: "#2C3E50", // Dark blue color for title
    fontWeight: "bold",
    borderBottom: "2px solid #2980B9", // Underline
    paddingBottom: 5,
  },
  section: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: "#ecf0f1", // Light grey background for sections
    borderRadius: 8, // Rounded corners
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#2980B9", // Blue color for section titles
    fontWeight: "bold",
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    color: "#34495E", // Darker text color for better readability
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#2980B9", // Border color for the table
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#2980B9", // Blue background for table header
    color: "#fff", // White text for table header
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#2980B9",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    textAlign: "center",
    backgroundColor: "#f4f4f4", // Light grey background for table cells
  },
  tableColHeader: {
    width: "25%",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    color: "#34495E",
  },
  subtotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50", // Darker color for subtotal
    marginTop: 15,
    textAlign: "right",
  },
});

const PDFTemplate = ({ salesData, pickList }) => (
  <Document>
    <Page style={styles.page}>
      {/* Sales Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sales Data</Text>
        <Text style={styles.text}>Customer Name: {salesData.cname}</Text>
        <Text style={styles.text}>Date: {salesData.odate}</Text>
        <Text style={styles.text}>Total Amount: {salesData.tamount}</Text>
      </View>

      {/* Picklist Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Picklist</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Item Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Unit Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>

          {/* Table Rows */}
          {pickList.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.unitPrice}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {(item.unitPrice * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Subtotal */}
      <View style={styles.section}>
        <Text style={styles.subtotal}>
          Subtotal: RS.{" "}
          {pickList
            .reduce((total, item) => total + item.unitPrice * item.quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFTemplate;

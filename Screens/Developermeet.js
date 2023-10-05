import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DeveloperMeetScreen = () => {
  const appReview = `As the developer of this app, I'm thrilled to introduce you to our digital solution for the RMG sector. Our app aims to revolutionize the industry by automating manual reporting processes, implementing a digital Kanban system, and facilitating seamless information flow.

  Features of our app:
  - Automated Reporting: Say goodbye to manual paperwork. Our app streamlines the reporting process, making it faster and more accurate.
  - Digital Kanban: Manage your tasks efficiently with our digital Kanban boards. Visualize your workflow and boost productivity.
  - Information Flow: We prioritize real-time information sharing, ensuring that all stakeholders are informed and connected.

We are committed to providing a user-friendly experience and continuously improving our app to meet your evolving needs. Join us on this journey towards a more efficient and connected RMG industry.

  MD TAIFUL AMIN
  Developer - RMG Solutions
  `;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../assets/Taif.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.title}>Developer Meet</Text>
        <View style={{width:'80%',borderWidth:1,borderColor:'gray',marginBottom:10}}></View>
        <Text style={styles.name}>MD TAIFUL AMIN</Text>
        <Text style={styles.info}>Mobile: 01701014481</Text>
        <Text style={styles.info}>Organization: Square Fashions Ltd </Text>
        <Text style={styles.info}>Department: Industrial Engineering (IE) </Text>
        <Text style={styles.info}>University: RUET </Text>
        <Text style={styles.reviewTitle}>Developer's Review</Text>
        <View style={{width:'80%',borderWidth:1,borderColor:'gray',marginBottom:10}}></View>
        <Text style={styles.reviewText}>{appReview}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222', // Dark background color
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 250,
    height: 300,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00A6FF', // Accent color
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // White text
  },
  info: {
    fontSize: 18,
    color: '#BBB', // Light gray text
    marginTop: 5,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom:10,
    color: '#00A6FF', // Accent color
  },
  reviewText: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#BBB', // Light gray text
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default DeveloperMeetScreen;

import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { useState } from 'react';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { question: 'How do I schedule a pickup?', answer: 'Go to the Home tab and tap on "Schedule Pickup". Fill in the form and confirm.' },
    { question: 'What type of waste can I dispose?', answer: 'We collect general waste, plastics, metals, glass, and electronic waste.' },
    { question: 'How do I make a payment?', answer: 'You can pay via Mobile Money, Debit/Credit Card, or Cash on Pickup during the scheduling flow.' },
    { question: 'How can I track my pickup?', answer: 'Use the "Track" tab in the bottom navigation to monitor your scheduled pickups in real-time.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Help Center</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>Still need help?</Text>
          <Text style={styles.contactSubText}>Contact our support team.</Text>
          <Button 
            title="Contact Support" 
            onPress={() => {}} 
            style={styles.contactButton}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    padding: SIZES.l,
    flexGrow: 1,
  },
  header: {
    marginBottom: SIZES.l,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.s,
    paddingHorizontal: SIZES.m,
    height: 50,
    marginBottom: SIZES.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: SIZES.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.m,
  },
  faqContainer: {
    marginBottom: SIZES.xl,
  },
  faqCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.m,
    borderRadius: SIZES.m,
    marginBottom: SIZES.s,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
  },
  faqArrow: {
    fontSize: 20,
    color: COLORS.textLight,
    marginLeft: SIZES.s,
  },
  contactContainer: {
    backgroundColor: '#E8F5E9',
    padding: SIZES.l,
    borderRadius: SIZES.m,
    marginTop: 'auto',
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  contactSubText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SIZES.m,
  },
  contactButton: {
    marginVertical: 0,
  }
});

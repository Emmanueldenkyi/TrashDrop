import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SIZES } from '../../src/constants/theme';

export default function Home() {
  const services = [
    { id: 'schedule', title: 'Schedule Pickup', icon: '🗑️', route: '/schedule' },
    { id: 'history', title: 'Pickup History', icon: '📋', route: '/history' },
    { id: 'notifications', title: 'Notifications', icon: '🔔', route: '/notifications' },
    { id: 'guide', title: 'Recycling Guide', icon: '♻️', route: '/guide' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Kelvin 👋</Text>
            <Text style={styles.subtitle}>Let's keep the environment clean!</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.profileAvatar}>
            <Text style={styles.avatarText}>K</Text>
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => router.push(service.route as any)}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Environmental Tips */}
        <Text style={styles.sectionTitle}>Environmental Tip</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Did you know?</Text>
          <Text style={styles.tipText}>
            Recycling one aluminum can saves enough energy to run a TV for three hours. 
            Remember to rinse your cans before throwing them in the recycling bin!
          </Text>
        </View>

        {/* Nearby Recycling Locations */}
        <Text style={styles.sectionTitle}>Nearby Recycling Centers</Text>
        <TouchableOpacity style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Green Zone Recycling</Text>
            <Text style={styles.locationDistance}>2.5 km away</Text>
          </View>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>City Center Waste Hub</Text>
            <Text style={styles.locationDistance}>3.8 km away</Text>
          </View>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>

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
    paddingBottom: SIZES.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.m,
    marginTop: SIZES.s,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: SIZES.m,
    borderRadius: SIZES.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: SIZES.s,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#E8F5E9', // Light green
    padding: SIZES.l,
    borderRadius: SIZES.m,
    marginBottom: SIZES.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.xs,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SIZES.m,
    borderRadius: SIZES.m,
    marginBottom: SIZES.s,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  locationIcon: {
    fontSize: 24,
  }
});

import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS, SIZES } from '../src/constants/theme';
import { supabase } from '../src/utils/supabase';
import { useAuth } from '../src/contexts/AuthContext';

export default function History() {
  const { user } = useAuth();
  const [pickups, setPickups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPickups();
    }
  }, [user]);

  const fetchPickups = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('pickups')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setPickups(data);
    }
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return COLORS.success;
      case 'Cancelled': return COLORS.error;
      case 'Scheduled': return COLORS.warning;
      default: return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Pickup History</Text>
          <View style={styles.placeholder} />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {pickups.length === 0 ? (
              <Text style={styles.emptyText}>No pickup history found.</Text>
            ) : (
              pickups.map((pickup) => (
                <View key={pickup.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.date}>{pickup.pickup_date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(pickup.status) }]}>
                      <Text style={styles.statusText}>{pickup.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.wasteType}>{pickup.waste_type}</Text>
                  <Text style={styles.address}>{pickup.address}</Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    paddingVertical: SIZES.s,
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeholder: {
    width: 60,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    padding: SIZES.l,
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: SIZES.xxl,
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SIZES.l,
    borderRadius: SIZES.m,
    marginBottom: SIZES.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.s,
  },
  date: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: SIZES.s,
    paddingVertical: 4,
    borderRadius: SIZES.s,
  },
  statusText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  wasteType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: COLORS.textLight,
  }
});

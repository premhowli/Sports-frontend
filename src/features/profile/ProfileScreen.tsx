import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useUser} from '../../shared/hooks/useUser';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileSummary from './components/ProfileSummary';
import PredictionItem from './components/PredictionItem';
import { Prediction } from '../../types/prediction';


const ProfileScreen: React.FC = () => {
  const {user, fetchUserData, loading} = useUser();
  useFocusEffect(fetchUserData);

  const renderPredictionItem = useCallback(
    ({item}: {item: Prediction}) => {
      return <PredictionItem item={item}/>;
    },
    [],
  );

  const onRefresh = useCallback(async () => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading && !user?.id) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Top User Card */}
        <ProfileSummary />
        {/* Prediction History */}
        {user.predictions.length > 0 ? (
          <>
            <Text style={styles.sectionHeader}>Prediction History</Text>
            <FlatList
              data={user.predictions}
              keyExtractor={item => item.gameId}
              renderItem={renderPredictionItem}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.listContainer}
            />
          </>
        ) : <Text style={[styles.sectionHeader, styles.alignSelf]}>No prediction history found!</Text>}
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 18},
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceValue: {color: '#449000'},
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginVertical: 10,
    color: '#333',
  },
  alignSelf: {
    alignSelf: 'center',
  },
  listContainer: {paddingBottom: 40},
});

export default ProfileScreen;

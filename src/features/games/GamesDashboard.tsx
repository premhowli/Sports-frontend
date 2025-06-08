import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Game} from '../../types/game';
import GameCard from './components/GameCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useGames} from './hooks/useGames';
import DropDown from './components/DropDown';

const STATUS_OPTIONS = [
  {key: 'all', label: 'All', icon: '🏆'},
  {key: 'playable', label: 'Playable', icon: '🎲'},
  {key: 'upcoming', label: 'Upcoming', icon: '🗓️'},
  {key: 'live', label: 'Live', icon: '🔴'},
  {key: 'completed', label: 'Completed', icon: '✅'},
];

export const GamesDashboard = () => {
  const {games: allGames, loading} = useGames();
  const [status, setStatus] = useState('playable');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const sortOrder = useMemo(
    () => ({
      inProgress: 0,
      scheduled: 1,
      final: 2,
    }),
    [],
  );

  const filteredGames = useMemo(() => {
    return allGames
      .filter((game: Game) => {
        switch (status) {
          case 'upcoming':
            return game.status === 'scheduled';
          case 'live':
            return game.status === 'inProgress';
          case 'completed':
            return game.status === 'final';
          case 'all':
            return true;
          default:
            return game.status === 'inProgress' || game.status === 'scheduled';
        }
      })
      .sort((a, b) => {
        return sortOrder[a.status] - sortOrder[b.status];
      });
  }, [allGames, sortOrder, status]);

  const handleGamePress = useCallback(
    (gameId: string) => {
      // Navigate to game details screen
      console.log(`Game ID pressed: ${gameId}`);
      navigation.navigate('GameDetail', {gameId});
      console.log(`Navigate to game details for game ID: ${gameId}`);
    },
    [navigation],
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.verticallyCentered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Dropdown */}
      <DropDown
        statusOption={STATUS_OPTIONS}
        initialStatus={'playable'}
        onStatusChange={setStatus}
      />
      {/* Games List */}
      {filteredGames.length === 0 ? (
        <View style={[styles.container, styles.horizontallyCentered, styles.verticallyCentered]}>
          <Text style={styles.text}>
            {allGames.length > 0
              ? 'No games match your vibe right now! Try a different filter.'
              : 'No Games available at this time!'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredGames}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard game={item} onPress={handleGamePress} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  verticallyCentered: {
    justifyContent: 'center',
  },
  horizontallyCentered: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth : '75%',
  },

  listContainer: {padding: 16},
});

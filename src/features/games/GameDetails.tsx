import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Game} from '../../types/game';
import TeamDetail from './components/TeamDetail';
import GameTimer from './components/GameTimer';
import Button from '../../shared/components/Button';
import {usePrediction} from './hooks/usePrediction';
import { useGames } from './hooks/useGames';

type GameDetailRouteProp = RouteProp<RootStackParamList, 'GameDetail'>;

const GameDetail: React.FC = () => {
  const route = useRoute<GameDetailRouteProp>();
  const {gameId} = route.params;
  const { games, stopPolling } = useGames();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const {
    prediction,
    loading: submittingPrediction,
    checkExistingPrediction,
    handlePrediction,
  } = usePrediction(gameId);

  const loadGame = useCallback(async () => {
    try {
      const gameData = games.find(val => val.id === gameId);
      setGame(gameData);
    } catch (err) {
      console.error('Failed to load game details', err);
    } finally {
      setLoading(false);
    }
  }, [gameId, games]);

  const predictionSection = useMemo(() => {
    if (!game) {
      return null;
    }
    const headerTxt = prediction
      ? `You predicted ${prediction.pick}`
      : game.status !== 'final'
      ? 'Make Your Prediction'
      : null;
    return (
      <View style={styles.predictionContainer}>
        {headerTxt && <Text style={styles.subHeader}>{headerTxt}</Text>}
        {!prediction && game.status !== 'final' && (
          <>
            <Button
              text={game.homeTeam.name}
              disabled={submittingPrediction}
              showLoader={submittingPrediction}
              onPress={() => {
                handlePrediction(game.homeTeam.abbreviation);
              }}
            />
            <Button
              text={game.awayTeam.name}
              disabled={submittingPrediction}
              showLoader={submittingPrediction}
              onPress={() => {
                handlePrediction(game.awayTeam.abbreviation);
              }}
            />
          </>
        )}
      </View>
    );
  }, [game, prediction, submittingPrediction, handlePrediction]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    checkExistingPrediction();
  }, [checkExistingPrediction]);

  useEffect(() => {
    if (game?.status === 'final') {
      stopPolling();
    }
  }, [game, stopPolling]);

  if (loading || !game) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Team Names & Logos */}
      <View style={styles.centerAlignedWithMarginTop}>
        <GameTimer
          status={game.status}
          clock={game.clock}
          startTime={game.startTime}
          period={game.period}
        />
      </View>
      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <TeamDetail
            team={game.homeTeam}
            winner={game.winner}
            favorite={game.odds?.favorite}
          />
        </View>
        <Text style={styles.vs}>⚔️</Text>
        <View style={styles.team}>
          <TeamDetail
            team={game.awayTeam}
            winner={game.winner}
            favorite={game.odds?.favorite}
          />
        </View>
      </View>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>
          {game.status === 'final'
            ? `${game.winner} won!`
            : `Odds: ${game.odds?.spread}`}
        </Text>
      </View>

      {/* Prediction UI */}
      {predictionSection}
    </View>
  );
};

export default GameDetail;

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tag: {
    width: 30,
    height: 30,
    marginTop: 4,
    position: 'absolute',
    left: 15,
    top: -15,
    zIndex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  team: {alignItems: 'center', marginHorizontal: 18, width: '45%'},
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  teamName: {fontWeight: 'bold', fontSize: 16, textAlign: 'center'},
  vs: {fontSize: 18, fontWeight: 'bold', marginHorizontal: 8, color: '#888'},
  info: {fontSize: 15, color: '#333', marginBottom: 5, textAlign: 'center'},
  subHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerTextContainer: {alignItems: 'center', marginTop: 32},
  footerText: {
    fontSize : 16,
    fontWeight: '600',

  },
  button: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 14,
    marginVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selected: {backgroundColor: '#000'},
  buttonText: {fontSize: 16, fontWeight: '600', color: '#000'},
  selectedButtonText: {color: '#fff'},
  predictionContainer: {
    height: height * 0.25,
    // backgroundColor: '#D00',
    justifyContent: 'flex-start',
  },
  centerAlignedWithMarginTop: {alignItems: 'center', marginBottom: 32},
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Prediction} from '../../../types/prediction';
import {useGamesStore} from '../../../store/gamesStore';
import {memo} from 'react';

interface PredictionItemProps {
  item: Prediction;
  // Define your props here
}

const PredictionItem: React.FC<PredictionItemProps> = ({item}) => {
  const getGameById = useGamesStore(state => state.getGameById);
  const game = getGameById(item.gameId);
  return (
    <View style={styles.predictionCard}>
      <Text style={styles.gameId}>
        {game ? `${game.homeTeam.name} VS ${game.awayTeam.name}` : item.gameId}
      </Text>
      <View style={styles.predRow}>
        <Text style={styles.predLabel}>Prediction:</Text>
        <Text style={[styles.predResult]}>
          {item.pick === game?.homeTeam.abbreviation
            ? game?.homeTeam.abbreviation
            : game?.awayTeam.abbreviation}
        </Text>
      </View>
      <View style={styles.predRow}>
        <Text style={styles.predLabel}>Result:</Text>
        {item.result ? (
          <Text style={[styles.predResult]}>
            {item.result.charAt(0).toUpperCase() + item.result.slice(1)}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.predRow,
        ]}>
        <View style={[styles.predRow]}>
          <Text style={styles.predLabel}>Buy In:</Text>
          <Text style={[styles.predResult]}>{item.amount}</Text>
        </View>
        {item.payout ? (
          <View style={[styles.predRow, styles.winAmount]}>
            <Text
              style={[
                styles.predResult,
                styles.winAmountText,
                styles.balanceValue,
              ]}>
              {`💰${item.payout}`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  predictionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  balanceValue: {color: '#449000'},
  gameId: {fontWeight: '600', fontSize: 15, marginBottom: 4},
  bold: {fontWeight: '700'},
  predRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
    flexWrap: 'wrap',
  },
  predLabel: {fontSize: 13, color: '#888', marginRight: 4, fontWeight: '500'},
  predResult: {fontSize: 13, fontWeight: 'bold'},
  home: {color: '#2a4cff'}, // Home = blue
  away: {color: '#e47700'}, // Away = orange
  win: {color: '#124800'}, // Win = green
  loss: {color: '#c31a1a'},
  pending: {color: '#e47700'},
  winAmount: {position: 'absolute', bottom: 0, right: 0},
  winAmountText: {textAlign: 'right', fontSize: 32},
});

export default memo(PredictionItem);

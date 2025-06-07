import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Game} from '../../../types/game';
import TeamDetails from './TeamDetail';
import GameTimer from './GameTimer';

interface Props {
  game: Game;
  onPress: (id: string) => void;
}

const GameCard: React.FC<Props> = ({game, onPress}) => {
  const footerText = useMemo(() => {
    return game.status !== 'final' ? `odds: ${game.odds?.spread}` : '';
  }, [game]);

  if (!game) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(game.id)}>
      <View style={styles.marginVertical}>
        <GameTimer
          status={game.status}
          clock={game.clock}
          period={game.period}
          startTime={game.startTime}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.team}>
          <TeamDetails
            team={game.homeTeam}
            favorite={game.odds?.favorite}
            winner={game.winner}
          />
        </View>
        <Text style={styles.vs}>⚔️</Text>
        <View style={styles.team}>
          <TeamDetails
            team={game.awayTeam}
            favorite={game.odds?.favorite}
            winner={game.winner}
          />
        </View>
      </View>
      <View style={styles.marginVertical}>
        <Text style={styles.status}>{footerText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  marginVertical: {
    marginVertical: 8,
  },
  team: {
    alignItems: 'center',
    width: '45%',
    flexGrow: 1,
    marginHorizontal: 8,
    justifyContent: 'flex-start',
  },
  vs: {fontWeight: 'bold', fontSize: 16},
  status: {fontSize: 16, fontWeight: '400', alignSelf: 'center'},
  odds: {fontSize: 12, color: '#999', marginTop: 6},
});

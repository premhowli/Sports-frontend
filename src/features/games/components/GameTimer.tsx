import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GameStatus} from '../../../types/game';
import RunningClock from '../../../shared/components/RunningClock';

interface TeamDetailsProps {
  status: GameStatus;
  clock?: string;
  period?: string;
  startTime?: string | number | Date;
}

const GameTimer: React.FC<TeamDetailsProps> = ({
  status,
  clock,
  startTime,
  period,
}) => {
  return (
    <View>
      {status === 'inProgress' ? (
        <View style={styles.centeredRow}>
          {period && <Text style={styles.headerText}>{`⏰ ${period} - `}</Text>}
          <RunningClock
            clock={clock || '0:00'}
            isActive={true}
            textStyle={styles.headerText}
          />
        </View>
      ) : (
        <View style={styles.centeredRow}>
          <Text style={[styles.status]}>
            {status === 'scheduled' && startTime
              ? `Starts at: ${new Date(startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`
              : 'Ended'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default GameTimer;

const styles = StyleSheet.create({
  centeredRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: '500',
    fontSize: 16,
  },
  status: {fontSize: 16, fontWeight: '400', alignSelf: 'center'},
});

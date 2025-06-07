import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TeamInfo} from '../../../types/game';

interface TeamDetailsProps {
  team: TeamInfo;
  winner?: string;
  favorite?: string;
  contentContainerStyle?: ViewStyle;
}

const TeamDetail: React.FC<TeamDetailsProps> = ({
  team,
  winner,
  favorite,
  contentContainerStyle,
}) => {
  const badgeType = useMemo(
    () =>
      winner === team.abbreviation
        ? 'winner'
        : favorite === team.abbreviation
        ? 'favorite'
        : undefined,
    [favorite, team.abbreviation, winner],
  );
  const badgeView = useMemo(() => {
    return (
      <View>
        {badgeType === 'favorite' ? (
          <Image
            source={require('../../../../assets/favoriteTag.png')}
            style={styles.tag}
          />
        ) : badgeType === 'winner' ? (
          <Text style={styles.tag}>{'🏆'}</Text>
        ) : null}
      </View>
    );
  }, [badgeType]);
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View>
        {
          badgeView
        }
        <Image source={{uri: team.logo}} style={styles.logo} />
      </View>
      {team.record ? <Text>{team.record}</Text> : null}
      <Text style={styles.teamName}>{team.name}</Text>
      <Text>{`${team.score ?? ''}`}</Text>
    </View>
  );
};

export default TeamDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexGrow: 1,
  },
  tag: {
    width: 20,
    height: 20,
    marginTop: 4,
    position: 'absolute',
    left: 10,
    top: -15,
    zIndex: 1,
  },
  teamName: {
    zIndex: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 4,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
});

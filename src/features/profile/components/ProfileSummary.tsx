import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUserStore} from '../../../store/userStore';
import LottieView from 'lottie-react-native';

const ProfileSummary: React.FC = () => {
  const user = useUserStore(state => state.user);
  const balanceRef = useRef<number>(null);
  const lottieRef = useRef<LottieView>(null);
  const [showLottie, setShowLottie] = useState<boolean>(false);

  useEffect(() => {
    const bal = user?.balance ?? null;
    if (bal !== null) {
      if (balanceRef.current !== null && balanceRef.current < bal) {
        setShowLottie(true);
        lottieRef.current?.play();
      }
      balanceRef.current = bal;
    }
  }, [user?.balance]);

  if (!user) {
    return null;
  }
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>
          {user.username.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statLabel}>Wins</Text>
            <Text style={styles.statValue}>{user.stats.wins}</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statLabel}>Losses</Text>
            <Text style={styles.statValue}>{user.stats.losses}</Text>
          </View>
          <View style={[styles.statChip, styles.balanceChip]}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statValue, styles.balanceValue]}>
              💰 {user.balance}
            </Text>
            <LottieView
              ref={lottieRef}
              style={[styles.lottieView, showLottie ? styles.opaque : styles.transparent]}
              onAnimationFinish={() => {
                setShowLottie(false);
              }}
              source={require('../../../../assets/coinSplash.json')}
              autoPlay={true}
              loop={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {height: 1, width: 0},
    elevation: 3,
  },
  avatarContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 18,
    backgroundColor: '#f1f5fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    height: '300%',
    width: '300%',
    position: 'absolute',
    marginTop: -32,
    //opacity: showLottie ? 1 : 0,
  },
  opaque: {
    opacity: 1,
  },
  transparent: {
    opacity: 0,
  },
  avatar: {fontSize: 26, fontWeight: 'bold', color: '#124800'},
  username: {fontSize: 19, fontWeight: '600', color: '#222'},
  statsRow: {flexDirection: 'row', marginTop: 8},
  statChip: {
    backgroundColor: '#f4f6fa',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 12,
    alignItems: 'center',
  },
  statLabel: {fontSize: 12, color: '#888', fontWeight: '500'},
  statValue: {fontSize: 15, fontWeight: '600', color: '#222', marginTop: 1},
  balanceChip: {backgroundColor: '#f8fff0'},
  balanceValue: {color: '#449000'},
});

export default ProfileSummary;

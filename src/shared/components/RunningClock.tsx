import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

// Helper: "03:05" → seconds
function parseClock(clock: string): number {
  if (!clock) {return 0;}
  const [min, sec] = clock.split(':').map(Number);
  return (min ?? 0) * 60 + (sec ?? 0);
}
// Helper: seconds → "03:05"
function formatClock(totalSeconds: number): string {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
}

interface RunningClockProps {
  clock: string; // e.g., "03:05"
  isActive: boolean; // false for paused/completed games
  textStyle?: TextStyle;
}

const RunningClock: React.FC<RunningClockProps> = ({
  clock,
  isActive,
  textStyle,
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(parseClock(clock));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync to new clock prop
  useEffect(() => {
    setCurrentSeconds(parseClock(clock));
    // Reset interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isActive) {
      timerRef.current = setInterval(() => {
        setCurrentSeconds(s => Math.max(s + 1, 0));
      }, 1000);
    }
    // Clean up on unmount or clock prop change
    return () => {
      if (timerRef.current) {clearInterval(timerRef.current);}
    };
  }, [clock, isActive]);

  return (
    <View style={styles.container}>
      <Text style={[textStyle ?? styles.textStyle]}>
        {`${formatClock(currentSeconds)}`}
      </Text>
    </View>
  );
};

export default RunningClock;

const styles = StyleSheet.create({
  textStyle: {color: '#c00', fontWeight: '500', fontSize: 16},
  container: {
    flexDirection: 'row',
  },
});

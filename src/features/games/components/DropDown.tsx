import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

interface DropDownProps {
  statusOption: {
    key: string;
    label: string;
    icon: string;
  }[];
  initialStatus: string;
  onStatusChange: (val: string) => void;
}

// currently only handling portrait view. if later start supporting landscape, further work will be needed
const DropDown: React.FC<DropDownProps> = ({
  statusOption,
  onStatusChange,
  initialStatus,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const buttonRef = useRef<View>(null);
  const [status, setStatus] = useState(initialStatus);
  const currentStatus = statusOption.find(option => option.key === status);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const openDropdown = useCallback(() => {
    // Measure the button position on the screen
    if (buttonRef.current) {
      buttonRef.current.measureInWindow((x, y, width, height) => {
        setButtonLayout({x, y, width, height});
        setDropdownVisible(true);
      });
    }
  }, []);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownButton}
        onPress={openDropdown}
        activeOpacity={0.85}>
        <Text style={styles.dropdownIcon}>{currentStatus?.icon}</Text>
        <Text style={styles.dropdownLabel}>{currentStatus?.label}</Text>
        <Text style={styles.dropdownChevron}>▼</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <Modal
          visible={dropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={StyleSheet.absoluteFill}>
              <View
                style={[
                  styles.dropdownMenu,
                  {
                    top: buttonLayout.y + buttonLayout.height + 8, // gap from dropdown button.
                    left: buttonLayout.x + buttonLayout.width - 170, // adjust 160 to dropdown width + 10 right padding
                  },
                ]}>
                {statusOption.map(option => (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={option.key}
                    style={[
                      styles.dropdownItem,
                      option.key === status && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      onStatusChange(option.key);
                      setStatus(option.key);
                      setDropdownVisible(false);
                    }}>
                    <Text style={styles.dropdownIcon}>{option.icon}</Text>
                    <Text
                      style={[
                        styles.dropdownLabel,
                        option.key === status && styles.selectedDropdownLabel,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    width: '100%',
    borderColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  dropdownIcon: {fontSize: 18, marginRight: 6},
  dropdownLabel: {fontSize: 16, color: '#222', fontWeight: '600'},
  selectedDropdownLabel: {color: '#124800', fontWeight: 'bold'},
  dropdownChevron: {fontSize: 16, marginLeft: 8, color: '#888'},
  dropdownMenu: {
    position: 'absolute',
    top: 24, // just below button
    right: 8,
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 2,
    zIndex: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  dropdownItemSelected: {
    backgroundColor: '#e8f5e9',
  },
});

export default DropDown;

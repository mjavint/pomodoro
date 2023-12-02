import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const options = ['Pomodoro', 'Short Break', 'Long Break']

export default function Header({ currentTime, setCurrentTime, setTime }) {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && { borderColor: 'transparent' },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'white',
    padding: 5,
    marginVertical: 20,
  },
})

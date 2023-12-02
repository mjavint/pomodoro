import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ClickSound from './assets/click.mp3'
import Header from './src/components/Header'
import Timer from './src/components/Timer'

const colors = ['#f7dc6f', '#a2d9ce', '#d7bde2']

export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  function handleButton() {
    playSound()
    setIsActive(!isActive)
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(ClickSound)
    await sound.playAsync()
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity
          onPress={handleButton}
          style={styles.button}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
})

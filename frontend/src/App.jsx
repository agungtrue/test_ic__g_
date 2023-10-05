import { useState } from 'react'
import './App.css'

function App() {

  // default styles or color
  const [styles, setStyles] = useState({
    _1: {
      backgroundColor: 'cornflowerblue'
    },
    _2: {
      backgroundColor: 'crimson'
    },
    _3: {
      backgroundColor: 'darkgoldenrod'
    },
    _4: {
      backgroundColor: 'darkred'
    },
    _5: {
      backgroundColor: 'darkviolet'
    },
    _6: {
      backgroundColor: 'darkcyan'
    },
    _7: {
      backgroundColor: 'darkslategray'
    },
    _8: {
      backgroundColor: 'blueviolet'
    },
    _9: {
      backgroundColor: 'dimgray'
    },
  })

  function handleClick() {
    const newStyles = {} // first create empty object

    // make a keys into array, so we can looping every style
    const currentStyles = Object.keys(styles)
    currentStyles.forEach(colorId => {
      // firs we define a new random color
      const update = { backgroundColor: randomcolor() }
      newStyles[colorId] = update // after that we set into empty object that we have
    })
    
    // update the style state applied new random color
    setStyles((prev) => ({
      ...prev,
      ...newStyles
    }))
  }

  function randomcolor() {
    // first we need to generate a random value and return as a Hex rgb
    const generateValue =  Math.floor(Math.random() * 16777215).toString(16);
    return `#${generateValue}`
}

  return (
    <>
      <div className="wrapper">
        <div className="box _1" style={styles._1} onClick={() => handleClick()}>1</div>
        <div className="box _2" style={styles._2} onClick={() => handleClick()}>2</div>
        <div className="box _3" style={styles._3} onClick={() => handleClick()}>3</div>
        <div className="box _4" style={styles._4} onClick={() => handleClick()}>4</div>
        <div className="box _5" style={styles._5} onClick={() => handleClick()}>5</div>
        <div className="box _6" style={styles._6} onClick={() => handleClick()}>6</div>
        <div className="box _7" style={styles._7} onClick={() => handleClick()}>7</div>
        <div className="box _8" style={styles._8} onClick={() => handleClick()}>8</div>
        <div className="box _9" style={styles._9} onClick={() => handleClick()}>9</div>
      </div>
    </>
  )
}

export default App

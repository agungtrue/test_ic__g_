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
        {Object.keys(styles).map((row, index) => {
          return <div className={`box ${row}`} key={row} style={styles[row]} onClick={() => handleClick()}>{index+1}</div>
        })}
      </div>
    </>
  )
}

export default App

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Destinations from './components/Destinations/Destinations'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Destinations />
      </main>
    </>
  )
}

export default App

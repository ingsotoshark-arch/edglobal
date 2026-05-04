import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ValueProposition from './components/ValueProposition/ValueProposition'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Destinations from './components/Destinations/Destinations'
import Testimonials from './components/Testimonials/Testimonials'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <Destinations />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

export default App

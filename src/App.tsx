import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient' // Ensure this file exists!

function App() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  // 1. Fetch the count from Supabase when the page first loads
  useEffect(() => {
    const fetchInitialCount = async () => {
      const { data, error } = await supabase
        .from('global_counters')
        .select('count')
        .eq('id', 'main-button')
        .single()

      if (error) {
        console.error('Error fetching count:', error.message)
      } else if (data) {
        setCount(data.count)
      }
      setLoading(false)
    }

    fetchInitialCount()
  }, [])

  // 2. The "Handshake" function that talks to your database
  const handleIncrement = async () => {
    console.log("Contacting Supabase...")

    // This calls the SQL function we created in the dashboard
    const { error } = await supabase.rpc('increment_counter', { 
      row_id: 'main-button' 
    })

    if (error) {
      console.error('Database update failed:', error.message)
      alert("Database error: " + error.message)
    } else {
      console.log("Success! Count updated in cloud.")
      // Update the local screen only after the database confirms
      setCount((prev) => prev + 1)
    }
  }

  return (
    <div className="App">
      <h1>Global Clicker</h1>
      <div className="card">
        {loading ? (
          <p>Connecting to database...</p>
        ) : (
          <button onClick={handleIncrement} style={{ fontSize: '2rem', padding: '10px 20px' }}>
            Count is {count}
          </button>
        )}
        <p>
          Clicking this button updates the count <b>permanently</b> for everyone in the world.
        </p>
      </div>
    </div>
  )
}

export default App

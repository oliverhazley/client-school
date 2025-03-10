// dashboard.jsx

// THIS IS A LOOOONG FILE, SO I TRIED TO MAKE THE COMMENTS PRETTY, TO AT LEAST SPLIT IT UP ABIT.
// IT STARTED OFF SMALLER AND SMOOTHER, BUT THEN I GOT CARRIED AWAY WITH ADDING NEW STUFF
// I PLANNED TO SPLIT IT INTO SMALLER COMPONENTS, BUT RAN OUT OF TIME, SORRY !!!!
// HOPEFULLY ITS NOT TOO PAINFUL TO READ

import React, { useEffect, useState } from 'react'
import axios from 'axios'

// UI components + icons from tabs (previous projects)
import {
  Tabs,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button
} from '../ui/tabs'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import {
  Calendar,
  Activity,
  Droplets,
  CircleDot,
  CheckSquare,
  Square,
  Moon,
  Heart,
  Dumbbell,
  FileText
} from 'lucide-react'

import NotificationPopup from './NotificationPopup'


// ----------------------------------------------------
// Helper: format a date (string) to a pretty display
// for charts or listing - made with the help of chatgpt
// ----------------------------------------------------
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// ----------------------------------------------------
// Helper: getLocalYMD => "YYYY-MM-DD" in local time
// - made with the help of chatgpt
// ----------------------------------------------------
function getLocalYMD(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-CA') // typically "YYYY-MM-DD"
}


// ----------------------------------------------------
// Main Dashboard
// ----------------------------------------------------
function Dashboard({ token }) {
  // -----------------------------
  // State variables
  // -----------------------------
  const [entries, setEntries] = useState([])
  const [medications, setMedications] = useState([])
  const [exercises, setExercises] = useState([])
  const [waterLogs, setWaterLogs] = useState([])

  // For toggling "taken" meds
  const [medsTaken, setMedsTaken] = useState({})

  // New Journal form (base values)
  const [sleepHours, setSleepHours] = useState(7)
  const [moodValue, setMoodValue] = useState(5)
  const [weightValue, setWeightValue] = useState(70)
  const [notes, setNotes] = useState('')

  // New Exercise form (base values)
  const [newExercise, setNewExercise] = useState({
    type: '',
    duration: 30,
    intensity: 'low'
  })

  // New Medication form (empty base values)
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: ''
  })

  // Water cups (today) to add
  const [todayCups, setTodayCups] = useState(0)

  // For "show more" toggles
  const [showAllExercises, setShowAllExercises] = useState(false)
  const [showAllEntries, setShowAllEntries] = useState(false)

  // Notifications
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Chart timeframe (daily, weekly, monthly)
  const [timeframe, setTimeframe] = useState('daily')


  // ----------------------------------------------------
  // Fetch data on mount or token changes so we can paint correct info
  // ----------------------------------------------------
  useEffect(() => {
    if (!token) return
    fetchEntries()
    fetchMedications()
    fetchExercises()
    fetchWaterLogs()
    checkDailyReset()
  }, [token])


  // ----------------------------------------------------
  // Reset meds if the day changed (the memory for meds taken is stored in local)
  // ----------------------------------------------------
  function checkDailyReset() {
    const todayLocal = getLocalYMD(new Date()) // e.g. "2025-03-07"
    const storedDate = localStorage.getItem('medsDate')

    if (storedDate !== todayLocal) {
      localStorage.setItem('medsDate', todayLocal)
      setMedsTaken({})
      localStorage.removeItem('medsTaken')
    } else {
      // same day => load existing
      const medsJson = localStorage.getItem('medsTaken')
      if (medsJson) setMedsTaken(JSON.parse(medsJson))
    }
  }


  // ----------------------------------------------------
  // API fetchers // commented out the debugging but left them incase i want to come back to this one day
  // ----------------------------------------------------
  async function fetchEntries() {
    try {
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/entries', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('Entries data =>', res.data)
      setEntries(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error fetching entries:', err)
      setEntries([])
    }
  }

  async function fetchMedications() {
    try {
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/medications', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('Meds data =>', res.data)
      setMedications(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error fetching meds:', err)
    }
  }

  async function fetchExercises() {
    try {
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/exercises', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('Exercises data =>', res.data)
      setExercises(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error fetching exercises:', err)
      setExercises([])
    }
  }

  async function fetchWaterLogs() {
    try {
      const res = await axios.get('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/water', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('Water data =>', res.data)
      setWaterLogs(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error fetching water logs:', err)
      setWaterLogs([])
    }
  }


  // ----------------------------------------------------
  // Medications
  // ----------------------------------------------------
  function toggleMedTaken(medId) {
    setMedsTaken(prev => {
      const wasTaken = !!prev[medId]
      const newState = { ...prev, [medId]: !wasTaken }
      localStorage.setItem('medsTaken', JSON.stringify(newState))
      return newState
    })
  }

  async function addMedication() {
    setSuccessMsg('')
    setErrorMsg('')

    if (!newMed.name || !newMed.dosage) {
      setErrorMsg('Please fill name & dosage')
      return
    }
    try {
      await axios.post('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/medications', newMed, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccessMsg('Medication added.')
      setNewMed({ name: '', dosage: '', frequency: '' })
      fetchMedications()
    } catch (err) {
      console.error('addMedication error', err)
      setErrorMsg('Failed to add medication.')
    }
  }

  async function removeMedication(medId) {
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await axios.delete(`https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/medications/${medId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccessMsg('Medication removed.')
      fetchMedications()
    } catch (err) {
      console.error('removeMedication error', err)
      setErrorMsg('Failed to remove medication.')
    }
  }


  // ----------------------------------------------------
  // Water
  // ----------------------------------------------------
  function incrementWater() { // adds +1 water
    setTodayCups(prev => prev + 1)
  }

  async function saveWaterForToday() {
    if (todayCups <= 0) return
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const todayLocal = getLocalYMD(new Date()) // "YYYY-MM-DD"
      await axios.post(
        'https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/water',
        { consumption_date: todayLocal, cups: todayCups },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccessMsg(`Added ${todayCups} cups for today.`)
      setTodayCups(0)
      fetchWaterLogs()
    } catch (err) {
      console.error('saveWaterForToday error', err)
      setErrorMsg('Failed to save water.')
    }
  }


  // ----------------------------------------------------
  // Exercises
  // ----------------------------------------------------
  async function addExercise() {
    setSuccessMsg('')
    setErrorMsg('')

    if (!newExercise.type) {
      setErrorMsg('Please provide exercise type')
      return
    }
    try {
      const payload = {
        type: newExercise.type,
        duration: newExercise.duration,
        intensity: newExercise.intensity,
        // store local date
        date: getLocalYMD(new Date())
      }
      await axios.post('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/exercises', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccessMsg('Exercise added!')
      setNewExercise({ type: '', duration: 30, intensity: 'low' }) //placeholder values
      fetchExercises()
    } catch (err) {
      console.error('addExercise error', err)
      setErrorMsg('Could not add exercise.')
    }
  }

  // Sort exercises newest-first
  const sortedExercises = [...exercises].sort((a, b) => {
    // compare actual date objects:
    return new Date(b.date) - new Date(a.date)
  })
  // Show either all or the first 3
  const displayExercises = showAllExercises ? sortedExercises : sortedExercises.slice(0, 3)


  // ----------------------------------------------------
  // Journal Entries
  // ----------------------------------------------------
  async function addEntry() {
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await axios.post('https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api/entries',
        {
          entry_date: getLocalYMD(new Date()),
          sleep_hours: sleepHours,
          mood: moodValue.toString(),
          weight: weightValue,
          notes
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccessMsg('Journal entry added!')
      setNotes('')
      fetchEntries()
    } catch (err) {
      console.error('addEntry error', err)
      setErrorMsg('Could not add journal entry.')
    }
  }

  // Sort newest-first
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(b.entry_date) - new Date(a.entry_date)
  })
  const displayedEntries = showAllEntries ? sortedEntries : sortedEntries.slice(0, 5)


  // ----------------------------------------------------
  // fucking DAILY SUMMARY at top of page
  // ----------------------------------------------------
  // Todays local date
  const todayLocal = getLocalYMD(new Date()) // e.g. "2025-03-07"

  // Sum of todays exercise
  const todayExercises = sortedExercises.filter(ex => {
    return getLocalYMD(ex.date) === todayLocal
  })
  const dailyExerciseMinutes = todayExercises.reduce(
    (sum, ex) => sum + (ex.duration || 0), 0
  )

  // Water for today
  const todayWater = waterLogs
    .filter(w => getLocalYMD(w.consumption_date) === todayLocal)
    .reduce((sum, w) => sum + (w.cups || 0), 0)

  // Journal entry for today => sleep, mood, weight, notes
  const todayEntry = sortedEntries.find(e => {
    return getLocalYMD(e.entry_date) === todayLocal
  })
  const todaySleep  = todayEntry ? todayEntry.sleep_hours : '-'
  const todayMood   = todayEntry ? todayEntry.mood         : '-'
  const todayWeight = todayEntry ? todayEntry.weight       : '-'
  const todayNotes  = todayEntry ? todayEntry.notes        : '-'

  // Meds => did user take all?
  // If user has no meds, we show "No meds"
  const medsCount = medications.length
  const medsTakenCount = Object.values(medsTaken).filter(t => t).length
  let medsSummaryText = 'No meds'
  if (medsCount > 0) {
    medsSummaryText = (medsTakenCount === medsCount) ? 'All taken' : 'Remember meds'
  }


  // ----------------------------------------------------
  // CHARTS
  // (Daily/weekly/monthly)  - these were made with the help of chatgpt
  // ----------------------------------------------------
  function getCutoff() {
    const now = new Date()
    const cutoff = new Date()
    if (timeframe === 'daily') {
      cutoff.setDate(now.getDate() - 6)
    } else if (timeframe === 'weekly') {
      cutoff.setDate(now.getDate() - 28)
    } else {
      cutoff.setDate(now.getDate() - 365)
    }
    return cutoff
  }

  // Group water logs by local date for water trends
  function groupWaterByDate(logs) {
    const map = {}
    for (let w of logs) {
      const day = getLocalYMD(w.consumption_date)
      if (!map[day]) map[day] = 0
      map[day] += w.cups
    }
    return Object.keys(map).map(dateKey => ({
      date: formatDate(dateKey),
      cups: map[dateKey]
    }))
  }

  // Water logs in range
  const cutoff = getCutoff()
  const waterInRange = waterLogs.filter(w => {
    return new Date(w.consumption_date) >= cutoff
  })
  const waterChartData = groupWaterByDate(waterInRange).sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  // Entries in range => for mood/sleep/weight charts
  const entriesInRange = sortedEntries.filter(e => {
    return new Date(e.entry_date) >= cutoff
  }).sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date))

  const moodData = entriesInRange.map(e => ({
    date: formatDate(e.entry_date),
    value: e.mood ? parseInt(e.mood, 10) : 5
  }))

  const sleepData = entriesInRange.map(e => ({
    date: formatDate(e.entry_date),
    hours: e.sleep_hours || 0
  }))

  const weightData = entriesInRange.map(e => ({
    date: formatDate(e.entry_date),
    kg: e.weight || 0
  }))


  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* NOTIFICATIONS */}
        <NotificationPopup
          message={successMsg}
          type="success"
          onClose={() => setSuccessMsg('')}
        />
        <NotificationPopup
          message={errorMsg}
          type="error"
          onClose={() => setErrorMsg('')}
        />

        {/* TITLE */}
        <h1 className="text-3xl font-bold">Dashboard</h1>



        {/*



        ---------------  DAILY SUMMARY ------------------



        */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Daily Summary</CardTitle>
            <Calendar className="h-6 w-6 text-violet-500" />
          </CardHeader>

          {/* Horizontal divider */}
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700" />
          </div>
          <CardContent className="space-y-4">

            {/* MEDICATION */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CircleDot className="h-5 w-5 text-purple-500" />
                <span className="text-sm">Medications</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  medsSummaryText === 'All taken'
                    ? 'text-green-500'
                    : medsSummaryText === 'Remember to take'
                    ? 'text-orange-500'
                    : 'text-gray-400'
                }`}
              >
                {medsSummaryText}
              </span>
            </div>

            {/* EXERCISE */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span className="text-sm">Today’s Exercise</span>
              </div>
              <span className="text-sm font-medium text-green-500">
                {dailyExerciseMinutes} mins
              </span>
            </div>

            {/* WATER */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Water Intake</span>
              </div>
              <span className="text-sm font-medium text-blue-400">
                {todayWater} cups
              </span>
            </div>

            {/* SLEEP */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Sleep Hours</span>
              </div>
              <span className="text-sm font-medium">
                {todaySleep}
              </span>
            </div>

            {/* MOOD */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span className="text-sm">Mood</span>
              </div>
              <span className="text-sm font-medium">
                {todayMood}
              </span>
            </div>

            {/* WEIGHT */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Weight</span>
              </div>
              <span className="text-sm font-medium">
                {todayWeight}
              </span>
            </div>

            {/* NOTES */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Today’s Notes</span>
              </div>
              <span className="text-sm font-medium text-gray-200 max-w-[200px] truncate">
                {todayNotes}
              </span>
            </div>
          </CardContent>
        </Card>


        {/*

        ---------------   MEDICATION CARD ---------------

        */}


        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Medications</CardTitle>
            <CircleDot className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent className="space-y-4">
            {medications.map(m => (
              <div
                key={m.medication_id}
                className="flex items-center justify-between bg-slate-700/50 p-2 rounded"
              >
                <div>
                  <p className="text-sm font-medium">
                    {m.name} ({m.dosage})
                  </p>
                  <p className="text-xs text-gray-400">
                    freq: {m.frequency}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMedTaken(m.medication_id)}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {medsTaken[m.medication_id] ? <CheckSquare /> : <Square />}
                  </button>
                  <button
                    onClick={() => removeMedication(m.medication_id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}

            {/* Add med form */}
            <div className="bg-slate-700/50 p-2 rounded">
              <p className="text-sm font-semibold mb-2">Add Medication</p>
              <div className="flex flex-col gap-2">
                <input
                  className="bg-slate-800 p-2 rounded text-sm"
                  placeholder="Name"
                  value={newMed.name}
                  onChange={e => setNewMed({ ...newMed, name: e.target.value })}
                />
                <input
                  className="bg-slate-800 p-2 rounded text-sm"
                  placeholder="Dosage"
                  value={newMed.dosage}
                  onChange={e => setNewMed({ ...newMed, dosage: e.target.value })}
                />
                <input
                  className="bg-slate-800 p-2 rounded text-sm"
                  placeholder="Frequency"
                  value={newMed.frequency}
                  onChange={e => setNewMed({ ...newMed, frequency: e.target.value })}
                />
                <Button onClick={addMedication} className="bg-purple-600">
                  + add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        {/*

        ---------------------- WATER CARD -------------------------

        */}


        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Daily Water</CardTitle>
            <Droplets className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-sm">Cups to add today: {todayCups}</p>
              <Button onClick={incrementWater} className="bg-blue-600">
                + cup
              </Button>
              <Button onClick={saveWaterForToday} className="bg-green-600">
                save
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              (Showing last 7 days below in chart)
            </p>

            {/* Water chart */}
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waterChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                  <XAxis dataKey="date" stroke="#94a3b8"/>
                  <YAxis stroke="#94a3b8"/>
                  <Tooltip
                    contentStyle={{ backgroundColor:'#1e293b', border:'none'}}
                    labelStyle={{ color:'#94a3b8'}}
                  />
                  <Line
                    type="monotone"
                    dataKey="cups"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>


        {/*

        ---------------------  EXERCISES CARD -------------------------

        */}


        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Exercises</CardTitle>
            <Dumbbell className="h-5 w-5 text-green-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent className="space-y-4">
            {displayExercises.map(ex => (
              <div key={ex.exercise_id} className="bg-slate-700/50 p-2 rounded">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{ex.type}</span>
                  <span className="text-xs text-slate-400">
                    {formatDate(ex.date)}
                  </span>
                </div>
                <div className="flex gap-4 text-sm mt-1">
                  <div>duration: {ex.duration} min</div>
                  <div>intensity: {ex.intensity}</div>
                </div>
              </div>
            ))}

            {sortedExercises.length > 3 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllExercises(!showAllExercises)}
                  className="text-blue-400 hover:text-blue-300 underline text-sm"
                >
                  {showAllExercises ? 'show less' : 'show more'}
                </button>
              </div>
            )}

            {/* Add exercise form */}
            <div className="bg-slate-700/50 p-2 rounded">
              <p className="text-sm font-semibold mb-2">Add Exercise</p>
              <div className="flex flex-col gap-2">
                <input
                  className="bg-slate-800 p-2 rounded text-sm"
                  placeholder="Type (e.g. 'Running')"
                  value={newExercise.type}
                  onChange={e => setNewExercise({ ...newExercise, type: e.target.value })}
                />
                <div>
                  <label className="block text-xs mb-1">
                    Duration (mins): {newExercise.duration}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={newExercise.duration}
                    onChange={e => setNewExercise({ ...newExercise, duration: Number(e.target.value) })}
                    className="w-full accent-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Intensity:</label>
                  <div className="flex gap-2">
                    {['low','medium','high'].map(inten => (
                      <button
                        key={inten}
                        onClick={() => setNewExercise({ ...newExercise, intensity: inten })}
                        className={`px-3 py-1 rounded text-sm ${
                          newExercise.intensity === inten
                            ? 'bg-green-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        {inten}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={addExercise} className="bg-green-600">
                  + add exercise
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        {/*

        -------------------  NEW JOURNAL ENTRY ------------------------

         */}


        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">New Journal Entry</CardTitle>
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent className="space-y-4">

            {/* Sleep */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sleep Hours: {sleepHours}
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={sleepHours}
                onChange={e => setSleepHours(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Mood */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Mood (1-10): {moodValue}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={moodValue}
                onChange={e => setMoodValue(Number(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Weight (kg): {weightValue}
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={weightValue}
                onChange={e => setWeightValue(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            {/* Notes */}
            <textarea
              className="w-full bg-slate-800 p-2 rounded text-sm"
              rows={3}
              placeholder="notes about your day..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />

            <Button onClick={addEntry} className="bg-blue-600">
              + add entry
            </Button>
          </CardContent>
        </Card>


        {/*

        ---------------------- PAST DIARY ENTRIES ---------------------------

         */}


        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Past Diary Entries</CardTitle>
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent>
            {displayedEntries.map(e => (
              <div key={e.entry_id} className="bg-slate-700/50 p-3 rounded mb-3">
                <div className="flex justify-between items-center text-sm">
                  <span>{formatDate(e.entry_date)}</span>
                  <span className="text-xs text-gray-400">
                    sleep: {e.sleep_hours}h, mood: {e.mood}, weight: {e.weight}kg
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-300">
                  {e.notes}
                </div>
              </div>
            ))}
            {entries.length > 5 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllEntries(!showAllEntries)}
                  className="text-blue-400 hover:text-blue-300 underline text-sm"
                >
                  {showAllEntries ? 'show less' : 'show more'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>


        {/*

        ----------------------- CHARTS -----------------------

        */}
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList className="flex justify-center bg-slate-800 border-slate-700 my-4">
            <TabsTrigger value="daily" className="data-[state=active]:bg-slate-700">
              daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-slate-700">
              weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-slate-700">
              monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* SLEEP TREND */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sleep Trend</CardTitle>
            <Moon className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                <XAxis dataKey="date" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip
                  contentStyle={{ backgroundColor:'#1e293b', border:'none'}}
                  labelStyle={{ color:'#94a3b8'}}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* MOOD TREND */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Mood Trend</CardTitle>
            <Heart className="h-5 w-5 text-pink-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                <XAxis dataKey="date" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip
                  contentStyle={{ backgroundColor:'#1e293b', border:'none'}}
                  labelStyle={{ color:'#94a3b8'}}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ec4899"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* WEIGHT TREND */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weight Trend</CardTitle>
            <Heart className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <div className="px-6 mb-4">
            <div className="h-px w-full bg-slate-700"/>
          </div>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                <XAxis dataKey="date" stroke="#94a3b8"/>
                <YAxis stroke="#94a3b8"/>
                <Tooltip
                  contentStyle={{ backgroundColor:'#1e293b', border:'none'}}
                  labelStyle={{ color:'#94a3b8'}}
                />
                <Line
                  type="monotone"
                  dataKey="kg"
                  stroke="#f97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard

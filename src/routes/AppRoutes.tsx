import { Routes, Route } from 'react-router-dom'

// Layout
import MainLayout from '../layouts/MainLayout'

// Main Pages
import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'

// Tourist Pages
import Dashboard from '../pages/tourist/Dashboard'
import TripPlanner from '../pages/tourist/TripPlanner'
import HeritageFlow from '../pages/tourist/HeritageFlow'
import KalaConnect from '../pages/tourist/KalaConnect'
import CommunityDiscover from '../pages/tourist/CommunityDiscover'

// Hotel Pages
import HotelDashboard from '../pages/hotel/HotelDashboard'
import GreenStay from '../pages/hotel/GreenStay'

export default function AppRoutes() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Main Application */}
      <Route element={<MainLayout />}>

        {/* Tourist Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Trip Planner */}
        <Route
          path="/trip-planner"
          element={<TripPlanner />}
        />

        {/* Heritage Flow */}
        <Route
          path="/heritage-flow"
          element={<HeritageFlow />}
        />

        {/* KalaConnect */}
        <Route
          path="/kala-connect"
          element={<KalaConnect />}
        />

        {/* Community */}
        <Route
          path="/community"
          element={<CommunityDiscover />}
        />

        {/* Hotel Dashboard */}
        <Route
          path="/hotel"
          element={<HotelDashboard />}
        />

        {/* GreenStay */}
        <Route
          path="/hotel"
          element={<GreenStay title={''} unit={''} dataKey={'water'} data={[]} color={''} />}
        />

      </Route>

    </Routes>
  )
}
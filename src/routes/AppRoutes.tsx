 fix/dependencies
import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from '../components/shared/ProtectedRoute'

import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'

=======
feature/gaurav-hotel
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'

=======
import { Routes, Route } from 'react-router-dom'

// Layout
import MainLayout from '../layouts/MainLayout'

// Main Pages
import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'

// Tourist Pages
main
 main
import Dashboard from '../pages/tourist/Dashboard'
import TripPlanner from '../pages/tourist/TripPlanner'
import HeritageFlow from '../pages/tourist/HeritageFlow'
import KalaConnect from '../pages/tourist/KalaConnect'
 feature/gaurav-hotel
import { CommunityDiscover } from '../pages/tourist/CommunityDiscover'

=======
import CommunityDiscover from '../pages/tourist/CommunityDiscover'

 fix/dependencies
=======
// Hotel Pages
 main
 main
import HotelDashboard from '../pages/hotel/HotelDashboard'
import GreenStay from '../pages/hotel/GreenStay'

export default function AppRoutes() {
  return (
    <Routes>

 feature/gaurav-hotel
      {/* Landing Page */}
      <Route
        path="/"
        element={<Landing />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Main Application Layout */}
      <Route element={<MainLayout />}>

        {/* Tourist Modules */}

=======
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

 fix/dependencies
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute role="tourist" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/heritage-flow" element={<HeritageFlow />} />
          <Route path="/kala-connect" element={<KalaConnect />} />
          <Route path="/community" element={<CommunityDiscover />} />
        </Route>

        <Route element={<ProtectedRoute role="hotel" />}>
          <Route path="/hotel" element={<HotelDashboard />} />
          <Route path="/hotel/greenstay" element={<GreenStay />} />
        </Route>
=======
      {/* Main Application */}
      <Route element={<MainLayout />}>

        {/* Tourist Dashboard */}
main
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

eature/gaurav-hotel
=======
        {/* Trip Planner */}
main
        <Route
          path="/trip-planner"
          element={<TripPlanner />}
        />

 feature/gaurav-hotel
=======
        {/* Heritage Flow */}
 main
        <Route
          path="/heritage-flow"
          element={<HeritageFlow />}
        />

 feature/gaurav-hotel
=======
        {/* KalaConnect */}
 main
        <Route
          path="/kala-connect"
          element={<KalaConnect />}
        />

 feature/gaurav-hotel
=======
        {/* Community */}
 main
        <Route
          path="/community"
          element={<CommunityDiscover />}
        />

 feature/gaurav-hotel
        {/* Hotel Modules */}

=======
        {/* Hotel Dashboard */}
main
        <Route
          path="/hotel"
          element={<HotelDashboard />}
        />

 feature/gaurav-hotel
        <Route
          path="/hotel/greenstay"
          element={<GreenStay />}
=======
        {/* GreenStay */}
        <Route
          path="/hotel"
          element={<GreenStay title={''} unit={''} dataKey={'water'} data={[]} color={''} />}
 main
        />

main
      </Route>

feature/gaurav-hotel
      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
 fix/dependencies
}
=======
}
=======
    </Routes>
  )
}

main
 main

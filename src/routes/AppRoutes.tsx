import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from '../components/shared/ProtectedRoute'

import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'

import Dashboard from '../pages/tourist/Dashboard'
import TripPlanner from '../pages/tourist/TripPlanner'
import HeritageFlow from '../pages/tourist/HeritageFlow'
import KalaConnect from '../pages/tourist/KalaConnect'
import CommunityDiscover from '../pages/tourist/CommunityDiscover'

import HotelDashboard from '../pages/hotel/HotelDashboard'
import GreenStay from '../pages/hotel/GreenStay'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Application Pages */}
      <Route element={<MainLayout />}>
        {/* Tourist Routes */}
        <Route element={<ProtectedRoute role="tourist" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/heritage-flow" element={<HeritageFlow />} />
          <Route path="/kala-connect" element={<KalaConnect />} />
          <Route path="/community" element={<CommunityDiscover />} />
        </Route>

        {/* Hotel Routes */}
        <Route element={<ProtectedRoute role="hotel" />}>
          <Route path="/hotel" element={<HotelDashboard />} />
          <Route path="/hotel/greenstay" element={<GreenStay title={''} unit={''} dataKey={'water'} data={[]} color={''} />} />
        </Route>
      </Route>

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
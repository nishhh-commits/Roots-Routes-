import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
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
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/heritage-flow" element={<HeritageFlow />} />
        <Route path="/kala-connect" element={<KalaConnect />} />
        <Route path="/community" element={<CommunityDiscover />} />
        <Route path="/hotel" element={<HotelDashboard />} />
        <Route path="/hotel/greenstay" element={<GreenStay />} />
      </Route>
    </Routes>
  )
}
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import PhotosPage from './pages/PhotosPage'
import ResumePage from './pages/ResumePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<PhotosPage />} path="photos" />
        <Route element={<ResumePage />} path="resume" />
        <Route element={<AdminPage />} path="admin" />
        <Route element={<Navigate replace to="/resume" />} path="projects" />
        <Route element={<Navigate replace to="/resume" />} path="skills" />
        <Route element={<Navigate replace to="/resume" />} path="experience" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  )
}

export default App

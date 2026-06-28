import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import PhotosPage from './pages/PhotosPage'
import ProjectsPage from './pages/ProjectsPage'
import ResumePage from './pages/ResumePage'
import SkillsPage from './pages/SkillsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<PhotosPage />} path="photos" />
        <Route element={<ResumePage />} path="resume" />
        <Route element={<ProjectsPage />} path="projects" />
        <Route element={<SkillsPage />} path="skills" />
        <Route element={<ExperiencePage />} path="experience" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  )
}

export default App

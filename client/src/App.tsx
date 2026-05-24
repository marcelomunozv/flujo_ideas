import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import BoardPage from './pages/BoardPage'
import ListPage from './pages/ListPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/lista" element={<ListPage />} />
      </Routes>
    </Layout>
  )
}

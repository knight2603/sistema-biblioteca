import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Users from './pages/Users'
import Loans from './pages/Loans'
import BookForm from './pages/BookForm'
import './index.css'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/new" element={<BookForm />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/loans" element={<Loans />} />

                    <Route
                        path="*"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App

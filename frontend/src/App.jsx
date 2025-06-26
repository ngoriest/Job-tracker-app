import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { CategoryProvider } from './context/CategoryContext';
import { TaskProvider } from './context/TaskContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Admin from './pages/dashboard/Admin';
import User from './pages/dashboard/User';
import Applications from './pages/applications/Applications';
import Categories from './pages/categories/Categories';
import Tasks from './pages/tasks/Tasks';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApplicationProvider>
          <CategoryProvider>
            <TaskProvider>
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ProtectedRoute adminOnly>
                            <Admin />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/" element={<Home />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <User />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/applications" 
                        element={
                          <ProtectedRoute>
                            <Applications />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/categories" 
                        element={
                          <ProtectedRoute>
                            <Categories />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/tasks" 
                        element={
                          <ProtectedRoute>
                            <Tasks />
                          </ProtectedRoute>
                        } 
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </TaskProvider>
          </CategoryProvider>
        </ApplicationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
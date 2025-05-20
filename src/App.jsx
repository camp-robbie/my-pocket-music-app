import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'

// 각 화면 컴포넌트 불러오기
import LoginScreen from './components/LoginScreen'
import SearchScreen from './components/SearchScreen'
import ReviewScreen from './components/ReviewScreen'
import WishlistScreen from './components/MyWishlistScreen.jsx'  // 이름은 MyCircleScreen이지만 실제로는 찜 목록 기능
import MusicDetailScreen from './components/MusicDetailScreen.jsx'  // 이름은 ClassDetailScreen이지만 실제로는 MusicDetailScreen 기능
import LikesScreen from './components/LikeScreen.jsx'  // 이름은 JedScreen이지만 실제로는 LikesScreen 기능
import ProfileScreen from './components/ProfileScreen'
import ReviewListScreen from './components/ReviewListScreen'
import AllReviewsScreen from './components/AllReviewsScreen'

// 사용자 인증 컨텍스트 생성
export const AuthContext = createContext();

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트하면서 이전 위치 저장
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// 인증 컨텍스트 사용 훅
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function App() {
  // 로그인 상태를 관리하는 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // 로그인 함수
  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    // 로컬 스토리지의 데이터도 유지할 수 있지만, 로그아웃 시 초기화도 가능
    // localStorage.removeItem('likedReviews');
    // localStorage.removeItem('myMusic');
    // localStorage.removeItem('playlists');
  };

  // 인증 컨텍스트 값
  const authContextValue = {
    isLoggedIn,
    username,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="app-container">
          <div className="app-content">
            <Routes>
              {/* 로그인 화면 */}
              <Route path="/" element={<LoginScreen />} />
              
              {/* 보호된 라우트들 */}
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <SearchScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/review/:classId" 
                element={
                  <ProtectedRoute>
                    <ReviewScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/mycircle" 
                element={
                  <ProtectedRoute>
                    <WishlistScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/music/:id" 
                element={
                  <ProtectedRoute>
                    <MusicDetailScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/music/:musicId/reviews" 
                element={
                  <ProtectedRoute>
                    <ReviewListScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/jed" 
                element={
                  <ProtectedRoute>
                    <LikesScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/allreviews" 
                element={
                  <ProtectedRoute>
                    <AllReviewsScreen />
                  </ProtectedRoute>
                } 
              />
              
              {/* 기본 경로 및 존재하지 않는 경로는 로그인 페이지로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
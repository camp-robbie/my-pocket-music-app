import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMusic, FaHeart, FaSearch, FaUser, FaCog, FaSignOutAlt, FaHeadphones, FaList, FaPen, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import { AuthContext } from '../App';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, logout } = useContext(AuthContext);
  
  // 예시 사용자 데이터
  const [user, setUser] = useState({
    username: username || '내일인호',
    email: 'user@example.com',
    joinDate: '2025-01-15',
    favGenres: ['Pop', 'R&B', 'K-pop'],
    listenedSongs: 42,
    reviews: 7,
    profileImage: '🎧'
  });

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleLogout = () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      // 로그아웃 처리 로직
      logout();
      navigate('/');
    }
  };
  
  const handleSettings = () => {
    alert('설정 기능은 아직 개발 중입니다.');
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="profile-header">
          <div className="back-button" onClick={handleBackClick}>
            <FaArrowLeft />
          </div>
          <div className="profile-title">프로필</div>
          <div className="settings-button" onClick={handleSettings}>
            <FaCog />
          </div>
        </div>
        
        <div className="profile-card">
          <div className="profile-avatar">{user.profileImage}</div>
          <div className="profile-info">
            <h3 className="profile-name">{user.username}</h3>
            <div className="profile-email">{user.email}</div>
            <div className="profile-joined">가입: {user.joinDate}</div>
          </div>
        </div>
        
        <div className="user-stats">
          <div className="stats-card">
            <div className="stats-icon"><FaHeadphones /></div>
            <div className="stats-number">{user.listenedSongs}</div>
            <div className="stats-label">등록한 곡</div>
          </div>
          
          <div className="stats-card">
            <div className="stats-icon"><FaPen /></div>
            <div className="stats-number">{user.reviews}</div>
            <div className="stats-label">작성한 리뷰</div>
          </div>
        </div>
        
        <div className="favorite-genres">
          <h3 className="section-title">선호 장르</h3>
          <div className="genres-list">
            {user.favGenres.map((genre, index) => (
              <div key={index} className="genre-tag">{genre}</div>
            ))}
          </div>
        </div>
        
        <div className="profile-menu">
          <div className="menu-item" onClick={() => handleNavigation('/mycircle')}>
            <div className="menu-icon"><FaMusic /></div>
            <div className="menu-text">내가 찜한 음악</div>
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/jed')}>
            <div className="menu-icon"><FaHeart /></div>
            <div className="menu-text">좋아요한 리뷰</div>
          </div>
          <div className="menu-item" onClick={() => handleNavigation('/search')}>
            <div className="menu-icon"><FaList /></div>
            <div className="menu-text">내 음악</div>
          </div>
          <div className="menu-item" onClick={handleLogout}>
            <div className="menu-icon"><FaSignOutAlt /></div>
            <div className="menu-text">로그아웃</div>
          </div>
        </div>
      </div>
      
      <div className="tab-bar">
        <div className="tab" onClick={() => handleNavigation('/mycircle')}>
          <FaMusic />
        </div>
        <div className="tab" onClick={() => handleNavigation('/jed')}>
          <FaHeart />
        </div>
        <div className="tab" onClick={() => handleNavigation('/search')}>
          <FaSearch />
        </div>
        <div className="tab" onClick={() => handleNavigation('/allreviews')}>
          <FaGlobe />
        </div>
        <div className="tab active" onClick={() => handleNavigation('/profile')}>
          <FaUser />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
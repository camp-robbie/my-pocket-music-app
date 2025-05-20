import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaHeart, FaSearch, FaUser, FaEllipsisH, FaTrash, FaStar, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import { AuthContext } from '../App';

const WishlistScreen = () => {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  // 찜 목록
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  // 리뷰 데이터
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      {
        id: 1,
        musicId: 1,
        userId: 'user123',
        username: 'music_lover',
        rating: 5,
        content: '정말 좋은 노래입니다. 가사도 멜로디도 완벽해요!',
        date: '2025-03-10',
        likes: 24
      },
      {
        id: 2,
        musicId: 2,
        userId: 'melody92',
        username: 'melody92',
        rating: 4,
        content: '신나는 비트가 매력적인 곡이에요. 운동할 때 듣기 좋아요.',
        date: '2025-03-12',
        likes: 15
      },
      {
        id: 3,
        musicId: 4,
        userId: 'k_pop_fan',
        username: 'k_pop_fan',
        rating: 5,
        content: '중독성 있는 멜로디와 퍼포먼스가 인상적인 곡입니다.',
        date: '2025-03-15',
        likes: 32
      }
    ];
  });
  
  // 선택된 음악의 리뷰 보기
  const [selectedMusic, setSelectedMusic] = useState(null);
  
  // 음악 데이터 (실제로는 API에서 가져올 데이터)
  const musicData = [
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', year: '2017', thumbnail: '🎵' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: '2020', thumbnail: '🎧' },
    { id: 3, title: 'Dance The Night', artist: 'Dua Lipa', album: 'Barbie: The Album', year: '2023', thumbnail: '🎶' },
    { id: 4, title: 'Dynamite', artist: 'BTS', album: 'BE', year: '2020', thumbnail: '🎸' },
    { id: 5, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", year: '2022', thumbnail: '🥁' },
    { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', year: '2015', thumbnail: '🎷' },
    { id: 7, title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: '2019', thumbnail: '🎹' },
    { id: 8, title: 'Gangnam Style', artist: 'PSY', album: 'Psy 6 Rules Pt. 1', year: '2012', thumbnail: '🎺' },
  ];
  
  // 찜 목록 저장
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const getWishlistItems = () => {
    return wishlist.map(musicId => 
      musicData.find(music => music.id === musicId)
    ).filter(Boolean); // undefined 제거
  };
  
  const getMusicReviews = (musicId) => {
    return reviews.filter(review => review.musicId === musicId);
  };
  
  const handleMusicClick = (music) => {
    setSelectedMusic(music);
  };
  
  const handleToggleWishlist = (musicId) => {
    if (wishlist.includes(musicId)) {
      // 찜 목록에서 제거
      setWishlist(wishlist.filter(id => id !== musicId));
    } else {
      // 찜 목록에 추가
      setWishlist([...wishlist, musicId]);
    }
  };
  
  const handleRemoveFromWishlist = (musicId) => {
    const confirmed = window.confirm('정말 찜 목록에서 제거하시겠습니까?');
    if (confirmed) {
      setWishlist(wishlist.filter(id => id !== musicId));
    }
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleMenuClick = () => {
    alert('추가 메뉴 기능은 아직 개발 중입니다.');
  };
  
  const handleViewMusicDetail = (id) => {
    navigate(`/music/${id}`);
  };

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-header">
          <div className="screen-title">찜 목록</div>
          <div className="menu-button" onClick={handleMenuClick}>
            <FaEllipsisH />
          </div>
        </div>
        
        {!selectedMusic ? (
          // 찜 목록 화면
          <>
            <div className="wishlist-header">
              <h3 className="section-title">내가 찜한 음악</h3>
            </div>
            
            <div className="wishlist-items">
              {getWishlistItems().map((music) => (
                <div 
                  key={music.id} 
                  className="music-item"
                >
                  <div 
                    className="music-info"
                    onClick={() => handleMusicClick(music)}
                  >
                    <div className="thumbnail">{music.thumbnail}</div>
                    <div className="item-content">
                      <div className="item-title" title={music.title}>{music.title}</div>
                      <div className="item-artist" title={music.artist}>{music.artist}</div>
                      <div className="item-album" title={`${music.album} (${music.year})`}>{music.album} ({music.year})</div>
                    </div>
                  </div>
                  
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveFromWishlist(music.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            {wishlist.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <div className="empty-text">아직 찜한 음악이 없습니다</div>
                <p className="empty-subtext">다른 회원들의 리뷰를 보고 마음에 드는 음악을 찜해보세요!</p>
                <button 
                  className="action-button"
                  onClick={() => handleNavigation('/search')}
                >
                  음악 검색하기
                </button>
              </div>
            )}
          </>
        ) : (
          // 선택된 음악의 리뷰 화면
          <>
            <div className="music-detail-header">
              <button 
                className="back-button"
                onClick={() => setSelectedMusic(null)}
              >
                <FaArrowLeft />
              </button>
              <div className="music-detail-title">{selectedMusic.title} 리뷰</div>
            </div>
            
            <div className="music-preview">
              <div className="thumbnail">{selectedMusic.thumbnail}</div>
              <div className="item-content">
                <div className="item-title">{selectedMusic.title}</div>
                <div className="item-artist">{selectedMusic.artist}</div>
                <div className="item-album">{selectedMusic.album} ({selectedMusic.year})</div>
              </div>
              <button 
                className="action-button view-button"
                onClick={() => handleViewMusicDetail(selectedMusic.id)}
              >
                상세보기
              </button>
            </div>
            
            <div className="music-reviews">
              <h3 className="section-title">회원 리뷰</h3>
              {getMusicReviews(selectedMusic.id).map((review) => (
                <div key={review.id} className="review-item">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-details">
                      <div className="reviewer-name">{review.username}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < review.rating ? 'active' : ''}`}>
                        <FaStar />
                      </span>
                    ))}
                  </div>
                  <div className="review-content">
                    {review.content}
                  </div>
                  <div className="review-actions">
                    <div className="review-likes">
                      <FaHeart /> {review.likes}명이 좋아합니다
                    </div>
                  </div>
                </div>
              ))}
              
              {getMusicReviews(selectedMusic.id).length === 0 && (
                <div className="empty-reviews">
                  <div className="empty-icon">📝</div>
                  <div className="empty-text">아직 리뷰가 없습니다</div>
                  <button 
                    className="action-button"
                    onClick={() => navigate(`/review/${selectedMusic.id}`)}
                  >
                    첫 리뷰 작성하기
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <div className="tab-bar">
        <div className="tab active" onClick={() => handleNavigation('/mycircle')}>
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
        <div className="tab" onClick={() => handleNavigation('/profile')}>
          <FaUser />
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;
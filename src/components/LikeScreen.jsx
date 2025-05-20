import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaHeart, FaSearch, FaUser, FaArrowLeft, FaRegHeart, FaGlobe } from 'react-icons/fa';
import { AuthContext } from '../App';

const LikesScreen = () => {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  // 좋아요한 리뷰 상태
  const [likedReviews, setLikedReviews] = useState(() => {
    const saved = localStorage.getItem('likedReviews');
    return saved ? JSON.parse(saved) : [];
  });
  
  // 리뷰 데이터
  const [reviews, setReviews] = useState([]);
  
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
  
  // 리뷰 데이터 생성
  useEffect(() => {
    // 예시 리뷰 데이터
    const reviewsData = [
      {
        id: 101,
        musicId: 1,
        userId: 'user1',
        username: '음악애호가',
        content: `Shape of You는 정말 인상적인 곡입니다! Ed Sheeran의 목소리가 매력적이고 멜로디도 귀에 잘 들어옵니다.`,
        rating: 5,
        date: '2025-04-15',
        likes: 12,
        comments: [
          { id: 201, userId: 'user2', username: '멜로디마스터', content: '저도 동감합니다! 정말 좋은 곡이죠.', date: '2025-04-16' },
          { id: 202, userId: 'user3', username: '리듬킹', content: '특히 후렴구가 매력적인 것 같아요.', date: '2025-04-17' }
        ]
      },
      {
        id: 102,
        musicId: 1,
        userId: 'user4',
        username: '음악평론가',
        content: `Ed Sheeran의 작품 중에는 중간 정도라고 생각합니다. 그래도 들을만한 곡이긴 합니다.`,
        rating: 3,
        date: '2025-04-10',
        likes: 5,
        comments: [
          { id: 203, userId: 'user5', username: '소리지기', content: '저는 오히려 이 앨범의 다른 곡들보다 이 곡이 가장 좋았어요.', date: '2025-04-11' }
        ]
      },
      {
        id: 103,
        musicId: 2,
        userId: 'user6',
        username: '80년대팬',
        content: `Blinding Lights는 80년대 신스웨이브에서 영감을 받은 현대적인 해석이 돋보이는 곡입니다. The Weeknd의 목소리와 잘 어울려요.`,
        rating: 5,
        date: '2025-03-22',
        likes: 18,
        comments: []
      },
      {
        id: 104,
        musicId: 3,
        userId: 'user7',
        username: '댄스매니아',
        content: `Dance The Night는 Barbie 영화의 분위기를 완벽하게 담아낸 곡이에요. 무대에서 춤추고 싶게 만드는 활기찬 비트가 매력적입니다.`,
        rating: 4,
        date: '2025-04-05',
        likes: 9,
        comments: []
      },
      {
        id: 105,
        musicId: 4,
        userId: 'user8',
        username: 'K팝러버',
        content: `BTS의 Dynamite는 밝고 경쾌한 디스코 팝 사운드로 기분을 좋게 만들어주는 곡입니다. 중독성 있는 노래!`,
        rating: 5,
        date: '2025-03-18',
        likes: 25,
        comments: []
      }
    ];
    
    setReviews(reviewsData);
  }, []);
  
  // 좋아요한 리뷰만 필터링
  const likedReviewsData = reviews.filter(review => likedReviews.includes(review.id));
  
  // 해당 음악 정보 가져오기
  const getMusicInfo = (musicId) => {
    return musicData.find(music => music.id === musicId);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleReviewClick = (musicId) => {
    navigate(`/music/${musicId}`);
  };
  
  const handleUnlike = (reviewId) => {
    // 좋아요 제거
    const updatedLikes = likedReviews.filter(id => id !== reviewId);
    setLikedReviews(updatedLikes);
    
    // 로컬 스토리지 업데이트
    localStorage.setItem('likedReviews', JSON.stringify(updatedLikes));
    
    // 리뷰 데이터 업데이트
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      const allReviews = JSON.parse(savedReviews);
      const reviewIndex = allReviews.findIndex(r => r.id === reviewId);
      
      if (reviewIndex !== -1) {
        const updatedReview = { 
          ...allReviews[reviewIndex],
          likes: Math.max(0, allReviews[reviewIndex].likes - 1)
        };
        
        allReviews[reviewIndex] = updatedReview;
        localStorage.setItem('reviews', JSON.stringify(allReviews));
        
        // 현재 리뷰 목록도 업데이트
        setReviews(reviews.map(r => 
          r.id === reviewId ? { ...r, likes: Math.max(0, r.likes - 1) } : r
        ));
      }
    }
  };
  
  // 별점 표시 함수
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-header">
          <div className="screen-title">좋아요한 리뷰</div>
        </div>
        
        <div className="likes-list">
          {likedReviewsData.length > 0 ? (
            likedReviewsData.map((review) => {
              const music = getMusicInfo(review.musicId);
              return (
                <div key={review.id} className="liked-review-item">
                  <div 
                    className="review-music-info"
                    onClick={() => handleReviewClick(review.musicId)}
                  >
                    <div className="thumbnail">{music?.thumbnail}</div>
                    <div className="music-info">
                      <div className="music-title">{music?.title}</div>
                      <div className="music-artist">{music?.artist}</div>
                    </div>
                  </div>
                  
                  <div className="review-content">
                    <div className="reviewer-info">
                      <span className="reviewer-name">{review.username}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                    
                    <div className="review-text">
                      {review.content.length > 100 
                        ? `${review.content.substring(0, 100)}...` 
                        : review.content
                      }
                    </div>
                    
                    <div className="review-stats">
                      <div className="review-likes">
                        <FaHeart className="heart-icon active" />
                        <span>{review.likes}</span>
                      </div>
                      <div className="review-comments">
                        <span>댓글 {review.comments.length}개</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="unlike-button"
                    onClick={() => handleUnlike(review.id)}
                  >
                    <FaRegHeart />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">❤️</div>
              <div className="empty-text">아직 좋아요한 리뷰가 없습니다</div>
              <p className="empty-subtext">음악 페이지에서 리뷰에 좋아요를 눌러보세요!</p>
              <button 
                className="action-button"
                onClick={() => handleNavigation('/search')}
              >
                음악 검색하기
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="tab-bar">
        <div className="tab" onClick={() => handleNavigation('/mycircle')}>
          <FaMusic />
        </div>
        <div className="tab active" onClick={() => handleNavigation('/jed')}>
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

export default LikesScreen;
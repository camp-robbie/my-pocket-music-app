import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaRegStar, FaBook } from 'react-icons/fa';
import { AuthContext } from '../App';

const ReviewScreen = () => {
  const { classId } = useParams(); // URL 파라미터는 그대로 유지하되 내부에서는 musicId로 처리
  const musicId = classId;
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [music, setMusic] = useState(null);
  
  // 음악 정보 로드
  useEffect(() => {
    // 예시 데이터 - 실제로는 API에서 데이터를 가져와야 합니다
    const musicData = [
      { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', year: '2017', thumbnail: '🎵' },
      { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: '2020', thumbnail: '🎧' },
      { id: 3, title: 'Dance The Night', artist: 'Dua Lipa', album: 'Barbie: The Album', year: '2023', thumbnail: '🎶' },
      { id: 4, title: 'Dynamite', artist: 'BTS', album: 'BE', year: '2020', thumbnail: '🎸' },
      { id: 5, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", year: '2022', thumbnail: '🥁' },
      { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', year: '2015', thumbnail: '🎷' },
      { id: 7, title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: '2019', thumbnail: '🎹' },
      { id: 8, title: 'Gangnam Style', artist: 'PSY', album: 'Psy 6 Rules Pt. 1', year: '2012', thumbnail: '🎺' },
      // Kenshi Yonezu의 곡 추가
      { id: 9, title: 'Lemon', artist: 'Kenshi Yonezu', album: 'Lemon/Cranberry & Pancake', year: '2018', thumbnail: '🍋' },
      { id: 10, title: 'KICK BACK', artist: 'Kenshi Yonezu', album: 'KICK BACK', year: '2022', thumbnail: '👊' },
      { id: 11, title: 'Pale Blue', artist: 'Kenshi Yonezu', album: 'Pale Blue', year: '2021', thumbnail: '💙' },
      { id: 12, title: 'Flamingo', artist: 'Kenshi Yonezu', album: 'Flamingo / TEENAGE RIOT', year: '2018', thumbnail: '🦩' },
      { id: 13, title: 'Paprika', artist: 'Kenshi Yonezu', album: 'Paprika', year: '2020', thumbnail: '🌶️' },
    ];
    
    const foundMusic = musicData.find(m => m.id === parseInt(musicId));
    if (foundMusic) {
      setMusic(foundMusic);
      setTitle(`${foundMusic.title} 감상 노트`); // 제목 수정
    }
  }, [musicId]);
  
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  
  const handleSaveClick = () => {
    if (!content || rating === 0) {
      alert('내용을 입력하고 별점을 선택해주세요.');
      return;
    }
    
    // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    
    // 리뷰 ID 생성
    const reviewId = Date.now();
    
    // 감상 노트 저장 로직
    const newReview = {
      id: reviewId, // 임시 ID
      musicId: parseInt(musicId),
      userId: username, // 현재 로그인한 사용자 ID 저장
      username: username, // 사용자 이름 저장
      content,
      rating,
      date: formattedDate,
      likes: 0,
      comments: []
    };
    
    // 기존 감상 노트 목록 가져오기
    const savedReviews = localStorage.getItem('reviews');
    const reviews = savedReviews ? JSON.parse(savedReviews) : [];
    
    // 새 감상 노트 추가
    const updatedReviews = [...reviews, newReview];
    
    // 로컬 스토리지에 저장
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    
    console.log('감상 노트 저장:', newReview);
    
    // 감상 노트 저장 후 음악 상세 페이지로 이동
    alert('감상 노트가 저장되었습니다.');
    navigate(`/music/${musicId}`);
  };
  
  if (!music) {
    return (
      <div className="screen-container">
        <div className="phone-frame">
          <div className="loading">음악 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-header">
          <div className="back-button" onClick={handleBackClick}>
            <FaArrowLeft />
          </div>
          <div className="screen-title"><FaBook className="title-icon" /> 감상 노트 작성</div>
          <div className="save-button" onClick={handleSaveClick}>
            저장
          </div>
        </div>
        
        <div className="music-preview">
          <div className="music-thumbnail">{music.thumbnail}</div>
          <div className="music-info">
            <div className="music-title">{music.title}</div>
            <div className="music-artist">{music.artist}</div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">별점</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar 
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              />
            ))}
            {rating > 0 && (
              <span className="rating-text">{rating}점</span>
            )}
          </div>
          <div className="rating-labels">
            <span>별로예요</span>
            <span>최고예요!</span>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">감상 내용</label>
          <textarea 
            className="review-textarea" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="이 음악을 듣고 느낀 감정이나 생각을 자유롭게 작성해보세요"
          ></textarea>
        </div>
        
        <div className="review-tips">
          <h4 className="tips-title">감상 노트 작성 팁</h4>
          <ul className="tips-list">
            <li>음악의 가사, 멜로디, 분위기에 대해 언급해보세요.</li>
            <li>이 음악을 들으면 떠오르는 감정이나 장면이 있나요?</li>
            <li>언제 들으면 좋을지, 어떤 상황에 어울리는지 생각해보세요.</li>
            <li>음악이 불러일으키는 개인적인 기억이나 추억이 있나요?</li>
          </ul>
        </div>
        
        <button 
          className="action-button review-submit"
          onClick={handleSaveClick}
        >
          감상 노트 저장하기
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;
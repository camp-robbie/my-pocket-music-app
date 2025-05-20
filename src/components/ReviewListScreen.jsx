import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaRegStar, FaHeart, FaRegHeart, FaComment, FaBook } from 'react-icons/fa';
import { AuthContext } from '../App';

const ReviewListScreen = () => {
  const { musicId } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  // 음악 정보 상태
  const [music, setMusic] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 댓글 입력 상태
  const [commentText, setCommentText] = useState('');
  const [activeReviewId, setActiveReviewId] = useState(null);
  
  // 좋아요 상태 관리
  const [likedReviews, setLikedReviews] = useState(() => {
    const saved = localStorage.getItem('likedReviews');
    return saved ? JSON.parse(saved) : [];
  });
  
  // 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      // 음악 데이터 로드
      const musicData = [
        { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', year: '2017', thumbnail: '🎵' },
        { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: '2020', thumbnail: '🎧' },
        { id: 3, title: 'Dance The Night', artist: 'Dua Lipa', album: 'Barbie: The Album', year: '2023', thumbnail: '🎶' },
        { id: 4, title: 'Dynamite', artist: 'BTS', album: 'BE', year: '2020', thumbnail: '🎸' },
        { id: 5, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", year: '2022', thumbnail: '🥁' },
        { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', year: '2015', thumbnail: '🎷' },
        { id: 7, title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: '2019', thumbnail: '🎹' },
        { id: 8, title: 'Gangnam Style', artist: 'PSY', album: 'Psy 6 Rules Pt. 1', year: '2012', thumbnail: '🎺' },
        // Kenshi Yonezu의 곡 상세 정보
        { id: 9, title: 'Lemon', artist: 'Kenshi Yonezu', album: 'Lemon/Cranberry & Pancake', year: '2018', thumbnail: '🍋' },
        { id: 10, title: 'KICK BACK', artist: 'Kenshi Yonezu', album: 'KICK BACK', year: '2022', thumbnail: '👊' },
        { id: 11, title: 'Pale Blue', artist: 'Kenshi Yonezu', album: 'Pale Blue', year: '2021', thumbnail: '💙' },
        { id: 12, title: 'Flamingo', artist: 'Kenshi Yonezu', album: 'Flamingo / TEENAGE RIOT', year: '2018', thumbnail: '🦩' },
        { id: 13, title: 'Paprika', artist: 'Kenshi Yonezu', album: 'Paprika', year: '2020', thumbnail: '🌶️' },
      ];
      
      const foundMusic = musicData.find(m => m.id === parseInt(musicId));
      setMusic(foundMusic);
      
      // 저장된 실제 리뷰 가져오기
      const savedReviews = localStorage.getItem('reviews');
      let userReviews = [];
      
      if (savedReviews) {
        const allReviews = JSON.parse(savedReviews);
        userReviews = allReviews.filter(review => review.musicId === parseInt(musicId));
      }
      
      // 더미 리뷰 데이터 추가 (현재 곡에 대한 리뷰)
      const dummyReviews = generateDummyReviews(foundMusic, parseInt(musicId));
      
      // 실제 사용자 리뷰와 더미 리뷰 합치기
      const allReviews = [...userReviews, ...dummyReviews];
      
      // 중복 ID 제거 (실제 사용자가 작성한 리뷰 우선)
      const uniqueReviews = [];
      const reviewIds = new Set();
      
      allReviews.forEach(review => {
        if (!reviewIds.has(review.id)) {
          reviewIds.add(review.id);
          uniqueReviews.push(review);
        }
      });
      
      // 날짜 기준 내림차순 정렬
      uniqueReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setReviews(uniqueReviews);
      setLoading(false);
    };
    
    loadData();
  }, [musicId]);
  
  // 더미 리뷰 데이터 생성 함수
  const generateDummyReviews = (music, musicId) => {
    if (!music) return [];
    
    const reviewers = [
      { userId: 'user1', username: '음악애호가' },
      { userId: 'user2', username: '멜로디마스터' },
      { userId: 'user3', username: '리듬킹' },
      { userId: 'user4', username: 'K팝러버' },
      { userId: 'user5', username: '음악비평가' },
      { userId: 'user6', username: '애니팬' },
      { userId: 'jpopfan', username: 'J-Pop매니아' },
      { userId: 'musiccritic', username: '음악평론가' }
    ];
    
    // 다양한 리뷰 내용
    const reviewContents = [
      `${music.title}는 정말 인상적인 곡입니다! ${music.artist}의 목소리가 매력적이고 멜로디도 귀에 잘 들어옵니다.`,
      `${music.title}를 처음 들었을 때부터 마음에 들었어요. 특히 후렴구가 정말 중독성 있습니다.`,
      `${music.artist}의 작품 중에서도 ${music.title}는 특별한 매력이 있는 곡이에요. 매번 들을 때마다 새로운 느낌이 들어요.`,
      `${music.title}의 프로덕션 퀄리티는 정말 놀랍습니다. ${music.artist}의 음악적 재능이 드러나는 곡이에요.`,
      `${music.artist}의 가창력이 돋보이는 곡입니다. ${music.title}는 감성을 잘 전달합니다.`,
      `${music.title}의 멜로디와 가사의 조화가 아주 좋습니다. 여러 번 들어도 질리지 않아요.`,
      `${music.title}를 들으면 항상 기분이 좋아져요! ${music.artist}의 에너지가 넘치는 곡입니다.`,
      `${music.title}는 ${music.artist}의 음악적 구성이 탄탄하고 진정성이 느껴지는 작품입니다.`,
      `${music.title}의 중독성 있는 비트와 캐치한 후렴구가 특징인 명곡입니다.`,
      `${music.title}는 ${music.artist}의 대표곡 중 하나로, 독특한 개성이 잘 드러난 작품입니다.`
    ];
    
    // 댓글 내용
    const commentContents = [
      "정말 공감합니다! 저도 이 곡 좋아해요.",
      "좋은 리뷰 감사합니다.",
      "이 곡의 매력을 잘 표현했네요.",
      "저도 비슷한 생각이었어요.",
      "이 곡 추천해주셔서 감사합니다.",
      "다른 관점에서 보게 되었네요.",
      "앨범의 다른 곡들도 들어보세요.",
      "리뷰 잘 읽었습니다."
    ];
    
    // 더미 리뷰 생성
    const dummyReviews = [];
    const reviewCount = musicId % 2 === 0 ? 3 : 4; // 짝수면 3개, 홀수면 4개 리뷰
    
    // 특정 사용자가 이미 리뷰를 작성했는지 추적
    const usedReviewers = new Set();
    
    for (let i = 0; i < reviewCount; i++) {
      // 중복되지 않는 리뷰어 선택
      let reviewerIndex;
      do {
        reviewerIndex = Math.floor(Math.random() * reviewers.length);
      } while (usedReviewers.has(reviewerIndex));
      
      usedReviewers.add(reviewerIndex);
      const reviewer = reviewers[reviewerIndex];
      
      // 내용 선택
      const contentIndex = Math.floor(Math.random() * reviewContents.length);
      const content = reviewContents[contentIndex];
      
      // 날짜는 최근 30일 내로 랜덤 생성
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      const dateStr = date.toISOString().slice(0, 10);
      
      // 별점은 3-5점 랜덤
      const rating = Math.floor(Math.random() * 3) + 3;
      
      // 좋아요 수는 0-30개 랜덤
      const likes = Math.floor(Math.random() * 31);
      
      // 댓글 생성 (0-3개 랜덤)
      const commentsCount = Math.floor(Math.random() * 4);
      const comments = [];
      
      for (let j = 0; j < commentsCount; j++) {
        // 랜덤 댓글 작성자 (리뷰 작성자와 다른 사람)
        let commenterIndex;
        do {
          commenterIndex = Math.floor(Math.random() * reviewers.length);
        } while (commenterIndex === reviewerIndex);
        
        const commenter = reviewers[commenterIndex];
        
        // 랜덤 댓글 내용
        const commentIndex = Math.floor(Math.random() * commentContents.length);
        const commentContent = commentContents[commentIndex];
        
        // 댓글 날짜는 리뷰 날짜 이후로 설정
        const commentDate = new Date(date);
        commentDate.setDate(commentDate.getDate() + Math.floor(Math.random() * 7) + 1);
        const commentDateStr = commentDate.toISOString().slice(0, 10);
        
        comments.push({
          id: 1000 + i * 10 + j,
          userId: commenter.userId,
          username: commenter.username,
          content: commentContent,
          date: commentDateStr
        });
      }
      
      // 리뷰 ID는 음악 ID와 리뷰어 ID를 조합하여 생성 (중복 방지)
      const reviewId = parseInt(`${musicId}${i + 1}${reviewer.userId.charCodeAt(0)}`);
      
      dummyReviews.push({
        id: reviewId,
        musicId: parseInt(musicId),
        userId: reviewer.userId,
        username: reviewer.username,
        content,
        rating,
        date: dateStr,
        likes,
        comments
      });
    }
    
    return dummyReviews;
  };
  
  // 좋아요 상태 저장
  useEffect(() => {
    localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
  }, [likedReviews]);
  
  const handleBackClick = () => {
    navigate(`/music/${musicId}`, { replace: true }); // 음악 상세 페이지로 돌아가기
  };
  
  const handleWriteReview = () => {
    navigate(`/review/${musicId}`); // 감상 노트 작성 페이지로 이동
  };
  
  const handleLikeReview = (reviewId) => {
    let updatedLikes = [...likedReviews];
    let updatedReviews = [...reviews];
    
    // 리뷰 찾기
    const reviewIndex = updatedReviews.findIndex(review => review.id === reviewId);
    if (reviewIndex === -1) return;
    
    const review = { ...updatedReviews[reviewIndex] };
    
    if (likedReviews.includes(reviewId)) {
      // 이미 좋아요 한 리뷰면 제거
      updatedLikes = updatedLikes.filter(id => id !== reviewId);
      // 리뷰의 좋아요 수 감소 (0 미만으로 내려가지 않도록)
      review.likes = Math.max(0, review.likes - 1);
    } else {
      // 좋아요 추가
      updatedLikes.push(reviewId);
      // 리뷰의 좋아요 수 증가
      review.likes = (review.likes || 0) + 1;
    }
    
    // 리뷰 배열 업데이트
    updatedReviews[reviewIndex] = review;
    
    // 상태 업데이트
    setLikedReviews(updatedLikes);
    setReviews(updatedReviews);
    
    // 로컬 스토리지에 좋아요 상태 저장
    localStorage.setItem('likedReviews', JSON.stringify(updatedLikes));
    
    // 로컬 스토리지에 업데이트된 리뷰 저장
    // 로컬 스토리지의 기존 리뷰를 가져옴
    const savedReviews = localStorage.getItem('reviews');
    let allReviews = savedReviews ? JSON.parse(savedReviews) : [];
    
    // 현재 리뷰 업데이트
    const allReviewIndex = allReviews.findIndex(r => r.id === reviewId);
    if (allReviewIndex !== -1) {
      allReviews[allReviewIndex] = review;
      localStorage.setItem('reviews', JSON.stringify(allReviews));
    }
  };
  
  const handleAddComment = (reviewId) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(), // 임시 ID
      userId: 'currentUser',
      username,
      content: commentText,
      date: new Date().toISOString().slice(0, 10)
    };
    
    setReviews(reviews.map(review => 
      review.id === reviewId ? 
        { ...review, comments: [...review.comments, newComment] } 
        : review
    ));
    
    setCommentText('');
    setActiveReviewId(null);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star active" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };
  
  if (loading) {
    return (
      <div className="screen-container">
        <div className="phone-frame">
          <div className="loading">리뷰 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }
  
  if (!music) {
    return (
      <div className="screen-container">
        <div className="phone-frame">
          <div className="error-message">음악을 찾을 수 없습니다.</div>
          <button className="action-button" onClick={handleBackClick}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 내 리뷰만 필터링
  const myReviews = reviews.filter(review => review.username === username);
  // 다른 사용자 리뷰 필터링
  const otherReviews = reviews.filter(review => review.username !== username);

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-header">
          <div className="back-button" onClick={handleBackClick}>
            <FaArrowLeft />
          </div>
          <div className="screen-title">감상 노트</div>
          <div className="placeholder-div"></div>
        </div>
        
        <div className="music-preview">
          <div className="music-thumbnail">{music.thumbnail}</div>
          <div className="music-info">
            <div className="music-title" title={music.title}>{music.title}</div>
            <div className="music-artist" title={music.artist}>{music.artist}</div>
            <div className="music-album" title={music.album}>{music.album}</div>
          </div>
        </div>
        
        {/* 내 감상 노트 섹션 */}
        <div className="review-list-header">
          <h3 className="section-title"><FaBook className="section-icon" /> 내 감상 노트 ({myReviews.length})</h3>
          <button className="action-button write-review-button" onClick={handleWriteReview}>
            감상 작성
          </button>
        </div>
        
        <div className="reviews-list">
          {myReviews.length > 0 ? (
            myReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.username.charAt(0)}</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.username} (나)</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                
                <div className="review-content">
                  {review.content}
                </div>
                
                <div className="review-actions">
                  <button 
                    className={`like-button ${likedReviews.includes(review.id) ? 'liked' : ''}`}
                    onClick={() => handleLikeReview(review.id)}
                  >
                    {likedReviews.includes(review.id) ? <FaHeart /> : <FaRegHeart />}
                    <span>{review.likes}</span>
                  </button>
                  
                  <button 
                    className="comment-button"
                    onClick={() => setActiveReviewId(activeReviewId === review.id ? null : review.id)}
                  >
                    <FaComment />
                    <span>{review.comments.length}</span>
                  </button>
                </div>
                
                {review.comments.length > 0 && (
                  <div className="comments-list">
                    {review.comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-author">{comment.username}</div>
                        <div className="comment-content">{comment.content}</div>
                        <div className="comment-date">{comment.date}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeReviewId === review.id && (
                  <div className="comment-form">
                    <textarea
                      className="comment-input"
                      placeholder="댓글을 입력하세요..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button 
                      className="comment-submit"
                      onClick={() => handleAddComment(review.id)}
                    >
                      댓글 달기
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-reviews">
              <div className="empty-text">아직 작성한 감상 노트가 없습니다.</div>
              <button 
                className="action-button"
                onClick={handleWriteReview}
              >
                첫 감상 작성하기
              </button>
            </div>
          )}
        </div>
        
        {/* 다른 사용자 감상 노트 섹션 */}
        <div className="review-list-header">
          <h3 className="section-title">다른 사용자의 감상 노트 ({otherReviews.length})</h3>
        </div>
        
        <div className="reviews-list" style={{ marginBottom: '60px' }}>
          {otherReviews.length > 0 ? (
            otherReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">{review.username.charAt(0)}</div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.username}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                
                <div className="review-content">
                  {review.content}
                </div>
                
                <div className="review-actions">
                  <button 
                    className={`like-button ${likedReviews.includes(review.id) ? 'liked' : ''}`}
                    onClick={() => handleLikeReview(review.id)}
                  >
                    {likedReviews.includes(review.id) ? <FaHeart /> : <FaRegHeart />}
                    <span>{review.likes}</span>
                  </button>
                  
                  <button 
                    className="comment-button"
                    onClick={() => setActiveReviewId(activeReviewId === review.id ? null : review.id)}
                  >
                    <FaComment />
                    <span>{review.comments.length}</span>
                  </button>
                </div>
                
                {review.comments.length > 0 && (
                  <div className="comments-list">
                    {review.comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-author">
                          {comment.username}
                          {comment.username === username && <span> (나)</span>}
                        </div>
                        <div className="comment-content">{comment.content}</div>
                        <div className="comment-date">{comment.date}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeReviewId === review.id && (
                  <div className="comment-form">
                    <textarea
                      className="comment-input"
                      placeholder="댓글을 입력하세요..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button 
                      className="comment-submit"
                      onClick={() => handleAddComment(review.id)}
                    >
                      댓글 달기
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-reviews">
              <div className="empty-text">아직 다른 사용자의 감상 노트가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewListScreen;
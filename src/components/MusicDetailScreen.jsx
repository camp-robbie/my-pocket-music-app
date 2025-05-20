import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisH, FaStar, FaRegStar, FaHeart, FaRegHeart, FaPlay, FaPause, FaComment, FaChevronRight, FaBook } from 'react-icons/fa';
import { AuthContext } from '../App';

const MusicDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  // 음악 정보 상태
  const [music, setMusic] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 재생 진행 상태
  const [currentTime, setCurrentTime] = useState('0:00');
  const [progressPercent, setProgressPercent] = useState(0);
  const progressIntervalRef = useRef(null);
  
  // 댓글 입력 상태
  const [commentText, setCommentText] = useState('');
  const [activeReviewId, setActiveReviewId] = useState(null);
  
  // 좋아요 상태 관리
  const [likedReviews, setLikedReviews] = useState(() => {
    const saved = localStorage.getItem('likedReviews');
    return saved ? JSON.parse(saved) : [];
  });
  
  // 예시 데이터 - 실제로는 API에서 데이터를 가져와야 합니다
  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const musicData = [
        { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', year: '2017', thumbnail: '🎵', 
          genre: 'Pop', duration: '3:54', releaseDate: '2017-01-06' },
        { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: '2020', thumbnail: '🎧',
          genre: 'Synthwave/R&B', duration: '3:20', releaseDate: '2019-11-29' },
        { id: 3, title: 'Dance The Night', artist: 'Dua Lipa', album: 'Barbie: The Album', year: '2023', thumbnail: '🎶',
          genre: 'Disco/Pop', duration: '2:57', releaseDate: '2023-05-25' },
        { id: 4, title: 'Dynamite', artist: 'BTS', album: 'BE', year: '2020', thumbnail: '🎸',
          genre: 'Disco-pop', duration: '3:19', releaseDate: '2020-08-21' },
        { id: 5, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", year: '2022', thumbnail: '🥁',
          genre: 'Synth-pop', duration: '2:47', releaseDate: '2022-04-01' },
        { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', year: '2015', thumbnail: '🎷',
          genre: 'Funk/R&B', duration: '4:30', releaseDate: '2014-11-10' },
        { id: 7, title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: '2019', thumbnail: '🎹',
          genre: 'Electropop', duration: '3:14', releaseDate: '2019-03-29' },
        { id: 8, title: 'Gangnam Style', artist: 'PSY', album: 'Psy 6 Rules Pt. 1', year: '2012', thumbnail: '🎺',
          genre: 'K-pop/Dance', duration: '3:39', releaseDate: '2012-07-15' },
        // Kenshi Yonezu의 곡 상세 정보
        { id: 9, title: 'Lemon', artist: 'Kenshi Yonezu', album: 'Lemon/Cranberry & Pancake', year: '2018', thumbnail: '🍋', 
          genre: 'J-Pop/Electronic', duration: '4:16', releaseDate: '2018-03-14',
          description: '일본 드라마 「언내추럴」의 주제곡으로 사용되었으며, 일본 내에서 대히트를 기록한 곡입니다. 이 곡은 Yonezu의 대표곡 중 하나로, 그의 특유의 비트와 목소리가 조화롭게 어우러져 있습니다. 2018년 일본 오리콘 차트에서 1위를 차지했으며, 스트리밍 서비스에서도 큰 인기를 끌었습니다.',
          lyrics: '夢ならば\nどれほどよかったでしょう\n未だにあなたのことを夢にみる\n忘れた物を取りに帰るように\n古びた思い出の埃を払う...',
          writers: 'Kenshi Yonezu',
          composers: 'Kenshi Yonezu',
          awards: '2018 일본 레코드 대상 "올해의 노래" 수상' },
        
        { id: 10, title: 'KICK BACK', artist: 'Kenshi Yonezu', album: 'KICK BACK', year: '2022', thumbnail: '👊', 
          genre: 'J-Pop/Rock', duration: '3:15', releaseDate: '2022-10-12',
          description: '인기 애니메이션 「체인소 맨(Chainsaw Man)」의 오프닝 테마로 사용되었습니다. 강렬한 비트와 Yonezu의 다이내믹한 보컬이 특징인 이 곡은 애니메이션의 분위기와 완벽하게 어울립니다. 발매 직후 빌보드 재팬 핫 100에서 1위를 차지했으며, 글로벌 스트리밍 플랫폼에서도 높은 인기를 끌었습니다.',
          lyrics: 'あいあいあい\nあいあいあい\nあいあいあいのね\nあいあいあい\nあいあいあい\nあいあいあいのね...',
          writers: 'Kenshi Yonezu',
          composers: 'Kenshi Yonezu',
          awards: '2023 애니메이션 음악 어워드 "베스트 테마송" 후보' },
        
        { id: 11, title: 'Pale Blue', artist: 'Kenshi Yonezu', album: 'Pale Blue', year: '2021', thumbnail: '💙', 
          genre: 'J-Pop/Pop Rock', duration: '4:43', releaseDate: '2021-06-16',
          description: 'NHK 드라마 「위대한 여행」의 테마곡으로 사용된 Yonezu의 싱글입니다. 코로나19 팬데믹 시기에 발표된 이 곡은 희망과 연결의 메시지를 담고 있으며, 푸른 하늘과 바다를 연상시키는 멜로디가 특징입니다. Yonezu는 이 곡을 통해 어려운 시기에도 희망을 잃지 말자는 메시지를 전달하고자 했습니다.',
          lyrics: '雨の匂いがした\n空が近い気がした\n魚は大人になり空へ飛んでいく...',
          writers: 'Kenshi Yonezu',
          composers: 'Kenshi Yonezu',
          awards: '2021 스페이스 샤워 TV 뮤직 어워드 "베스트 팝 송" 수상' },
        
        { id: 12, title: 'Flamingo', artist: 'Kenshi Yonezu', album: 'Flamingo / TEENAGE RIOT', year: '2018', thumbnail: '🦩', 
          genre: 'J-Pop/Electropop', duration: '3:30', releaseDate: '2018-10-31',
          description: '독특한 사운드와 리듬이 특징인 이 곡은 Yonezu의 실험적인 음악성을 잘 보여줍니다. 밝고 경쾌한 멜로디와 대조되는 가사가 인상적이며, 일본 내에서 큰 인기를 얻었습니다. 뮤직비디오 역시 화려한 색감과 독특한 안무로 주목받았습니다.',
          lyrics: '誰かの言葉を借りて喋ってみる\n君はどんな風に見えているだろう\n望むのならほら\n首だけを切り離して晒せる...',
          writers: 'Kenshi Yonezu',
          composers: 'Kenshi Yonezu',
          awards: '2018 애플 뮤직 "올해의 곡" 선정' },
        
        { id: 13, title: 'Paprika', artist: 'Kenshi Yonezu', album: 'Paprika', year: '2020', thumbnail: '🌶️', 
          genre: 'J-Pop/Folk', duration: '3:42', releaseDate: '2020-08-05',
          description: '원래 NHK의 2020 도쿄 올림픽 응원 프로젝트의 일환으로 제작된 어린이 버전에서 시작하여, Yonezu가 직접 부른 버전도 큰 인기를 얻었습니다. 경쾌하고 밝은 멜로디와 희망적인 가사가 특징이며, 전 연령층에게 사랑받는 곡입니다. 특히 다같이 춤을 출 수 있는 쉬운 안무로도 유명합니다.',
          lyrics: 'パプリカが咲いたら\n君に会いにゆこう\n花を摘み頭飾りを作ろう...',
          writers: 'Kenshi Yonezu',
          composers: 'Kenshi Yonezu',
          awards: '2020 NHK 뮤직 어워드 "베스트 송" 수상' },
      ];
      
      const foundMusic = musicData.find(m => m.id === parseInt(id));
      
      if (foundMusic) {
        setMusic(foundMusic);
        
        // 리뷰 데이터 불러오기
        const savedReviews = localStorage.getItem('reviews');
        let reviewsData = [];
        
        if (savedReviews) {
          // 저장된 리뷰 가져오기
          const allReviews = JSON.parse(savedReviews);
          // 현재 음악에 해당하는 리뷰만 필터링
          reviewsData = allReviews.filter(review => review.musicId === parseInt(id));
        }
        
        // Kenshi Yonezu 곡들에 대한 기본 리뷰 추가
        if (reviewsData.length === 0 && parseInt(id) >= 9 && parseInt(id) <= 13) {
          const kenshiReviews = [
            {
              id: Date.now(),
              musicId: parseInt(id),
              userId: 'jpopfan',
              username: 'J-Pop매니아',
              content: `${foundMusic.title}는 Kenshi Yonezu의 대표곡 중 하나로, 독특한 멜로디와 가사가 인상적입니다. 특히 그의 감성적인 목소리가 곡의 분위기를 완벽하게 살려냅니다.`,
              rating: 5,
              date: '2025-03-22',
              likes: 27,
              comments: [
                { id: 301, userId: 'user5', username: '음악비평가', content: '이 곡의 프로덕션 퀄리티는 정말 놀랍습니다.', date: '2025-03-23' },
                { id: 302, userId: 'user6', username: '애니팬', content: '이 곡이 나올 때마다 항상 기분이 좋아져요!', date: '2025-03-25' }
              ]
            },
            {
              id: Date.now() + 1,
              musicId: parseInt(id),
              userId: 'musiccritic',
              username: '음악평론가',
              content: `Yonezu의 음악적 재능이 돋보이는 곡입니다. ${foundMusic.title}는 대중적이면서도 예술적인 깊이를 가지고 있어 여러 번 들어도 질리지 않습니다.`,
              rating: 4,
              date: '2025-04-05',
              likes: 15,
              comments: []
            }
          ];
          reviewsData = kenshiReviews;
        } else if (reviewsData.length === 0) {
          // 일반 곡의 리뷰가 없을 경우 기본 샘플 리뷰 추가
          reviewsData = [
            {
              id: 101,
              musicId: foundMusic.id,
              userId: 'user1',
              username: '음악애호가',
              content: `${foundMusic.title}는 정말 인상적인 곡입니다! ${foundMusic.artist}의 목소리가 매력적이고 멜로디도 귀에 잘 들어옵니다.`,
              rating: 5,
              date: '2025-04-15',
              likes: 12,
              comments: [
                { id: 201, userId: 'user2', username: '멜로디마스터', content: '저도 동감합니다! 정말 좋은 곡이죠.', date: '2025-04-16' },
                { id: 202, userId: 'user3', username: '리듬킹', content: '특히 후렴구가 매력적인 것 같아요.', date: '2025-04-17' }
              ]
            }
          ];
        }
        
        // 댓글이 없는 리뷰에 빈 배열 추가
        reviewsData = reviewsData.map(review => ({
          ...review,
          comments: review.comments || []
        }));
        
        setReviews(reviewsData);
      }
      
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);
  
  // 좋아요 상태 저장
  useEffect(() => {
    localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
  }, [likedReviews]);
  
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  
  const handleMenuClick = () => {
    alert('추가 메뉴 기능은 아직 개발 중입니다.');
  };
  
  const handleWriteReview = () => {
    navigate(`/review/${id}`); // 감상 노트 작성 페이지로 이동
  };
  
  const handlePlayPause = () => {
    if (!isPlaying) {
      // 재생 시작
      setIsPlaying(true);
      
      // 시간 업데이트를 위한 인터벌 설정
      let seconds = 0;
      progressIntervalRef.current = setInterval(() => {
        seconds++;
        
        // 현재 재생 시간 포맷팅 (분:초)
        const min = Math.floor(seconds / 60);
        const sec = String(seconds % 60).padStart(2, '0');
        setCurrentTime(`${min}:${sec}`);
        
        // 진행률 계산 (음악 길이 파싱)
        if (music && music.duration) {
          const [durMin, durSec] = music.duration.split(':').map(Number);
          const totalDurationInSeconds = (durMin * 60) + durSec;
          const percent = (seconds / totalDurationInSeconds) * 100;
          setProgressPercent(Math.min(percent, 100));
          
          // 음악이 끝나면 재생 중지
          if (seconds >= totalDurationInSeconds) {
            clearInterval(progressIntervalRef.current);
            setIsPlaying(false);
            setCurrentTime('0:00');
            setProgressPercent(0);
          }
        }
      }, 1000);
    } else {
      // 재생 중지
      setIsPlaying(false);
      clearInterval(progressIntervalRef.current);
      setCurrentTime('0:00');
      setProgressPercent(0);
    }
  };
  
  const handleLikeReview = (reviewId) => {
    if (likedReviews.includes(reviewId)) {
      // 이미 좋아요 한 리뷰면 제거
      setLikedReviews(likedReviews.filter(id => id !== reviewId));
      // 리뷰의 좋아요 수 감소
      setReviews(reviews.map(review => 
        review.id === reviewId ? { ...review, likes: review.likes - 1 } : review
      ));
    } else {
      // 좋아요 추가
      setLikedReviews([...likedReviews, reviewId]);
      // 리뷰의 좋아요 수 증가
      setReviews(reviews.map(review => 
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      ));
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
          <div className="loading">음악 정보를 불러오는 중...</div>
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

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-header">
          <div className="back-button" onClick={handleBackClick}>
            <FaArrowLeft />
          </div>
          <div className="screen-title">음악 상세</div>
          <div className="menu-button" onClick={handleMenuClick}>
            <FaEllipsisH />
          </div>
        </div>
        
        <div className="music-detail">
          <div className="music-header">
            <div className="music-thumbnail">{music.thumbnail}</div>
            <div className="music-info">
              <h2 className="music-title" title={music.title}>{music.title}</h2>
              <div className="music-artist" title={music.artist}>{music.artist}</div>
              <div className="music-album" title={`${music.album} (${music.year})`}>{music.album} ({music.year})</div>
            </div>
          </div>
          
          <div className="music-controls">
            <button 
              className={`play-button ${isPlaying ? 'playing' : ''}`}
              onClick={handlePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            {/* 프로그레스 바 추가 - 화면이 좁을 때는 표시되지 않음 */}
            <div className="progress-bar-container" onClick={handlePlayPause}>
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            <div className="music-duration">
              {isPlaying ? currentTime : '0:00'} / {music.duration}
            </div>
          </div>
          
          <div className="music-metadata">
            <div className="metadata-item">
              <span className="metadata-label">장르:</span> {music.genre}
            </div>
            <div className="metadata-item">
              <span className="metadata-label">발매일:</span> {music.releaseDate}
            </div>
            
            {/* Kenshi Yonezu의 곡일 경우 추가 정보 표시 */}
            {music.id >= 9 && music.id <= 13 && (
              <>
                <div className="metadata-item">
                  <span className="metadata-label">작사/작곡:</span> {music.writers || music.artist}
                </div>
                {music.awards && (
                  <div className="metadata-item">
                    <span className="metadata-label">수상:</span> {music.awards}
                  </div>
                )}
              </>
            )}
          </div>
          
          <div style={{ height: '6px' }}></div>
          
          {/* Kenshi Yonezu의 곡일 경우 곡 설명 표시 */}
          {music.description && (
            <div className="music-description">
              <h4 className="description-title">곡 설명</h4>
              <p>{music.description.replace('Kenshi Yonezu', '<b>Kenshi Yonezu</b>').replace('<b>', '').replace('</b>', '')}</p>
            </div>
          )}
          
          {/* Kenshi Yonezu의 곡일 경우 가사 미리보기 표시 */}
          {music.lyrics && (
            <div className="music-lyrics">
              <h4 className="lyrics-title">가사 미리보기</h4>
              <pre className="lyrics-preview">{music.lyrics.split('\n').slice(0, 4).join('\n')}...</pre>
            </div>
          )}
        </div>
        
        <div className="section-header">
          <h3 className="section-title"><FaBook className="section-icon" /> 내 감상 노트</h3>
          <button className="action-button review-button" onClick={handleWriteReview}>
            감상 작성
          </button>
        </div>
        
        {/* 내 감상 목록 페이지로 이동하는 버튼 */}
        <div className="view-all-reviews">
          <button 
            className="action-button view-reviews-button"
            onClick={() => navigate(`/music/${id}/reviews`, { replace: true })}
          >
            모든 감상 노트 보기 ({reviews.filter(review => review.userId === username).length}개)
          </button>
          
          {/* 내 감상 리뷰가 있으면 하나만 미리보기로 표시 */}
          {reviews.filter(review => review.userId === username).length > 0 ? (
            <div 
              className="review-preview"
              onClick={() => navigate(`/music/${id}/reviews`)}
            >
              <div className="reviewer-info">
                <div className="reviewer-avatar">{username.charAt(0)}</div>
                <div className="reviewer-details">
                  <div className="reviewer-name">{username} (나)</div>
                  <div className="review-date">{reviews.filter(review => review.userId === username)[0].date}</div>
                </div>
              </div>
              
              <div className="review-rating">
                {renderStars(reviews.filter(review => review.userId === username)[0].rating)}
              </div>
              
              <div className="review-content-preview">
                {reviews.filter(review => review.userId === username)[0].content.length > 100 
                  ? `${reviews.filter(review => review.userId === username)[0].content.substring(0, 100)}...` 
                  : reviews.filter(review => review.userId === username)[0].content}
              </div>
              <div className="more-reviews-indicator">
                <FaChevronRight />
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default MusicDetailScreen;
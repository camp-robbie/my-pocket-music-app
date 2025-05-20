import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBook, FaHeart, FaUser, FaPlus, FaMusic, FaGlobe } from 'react-icons/fa';
import { AuthContext } from '../App';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('Kenshi Yonezu');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  
  // 예시 음악 데이터
  const [musicResults, setMusicResults] = useState([
    { id: 1, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', year: '2017', thumbnail: '🎵' },
    { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', year: '2020', thumbnail: '🎧' },
    { id: 3, title: 'Dance The Night', artist: 'Dua Lipa', album: 'Barbie: The Album', year: '2023', thumbnail: '🎶' },
    { id: 4, title: 'Dynamite', artist: 'BTS', album: 'BE', year: '2020', thumbnail: '🎸' },
    { id: 5, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", year: '2022', thumbnail: '🥁' },
    { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', year: '2015', thumbnail: '🎷' },
    { id: 7, title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', year: '2019', thumbnail: '🎹' },
    { id: 8, title: 'Gangnam Style', artist: 'PSY', album: 'Psy 6 Rules Pt. 1', year: '2012', thumbnail: '🎺' },
    // Kenshi Yonezu의 음악 추가
    { id: 9, title: 'Lemon', artist: 'Kenshi Yonezu', album: 'Lemon/Cranberry & Pancake', year: '2018', thumbnail: '🍋' },
    { id: 10, title: 'KICK BACK', artist: 'Kenshi Yonezu', album: 'KICK BACK', year: '2022', thumbnail: '👊' },
    { id: 11, title: 'Pale Blue', artist: 'Kenshi Yonezu', album: 'Pale Blue', year: '2021', thumbnail: '💙' },
    { id: 12, title: 'Flamingo', artist: 'Kenshi Yonezu', album: 'Flamingo / TEENAGE RIOT', year: '2018', thumbnail: '🦩' },
    { id: 13, title: 'Paprika', artist: 'Kenshi Yonezu', album: 'Paprika', year: '2020', thumbnail: '🌶️' },
  ]);
  
  // 내 음악 라이브러리
  const [myMusic, setMyMusic] = useState(() => {
    // 로컬 스토리지에서 내 음악 데이터 가져오기
    const savedMusic = localStorage.getItem('myMusic');
    return savedMusic ? JSON.parse(savedMusic) : [];
  });
  
  // 현재 보기 상태 (검색 결과 / 내 음악)
  const [activeView, setActiveView] = useState('myMusic'); // 'search' 또는 'myMusic'
  
  // 필터링된 검색 결과
  const filteredResults = searchTerm.trim() === '' 
    ? [] 
    : (searchTerm.toLowerCase() === 'kenshi yonezu')
      ? musicResults.filter(music => music.artist.toLowerCase() === 'kenshi yonezu')
      : musicResults.filter(
          music => music.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  music.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
  // 내 음악 저장
  useEffect(() => {
    localStorage.setItem('myMusic', JSON.stringify(myMusic));
  }, [myMusic]);

  const handleMusicClick = (id, music) => {
    // 이미 추가된 음악인지 확인
    if (!myMusic.some(item => item.id === music.id)) {
      const updatedMyMusic = [...myMusic, music];
      setMyMusic(updatedMyMusic);
      console.log(`"${music.title}"이(가) 내 음악에 자동으로 추가되었습니다.`);
    }
    navigate(`/music/${id}`);
  };
  
  const handleAddMusic = (music) => {
    // 이미 추가된 음악인지 확인
    if (!myMusic.some(item => item.id === music.id)) {
      const updatedMyMusic = [...myMusic, music];
      setMyMusic(updatedMyMusic);
      alert(`"${music.title}"이(가) 내 음악에 추가되었습니다.`);
    } else {
      alert('이미 내 음악에 추가된 곡입니다.');
    }
  };
  
  const handleRemoveMusic = (id) => {
    const confirmed = window.confirm('내 음악에서 삭제하시겠습니까?');
    if (confirmed) {
      const updatedMyMusic = myMusic.filter(music => music.id !== id);
      setMyMusic(updatedMyMusic);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // 검색어가 비어있으면 "Kenshi Yonezu"로 설정
    if (!searchTerm.trim()) {
      setSearchTerm("Kenshi Yonezu");
    }
    setIsSearching(true);
    setActiveView('search');
  };
  
  const showMyMusic = () => {
    setActiveView('myMusic');
    setIsSearching(false);
  };

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-title">
          {username ? `${username}님의 음악` : '내 음악'}
        </div>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="음악 또는 아티스트 검색" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">검색</button>
        </form>
        
        <div className="view-tabs">
          <div 
            className={`view-tab ${activeView === 'myMusic' ? 'active' : ''}`}
            onClick={showMyMusic}
          >
            내 음악
          </div>
          <div 
            className={`view-tab ${activeView === 'search' ? 'active' : ''}`}
            onClick={() => searchTerm.trim() && setActiveView('search')}
          >
            검색 결과
          </div>
        </div>
        
        {activeView === 'search' && (
          <div className="music-list">
            <h3 className="list-title">검색 결과</h3>
            {filteredResults.length > 0 ? (
              filteredResults.map((music) => (
                <div key={music.id} className="music-item">
                  <div className="music-info" onClick={() => handleMusicClick(music.id, music)}>
                    <div className="thumbnail">{music.thumbnail}</div>
                    <div className="item-content">
                      <div className="item-title" title={music.title}>{music.title}</div>
                      <div className="item-artist" title={music.artist}>{music.artist}</div>
                      <div className="item-album" title={`${music.album} (${music.year})`}>{music.album} ({music.year})</div>
                    </div>
                  </div>
                  <button 
                    className="add-button"
                    onClick={() => handleAddMusic(music)}
                  >
                    <FaPlus />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                {searchTerm.trim() ? '검색 결과가 없습니다' : '검색어를 입력하세요'}
              </div>
            )}
          </div>
        )}
        
        {activeView === 'myMusic' && (
          <div className="music-list">
            <h3 className="list-title">내 음악</h3>
            {myMusic.length > 0 ? (
              myMusic.map((music) => (
                <div key={music.id} className="music-item">
                  <div className="music-info" onClick={() => handleMusicClick(music.id, music)}>
                    <div className="thumbnail">{music.thumbnail}</div>
                    <div className="item-content">
                      <div className="item-title" title={music.title}>{music.title}</div>
                      <div className="item-artist" title={music.artist}>{music.artist}</div>
                      <div className="item-album" title={`${music.album} (${music.year})`}>{music.album} ({music.year})</div>
                    </div>
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveMusic(music.id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎵</div>
                <div className="empty-text">아직 추가된 음악이 없습니다</div>
                <p className="empty-subtext">음악을 검색하여 추가해보세요!</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="tab-bar">
        <div className="tab" onClick={() => handleNavigation('/mycircle')}>
          <FaMusic />
        </div>
        <div className="tab" onClick={() => handleNavigation('/jed')}>
          <FaHeart />
        </div>
        <div className="tab active" onClick={() => handleNavigation('/search')}>
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

export default SearchScreen;
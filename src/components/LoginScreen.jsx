import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';
import { AuthContext } from '../App';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  // 이전에 접근하려던 페이지가 있으면 그곳으로 리다이렉트하고, 없으면 검색 페이지로
  const from = location.state?.from?.pathname || "/search";

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // 에러 메시지 초기화
    
    // 빈 필드 검사
    if (!username || !password) {
      setError('사용자 이름과 비밀번호를 입력해주세요.');
      return;
    }
    
    // 지정된 아이디와 비밀번호 확인
    if (username === 'robbie' && password === '1234') {
      // 로그인 함수 호출
      login(username);
      
      console.log('로그인 성공!');
      // 로그인 성공 시 이전 페이지 또는 검색 화면으로 이동
      navigate(from, { replace: true });
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleRegister = () => {
    // 회원가입 기능은 현재 준비 중
    alert('회원가입 기능은 현재 준비 중입니다. 아이디: robbie, 비밀번호: 1234로 로그인해보세요.');
  };

  return (
    <div className="screen-container">
      <div className="phone-frame">
        <div className="screen-title">My Pocket</div>
        
        <div className="music-logo">
          <FaMusic size={50} color="#1DB954" />
        </div>
        
        <div className="sign-up-title">로그인</div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="사용자 이름 (robbie)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <input 
            type="password" 
            className="input-field" 
            placeholder="비밀번호 (1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            type="submit" 
            className="action-button"
          >
            로그인
          </button>
        </form>
        
        <div className="text-light register-link" onClick={handleRegister}>
          계정이 없으신가요? <span className="highlight">회원가입</span>
        </div>
        
        <div className="login-helper">
          <p className="hint-text">* 테스트용 계정: robbie / 1234</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import '../styles/LoginPage.css';

// Giả lập database users
const mockUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'password1' },
  { username: 'test', password: 'test123' }
];

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });
  const navigate = useNavigate();

  // Kiểm tra đăng nhập đã lưu khi component mount
  useEffect(() => {
    const savedLogin = localStorage.getItem('rememberedLogin');
    if (savedLogin) {
      const loginData = JSON.parse(savedLogin);
      setUsername(loginData.username);
      setRememberMe(true);
      // Tự động điều hướng đến trang home nếu đã remember
      navigate('/home');
    }
  }, [navigate]);

  // Hàm kiểm tra ký tự unicode (ký tự đặc biệt)
  const hasUnicodeChars = (str: string) => {
    // Regex kiểm tra chỉ cho phép chữ cái, số và một số ký tự cơ bản
    const basicCharsRegex = /^[a-zA-Z0-9._-]+$/;
    return !basicCharsRegex.test(str);
  };

  // Hàm reset lỗi
  const resetErrors = () => {
    setErrors({
      username: false,
      password: false
    });
  };

  // Hàm kiểm tra user trong database
  const checkUserInDatabase = (username: string, password: string) => {
    const user = mockUsers.find(u => u.username === username);
    if (!user) {
      return { exists: false, passwordMatch: false };
    }
    return { exists: true, passwordMatch: user.password === password };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors trước khi validate
    resetErrors();
    setShowMessage(false);
    
    let hasError = false;
    const newErrors = { username: false, password: false };

    // Kiểm tra điền đầy đủ thông tin
    if (!username || !password) {
      if (!username) newErrors.username = true;
      if (!password) newErrors.password = true;
      
      setErrors(newErrors);
      setMessage('Điền đầy đủ username và password');
      setShowMessage(true);
      hasError = true;
      return;
    }

    // Kiểm tra ký tự unicode trong username
    if (hasUnicodeChars(username)) {
      newErrors.username = true;
      setErrors(newErrors);
      setMessage('Username không được dùng ký tự unicode');
      setShowMessage(true);
      hasError = true;
      return;
    }

    // Kiểm tra ký tự unicode trong password
    if (hasUnicodeChars(password)) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessage('Password không được dùng ký tự unicode');
      setShowMessage(true);
      hasError = true;
      return;
    }

    // Kiểm tra thông tin đăng nhập
    const { exists, passwordMatch } = checkUserInDatabase(username, password);
    
    if (!exists || !passwordMatch) {
      setMessage('Sai thông tin đăng nhập');
      setShowMessage(true);
      hasError = true;
      return;
    }

    // Đăng nhập thành công
    if (!hasError) {
      setMessage('Đăng nhập thành công!');
      setShowMessage(true);
      
      // Lưu thông tin đăng nhập nếu remember me được check
      if (rememberMe) {
        localStorage.setItem('rememberedLogin', JSON.stringify({
          username: username,
          timestamp: new Date().getTime()
        }));
      } else {
        localStorage.removeItem('rememberedLogin');
      }
      
      // Điều hướng đến trang home sau 1 giây
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
    
    console.log('Login data:', { username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Đăng Nhập</h1>
        
        <form onSubmit={handleSubmit} className="login-form">          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username của bạn"
              className={`login-input ${errors.username ? 'error' : ''}`}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập password của bạn"
              className={`login-input ${errors.password ? 'error' : ''}`}
            />
          </div>

          {showMessage && (
            <label className={`message-label ${message.includes('thành công') ? 'success' : 'error'}`}>
              {message}
            </label>
          )}

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
          </div>

          <button type="submit" className="login-button">
            Đăng Nhập
          </button>

          <div className="links-container">
            <Link to="/auth/register" className="auth-link">
              Đăng ký tài khoản mới
            </Link>
            <Link to="/auth/forgot" className="auth-link">
              Quên mật khẩu?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

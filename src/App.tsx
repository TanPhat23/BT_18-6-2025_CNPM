import { Link } from "react-router";
import "./styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landingpage">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Platform</h1>
          <p className="hero-subtitle">
            Your gateway to an amazing experience. Join thousands of users who
            trust our platform.
          </p>
          <div className="hero-buttons">
            <Link to="/auth/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast performance with 99.9% uptime guarantee.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Your data is protected with enterprise-grade security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovative</h3>
              <p>Cutting-edge features to help you stay ahead of the curve.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global</h3>
              <p>Available worldwide with 24/7 customer support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join our community today and unlock your potential.</p>
          <Link to="/register" className="btn btn-large">
            Create Account
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Your Platform. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

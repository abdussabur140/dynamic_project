/**
 * Applix WebView Handler
 * Detects if running in Applix webview and shows exclusive content
 */

// Store to track if content is loaded
const WebViewHandler = {
  isApplix: false,
  isLoaded: false,
  webviewPageShown: false,

  /**
   * Detect if running in Applix WebView
   */
  detectApplix() {
    // Method 1: Check for Applix bridge/API
    if (typeof window.applix !== 'undefined' || typeof window.ApplixBridge !== 'undefined') {
      this.isApplix = true;
      console.log('✓ Applix WebView detected');
      return true;
    }

    // Method 2: Check user agent for webview indicators
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.includes('ApplixWebView') || userAgent.includes('wv')) {
      this.isApplix = true;
      console.log('✓ Applix WebView detected via User Agent');
      return true;
    }

    // Method 3: Check for custom meta tags or injected variables
    const metaApplix = document.querySelector('meta[name="applix-webview"]');
    if (metaApplix) {
      this.isApplix = true;
      console.log('✓ Applix WebView detected via meta tag');
      return true;
    }

    console.log('ℹ Not running in Applix WebView');
    return false;
  },

  /**
   * Initialize the webview handler
   */
  init() {
    this.detectApplix();

    // Only proceed if in Applix webview
    if (!this.isApplix) return;

    // Listen for page load completion
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onContentLoaded();
      });
    } else {
      // Already loaded
      this.onContentLoaded();
    }

    // Also wait for full page load
    window.addEventListener('load', () => {
      this.isLoaded = true;
    });
  },

  /**
   * Called when DOM content is loaded
   */
  onContentLoaded() {
    // Delay 5 seconds before showing webview-exclusive content
    setTimeout(() => {
      this.showWebViewPage();
    }, 5000);
  },

  /**
   * Show the webview exclusive page/modal
   */
  showWebViewPage() {
    if (this.webviewPageShown) return;
    this.webviewPageShown = true;

    // Hide existing content
    const mainContent = document.body;
    mainContent.style.position = 'relative';

    // Create webview overlay
    const overlay = document.createElement('div');
    overlay.id = 'applix-webview-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      color: white;
      animation: fadeIn 0.5s ease-in;
    `;

    overlay.innerHTML = `
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        #applix-webview-content {
          text-align: center;
          animation: slideUp 0.6s ease-out;
        }
        #applix-webview-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        #applix-webview-content h1 {
          font-size: 28px;
          margin: 0 0 15px 0;
          font-weight: 700;
        }
        #applix-webview-content p {
          font-size: 16px;
          margin: 0 0 30px 0;
          opacity: 0.95;
          line-height: 1.6;
          max-width: 300px;
        }
        .webview-btn {
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid white;
          color: white;
          padding: 12px 32px;
          font-size: 16px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 10px;
        }
        .webview-btn:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.05);
        }
        .webview-btn-primary {
          background: white;
          color: #667eea;
          font-weight: 600;
        }
        .webview-btn-primary:hover {
          background: #f0f0f0;
        }
      </style>
      <div id="applix-webview-content">
        <div id="applix-webview-icon">📱</div>
        <h1>Exclusive App Experience</h1>
        <p>You're using our mobile app! Enjoy this exclusive content available only in our application.</p>
        <button class="webview-btn webview-btn-primary" onclick="WebViewHandler.closeWebViewPage()">Continue to Site</button>
        <button class="webview-btn" onclick="alert('This is exclusive content for app users!')">View More</button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Optional: Send event to Applix bridge
    if (typeof window.applix !== 'undefined' && window.applix.onWebViewPageShown) {
      window.applix.onWebViewPageShown();
    }
  },

  /**
   * Close the webview overlay and show normal content
   */
  closeWebViewPage() {
    const overlay = document.getElementById('applix-webview-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }
};

// Initialize on script load
WebViewHandler.init();

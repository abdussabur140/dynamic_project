<script>
const MobilePageHandler = {
  init() {
    if (this.isMobile()) {
      setTimeout(() => {
        window.location.href = "webview-exclusive.html";
      }, 5000);
    }
  },

  isMobile() {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }
};

MobilePageHandler.init();
</script>

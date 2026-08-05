<script>
document.addEventListener("DOMContentLoaded", function () {

  // Check mobile device
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile) {
    setTimeout(function () {
      window.location.replace("webview-exclusive.html");
    }, 5000);
  }

});
</script>

(function () {
  var placeholder = document.getElementById('site-nav');
  if (!placeholder) return;

  fetch('/components/nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.innerHTML = html;

      // Mark current page link as active
      var links = placeholder.querySelectorAll('a');
      links.forEach(function (link) {
        if (link.href === window.location.href) {
          link.setAttribute('aria-current', 'page');
        }
      });
    });
}());

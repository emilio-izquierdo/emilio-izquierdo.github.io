(function () {
  var placeholder = document.getElementById('site-nav');
  if (!placeholder) return;

  fetch('/components/nav.html')
    .then(function (res) {
      if (!res.ok) throw new Error('nav fetch failed: ' + res.status);
      return res.text();
    })
    .then(function (html) {
      placeholder.innerHTML = html;

      var currentPath = window.location.pathname;
      if (currentPath === '/') currentPath = '/index.html';
      var links = placeholder.querySelectorAll('a');
      links.forEach(function (link) {
        if (link.pathname === currentPath) {
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch(function (err) {
      console.error('Site navigation failed to load:', err);
    });
}());

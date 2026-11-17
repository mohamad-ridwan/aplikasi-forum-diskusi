function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik lalu`;
  }
  return 'baru saja';
}

function stripHtml(html) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function truncate(text, length = 150) {
  const clean = stripHtml(text);
  if (clean.length <= length) return clean;
  return `${clean.substring(0, length)}...`;
}

export { postedAt, stripHtml, truncate };

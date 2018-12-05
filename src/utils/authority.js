// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(key) {
  // return localStorage.getItem('authority-group') || ['admin', 'user'];
  const authorityString = localStorage.getItem(`authority-${key || 'group'}`)
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  return authority;
}

export function setAuthority(authority) {
  Object.keys(authority).map(key => {
    localStorage.setItem(`authority-${key}`, JSON.stringify(authority[key]));
  });
}

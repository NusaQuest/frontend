export function truncate(text, startChar, endChar, maxLength) {
  if (text.length > maxLength) {
    let start = text.substring(0, startChar);
    let end = text.substring(text.length - endChar, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
}

export function navs() {
  return [
    {
      title: "Home",
      destination: "/",
    },
    {
      title: "Register",
      destination: "/register",
    },
    {
      title: "Quest",
      destination: "/quest",
    },
    {
      title: "Profile",
      destination: "/profile",
    },
  ];
}

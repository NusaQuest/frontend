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

export function getCountdown(targetTimestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = targetTimestamp - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = diff % 60;

  return { days, hours, minutes, seconds };
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
      title: "Impact",
      destination: "/impact",
    },
    {
      title: "Redeem",
      destination: "/redeem",
    },
    {
      title: "History",
      destination: "/history",
    },
  ];
}

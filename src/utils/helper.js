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
  const diff = Number(targetTimestamp) - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = diff % 60;

  return { days, hours, minutes, seconds };
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleDateString("en-GB");
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${day} ${time}`;
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

export const mapStateToStatus = (state) => {
  switch (state) {
    case 0:
      return "Pending";
    case 1:
      return "Active";
    case 2:
      return "Canceled";
    case 3:
      return "Defeated";
    case 4:
      return "Succeeded";
    case 5:
      return "Queued";
    case 6:
      return "Expired";
    case 7:
      return "Executed";
    default:
      return "Unknown";
  }
};

export const statusColors = {
  Pending: "bg-orange-100 text-orange-800",
  Active: "bg-blue-100 text-blue-800",
  Canceled: "bg-red-100 text-red-800",
  Defeated: "bg-red-100 text-red-800",
  Succeeded: "bg-green-100 text-green-800",
  Queued: "bg-indigo-100 text-indigo-800",
  Expired: "bg-gray-100 text-gray-800",
  Executed: "bg-green-100 text-green-800",
  Unknown: "bg-gray-100 text-gray-800",
};

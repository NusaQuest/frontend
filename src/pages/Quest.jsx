import React from "react";
import Header from "../components/sections/Header";
import QuestsSection from "../components/sections/QuestsSection";

const quests = [
  {
    id: "64f6c2e0a29b3c001c7d9f0a",
    scId: 1,
    scTargets: ["0x1234567890abcdef1234567890abcdef12345678"],
    scValues: [0],
    scCalldatas: ["0x"],
    wallet: "0xabcDEFabcDEFabcDEFabcDEFabcDEFabcDEF1234",
    name: "Clean Up Kuta Beach",
    proposalDescription:
      "Let’s clean up plastic and trash at Kuta Beach in Bali. This is an effort to preserve one of Indonesia’s most iconic beaches.",
    beachName: "Kuta Beach",
    city: "Badung",
    province: "Bali",
    map: "https://maps.google.com/?q=Kuta+Beach+Bali",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
      "https://example.com/images/kuta2.jpg",
    ],
    voteStart: 1751808000, // 2025-07-06T08:00:00Z
    voteEnd: 1751980800, // 2025-07-08T08:00:00Z
    executionDelay: 86400, // 24 jam
  },
  {
    id: "64f6c2e0a29b3c001c7d9f0b",
    scId: 2,
    scTargets: ["0x9876543210fedcba9876543210fedcba98765432"],
    scValues: [0],
    scCalldatas: ["0x"],
    wallet: "0x123ABC123ABC123ABC123ABC123ABC123ABC123A",
    name: "Clean Up Parangtritis Beach",
    proposalDescription:
      "Help clean up the Parangtritis coast and support local eco-tourism while earning $NUSA tokens.",
    beachName: "Parangtritis Beach",
    city: "Bantul",
    province: "Yogyakarta",
    map: "https://maps.google.com/?q=Parangtritis+Beach",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
    ],
    voteStart: 1751894400, // 2025-07-07T10:00:00Z
    voteEnd: 1752067200, // 2025-07-09T10:00:00Z
    executionDelay: 43200, // 12 jam
  },
  {
    id: "64f6c2e0a29b3c001c7d9f0c",
    scId: 3,
    scTargets: ["0xa1b2c3d4e5f6071829384756aabbccddeeff0011"],
    scValues: [0],
    scCalldatas: ["0x"],
    wallet: "0xdef456DEF456DEF456DEF456DEF456DEF4567890",
    name: "Clean Up Losari Beach",
    proposalDescription:
      "Join us to restore the beauty of Losari Beach in Makassar by removing trash and plastic debris with local volunteers.",
    beachName: "Losari Beach",
    city: "Makassar",
    province: "South Sulawesi",
    map: "https://maps.google.com/?q=Losari+Beach",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
      "https://example.com/images/losari2.jpg",
    ],
    voteStart: 1751980800, // 2025-07-08T08:00:00Z
    voteEnd: 1752153600, // 2025-07-10T08:00:00Z
    executionDelay: 86400, // 24 jam
  },
];

const Quest = () => {
  return (
    <div>
      <Header
        firstText="Explore"
        boldText="Quests"
        secondText="for Impact"
        paragraph="Join community-driven cleanups across Indonesia. Browse available quests, earn 60 $NUSA tokens, and help restore our beaches."
      />
      <QuestsSection quests={quests} />
    </div>
  );
};

export default Quest;

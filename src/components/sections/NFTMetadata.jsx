import React from "react";
import Title from "./Title";
import {
  Sparkles,
  CalendarDays,
  TicketCheck,
  UserCheck,
  DollarSign,
  PackageCheck,
} from "lucide-react";

const NFTMetadata = ({ nft }) => {
  const { concertname, datetime, utility, seatzone, price, stock, purchased } =
    nft;

  const metadataList = [
    {
      icon: <Sparkles className="size-4" />,
      label: "Concert",
      value: concertname,
    },
    {
      icon: <CalendarDays className="size-4" />,
      label: "Date & Time",
      value: datetime,
    },
    {
      icon: <TicketCheck className="size-4" />,
      label: "Seat Zone",
      value: seatzone,
    },
    {
      icon: <PackageCheck className="size-4" />,
      label: "Utility",
      value: utility,
    },
    {
      icon: <DollarSign className="size-4" />,
      label: "Price",
      value: `${price} NUSA`,
    },
    {
      icon: <UserCheck className="size-4" />,
      label: "Available",
      value: `${stock} / ${stock + purchased}`,
    },
  ];

  return (
    <div>
      <Title title={"🎫 NFT Metadata"} />
      <div className="flex flex-wrap gap-2 mb-4">
        {metadataList.map((item, index) => (
          <div
            key={index}
            className="px-3 py-1 rounded-full bg-white/10 text-xs lg:text-sm text-secondary flex items-center gap-1"
          >
            {item.icon}
            <span className="font-medium">{item.label}:</span> {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMetadata;

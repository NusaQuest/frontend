import React from "react";
import Title from "./Title";
import { Copy, MapPin, User } from "lucide-react";
import { truncate } from "../../utils/helper";

const QuestProfile = ({ quest, isDescription }) => {
  return (
    <div>
      {!isDescription ? (
        <div>
          <Title title={quest.proposalname} />
          <a
            href={quest.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm lg:text-base italic text-secondary hover:underline"
          >
            <MapPin size={14} className="text-primary" />
            {quest.beachname}, {quest.city}, {quest.province}
          </a>
          <div className="flex flex-row gap-1 items-center mt-2 mb-4">
            <User className="text-primary size-4" />
            <p className="text-secondary italic text-sm lg:text-base">
              {truncate(quest.wallet, 4, 4, 11)}
            </p>
            <Copy className="text-primary size-3 cursor-pointer" />
          </div>
        </div>
      ) : (
        <div>
          <Title title={"Description"} />
          <p className="text-secondary text-sm lg:text-base">{quest.proposaldescription}</p>
        </div>
      )}
    </div>
  );
};

export default QuestProfile;

import React, { useEffect, useState } from "react";
import Title from "./Title";
import { getCountdown } from "../../utils/helper";

const Countdown = ({ timestamp, status }) => {
  const [countdown, setCountdown] = useState(getCountdown(timestamp));

  useEffect(() => {

    const interval = setInterval(() => {
      setCountdown(getCountdown(timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div>
      <div className="mt-3">
        {status === "Pending" && <Title title={"Voting Starts In"} />}
        {status === "Active" && <Title title={"Voting Ends In"} />}
        {status === "Queued" && <Title title={"Awaiting Execution"} />}
        {status === "Executed" && <Title title="Open for Submission Until" />}
      </div>
      <div className="flex flex-row gap-2 lg:justify-start items-center justify-center mb-6">
        <div className="bg-primary rounded-xl size-16 md:size-20 lg:size-24 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.days}d
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 md:size-20 lg:size-24 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.hours}h
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 md:size-20 lg:size-24 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.minutes}m
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 md:size-20 lg:size-24 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.seconds}s
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

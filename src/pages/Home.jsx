import React, { useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import AdvantageSection from "../components/sections/AdvantageSection";
import Swal from "sweetalert2";
import { delegate, isAlreadyDelegate } from "../services/ft";
import { addTransaction } from "../server/transaction";
import { getBlockTimestamp } from "../services/helper/converter";
import { simulateContract } from "viem/actions";
import { config } from "../App";

const Home = ({ address }) => {
  const fetchDelegateStatus = async () => {
    if (!address) return;

    const status = await isAlreadyDelegate(address);
    if (!status) {
      const result = await Swal.fire({
        title: "Become a Delegate? 🗳️",
        text: "Become a delegate to start voting on proposals — and earn 10 NUSA tokens as a reward!",
        icon: "info",
        confirmButtonText: "Delegate Now",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Delegating...",
          text: "Please wait while we process your delegation.",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const contractResult = await delegate(address);
        const timestamp = await getBlockTimestamp();

        if (contractResult) {
          const httpResult = await addTransaction(
            address,
            "Delegation",
            "+10 NUSA",
            contractResult,
            timestamp
          );
          if (httpResult) {
            Swal.close();
            Swal.fire({
              title: "Success 🎉",
              text: "You are now a delegate and earned 10 NUSA tokens!",
              icon: "success",
              confirmButtonText: "Close",
            });
          } else {
            Swal.close();
            await Swal.fire({
              title: "Almost there ✅",
              text: "Delegation succeeded, but we couldn’t record it in your history. Don’t worry, you still received the 10 NUSA tokens!",
              icon: "warning",
              confirmButtonText: "Okay",
            });
          }
        } else {
          Swal.close();
          await Swal.fire({
            title: "Oops 😓",
            text: "Failed to delegate. Please check your wallet and try again.",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchDelegateStatus();
  }, [address]);

  return (
    <div>
      <HeroSection address={address} />
      <AdvantageSection />
    </div>
  );
};

export default Home;

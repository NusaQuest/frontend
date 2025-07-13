import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/sections/Title";
import RedeemImage from "../components/sections/RedeemImage";
import NFTDetail from "../components/sections/NFTDetail";
import NFTDescription from "../components/sections/NFTDescription";
import NFTMetadata from "../components/sections/NFTMetadata";
import ReusableButton from "../components/buttons/ReusableButton";
import { getNFTs, purchaseNFT } from "../server/nft";
import { balanceOf } from "../services/ft";
import Swal from "sweetalert2";
import { swap } from "../services/nft";
import { getBlockTimestamp } from "../services/helper/converter";
import { addTransaction } from "../server/transaction";

const RedeemDetail = ({ address }) => {
  const { id } = useParams("id");
  const [nft, setNft] = useState(null);
  const [soldOut, setSoldOut] = useState(false);
  const navigate = useNavigate();

  const fetchNFT = async () => {
    const result = await getNFTs();
    const data = result.data.nfts;
    setNft(data.find((item) => item.id === String(id)));
  };

  useEffect(() => {
    if (id) {
      fetchNFT();
    }
  }, [id]);

  useEffect(() => {
    if (nft) {
      setSoldOut(nft.purchased >= nft.stock);
    }
  }, [nft]);

  const checkBalance = async () => {
    if (!address) return;

    const balance = await balanceOf(address);
    if (balance < nft.price) {
      await Swal.fire({
        title: "Insufficient Balance 💸",
        text: `You need at least ${nft.price} NUSA tokens to redeem this NFT.`,
        icon: "warning",
        confirmButtonText: "Got it!",
      });
      return false;
    }

    return true;
  };

  const handleConfirmation = async () => {
    const result = await Swal.fire({
      title: "Confirm Redemption 🎟️",
      text: `Do you want to redeem this NFT for ${nft.price} NUSA ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Redeem",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      Swal.close();
      await handleRedeem(); // Pastikan handleRedeem sudah didefinisikan
    }
  };

  const handleRedeem = async () => {
    const valid = await checkBalance();

    if (valid) {
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we process your redemption.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await swap(nft.scid);
      const timestamp = await getBlockTimestamp();

      if (result) {
        const addResult = await addTransaction(
          address,
          `NFT Redeemed — ${nft.name}`,
          `-${nft.price} NUSA`,
          result,
          timestamp
        );
        const purchaseResult = await purchaseNFT(nft.id);

        if (addResult && purchaseResult) {
          Swal.close();
          await Swal.fire({
            title: "Redeemed 🎉",
            text: "You have successfully redeemed your NFT!",
            icon: "success",
            confirmButtonText: "Back to Redeem Page",
          });
          if (result.isConfirmed) {
            Swal.close();
            navigate("/redeem");
          }
        } else {
          Swal.close();
          await Swal.fire({
            title: "Recorded Failed 📄",
            text: "NFT was redeemed, but failed to record transaction. Please contact support.",
            icon: "warning",
            confirmButtonText: "Understood",
          });
        }
      } else {
        Swal.close();
        await Swal.fire({
          title: "Failed 😓",
          text: "Redemption failed. Please try again or check your wallet.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  if (nft) {
    return (
      <div className="lg:mt-8">
        <Title title={nft.name} />
        <div className="flex flex-col lg:flex-row space-x-8">
          <div className="lg:w-1/2">
            <RedeemImage nft={nft} />
          </div>
          <div className="lg:w-1/2">
            <NFTDetail nft={nft} />
            <NFTDescription nft={nft} />
            <NFTMetadata nft={nft} />
            {soldOut ? (
              <ReusableButton
                text="Sold Out"
                buttonColor={"bg-gray-600"}
                textColor={"text-gray-300"}
              />
            ) : (
              <ReusableButton
                text="Redeem"
                action={handleConfirmation}
                buttonColor={"bg-primary"}
                textColor={"text-secondary"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default RedeemDetail;

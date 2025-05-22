"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ReturnButton = () => {
  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  return (
    <div className="flex justify-center cursor-pointer" onClick={handleReturn}>
      <span className="material-symbols-outlined">
        arrow_back_ios
      </span>
      <p>Regresar</p>
    </div>
  );
};

export default ReturnButton;

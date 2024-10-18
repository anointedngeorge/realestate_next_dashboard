"use client"
import Image from "next/image";
import { useState } from "react";
import FrontendLayout from "@/components/frontend/Layout";
import CustomBanner from "@/components/frontend/Banner";


export default function Home() {

  // 
  return (
    <FrontendLayout>
      <CustomBanner type="hero" />
    </FrontendLayout>
  );
}

// pages/nbl-training.tsx (or wherever you render the NBL component)
import dynamic from "next/dynamic";

const NBLExperienceEnhanced = dynamic(
  () => import("../src/components/NBL/NBLExperienceEnhanced"),
  { ssr: false }
);

export default function NBLPage() {
  return <NBLExperienceEnhanced />;
}

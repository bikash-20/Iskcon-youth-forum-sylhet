import HeroVideo from "@/components/HeroVideo";
import QuickCards from "@/components/QuickCards";
import UpcomingEvents from "@/components/UpcomingEvents";
import LiveDarshanCard from "@/components/LiveDarshanCard";
import AboutTeaser from "@/components/AboutTeaser";
import CoordinatorMessage from "@/components/CoordinatorMessage";
import SectionBreak from "@/components/SectionBreak";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <QuickCards />
      <SectionBreak label="About" glyph="•" />
      <AboutTeaser />
      <UpcomingEvents />
      <SectionBreak label="From the coordinator" glyph="•" />
      <CoordinatorMessage />
      <LiveDarshanCard />
    </>
  );
}

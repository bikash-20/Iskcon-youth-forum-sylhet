import HeroVideo from "@/components/HeroVideo";
import QuickCards from "@/components/QuickCards";
import UpcomingEvents from "@/components/UpcomingEvents";
import LiveDarshanCard from "@/components/LiveDarshanCard";
import AboutTeaser from "@/components/AboutTeaser";
import CoordinatorMessage from "@/components/CoordinatorMessage";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <QuickCards />
      <AboutTeaser />
      <UpcomingEvents />
      <CoordinatorMessage />
      <LiveDarshanCard />
    </>
  );
}

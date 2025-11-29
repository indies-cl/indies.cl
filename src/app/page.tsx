import HeroSection from '@/components/sections/HeroSection';
import AboutIndies from '@/components/sections/AboutIndies';
import CommunitySection from '@/components/sections/CommunitySection';
import SponsorsSection from '@/components/sections/SponsorsSection';

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <AboutIndies />
      <CommunitySection />
      <SponsorsSection />
    </main>
  );
}

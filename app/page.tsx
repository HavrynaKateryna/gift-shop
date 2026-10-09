import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GiftBuilder from "@/components/GiftBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCFAF5]">
      <Header />
      <Hero />

      <GiftBuilder />
    </main>
  );
}

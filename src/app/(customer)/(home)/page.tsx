import ChooseFlight from "@/app/_components/choose-flight";
import FeaturedService from "@/app/_components/featured-service";
import Footer from "@/app/_components/footer";
import OfferedFeature from "@/app/_components/offered-feature";
import Testimonials from "@/app/_components/testimonials";

export default function Home() {
  return (
    <>
      <ChooseFlight />

      <OfferedFeature />

      <FeaturedService />

      <Testimonials />

      <Footer />
    </>
  );
}

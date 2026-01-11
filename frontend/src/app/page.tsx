import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Categories from "@/components/sections/Categories";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}

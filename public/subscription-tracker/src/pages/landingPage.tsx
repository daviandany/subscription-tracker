import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { PainPointsSection } from '../components/landing/PainPointsSection';
import { SocialProofSection } from '../components/landing/SocialProofSection';
import { PricingSection } from '../components/landing/PricingSection';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />
            <HeroSection />
            <PainPointsSection />
            <SocialProofSection />
            <PricingSection />
            <Footer />
        </div>
    );
}

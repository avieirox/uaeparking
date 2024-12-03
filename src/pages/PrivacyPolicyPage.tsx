import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - UAE Parking Locator"
        description="Learn about how we collect, use, and protect your personal information at UAE Parking Locator"
        canonical="/privacy"
      >
        <meta name="robots" content="noindex,nofollow" />
      </SEO>
      
      {/* Rest of the existing PrivacyPolicyPage component remains the same */}
    </>
  );
}
import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">

            <h1 className="text-4xl font-bold text-black mb-6">
              Privacy Policy
            </h1>

            <p className="text-gray-700 mb-6 text-sm">
              At <strong>Mars Photography & Videography Studio</strong>, we value your privacy and
              are committed to protecting your personal data, images, and video content captured
              during our services. This policy explains how we collect, use, and safeguard your information.
            </p>

            {/* 1 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              1. Information We Collect
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              When you book or use our services, we may collect:
            </p>

            <ul className="list-disc list-inside text-gray-700 text-sm mb-4 space-y-1">
              <li>Full name, phone number, and email address</li>
              <li>Event details (weddings, corporate events, portraits, etc.)</li>
              <li>Location and shoot schedules</li>
              <li>Photographs and video recordings captured during sessions</li>
              <li>Communication history between you and our studio</li>
            </ul>

            {/* 2 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              2. How We Use Your Information
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              We use collected information strictly for professional service delivery, including:
            </p>

            <ul className="list-disc list-inside text-gray-700 text-sm mb-4 space-y-1">
              <li>Delivering photography and videography services</li>
              <li>Editing, storing, and delivering final media files</li>
              <li>Communicating with you about bookings and updates</li>
              <li>Improving our creative services and customer experience</li>
              <li>Maintaining internal business records</li>
            </ul>

            {/* 3 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              3. Use of Images & Video Content
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              All photos and videos captured remain the intellectual property of Mars Photography & Videography Studio
              unless otherwise agreed in writing.
            </p>

            <p className="text-gray-700 text-sm mb-4">
              We may use selected images or videos for portfolio, website, or marketing purposes
              (such as social media) only with your consent. Clients may request privacy or non-publishing
              of their content at the time of booking.
            </p>

            {/* 4 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              4. Data Storage & Security
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              We store your data and media files securely using protected storage systems.
              Access is strictly limited to authorized studio personnel.
            </p>

            <p className="text-gray-700 text-sm mb-4">
              While we take all reasonable precautions, no digital system is 100% secure,
              and we cannot guarantee absolute protection against unauthorized access.
            </p>

            {/* 5 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              5. Sharing of Information
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              We do not sell or rent your personal data or media content.
              We only share information when necessary to:
            </p>

            <ul className="list-disc list-inside text-gray-700 text-sm mb-4 space-y-1">
              <li>Deliver services (e.g. printing, editing, cloud storage)</li>
              <li>Comply with legal obligations if required</li>
              <li>Work with trusted editing or production partners under confidentiality</li>
            </ul>

            {/* 6 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              6. Your Rights
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              You have the right to:
            </p>

            <ul className="list-disc list-inside text-gray-700 text-sm mb-4 space-y-1">
              <li>Request access to your personal data</li>
              <li>Request deletion of your stored information (where legally applicable)</li>
              <li>Request non-use of your photos/videos in marketing</li>
              <li>Withdraw consent for future usage</li>
            </ul>

            {/* 7 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              7. Cookies & Website Tracking
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              Our website may use cookies and analytics tools to improve user experience,
              understand traffic, and optimize performance.
              You can disable cookies in your browser settings if preferred.
            </p>

            {/* 8 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              8. Policy Updates
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              We may update this Privacy Policy occasionally to reflect service or legal changes.
              All updates will be posted on this page with a revised date.
            </p>

            {/* CONTACT */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              9. Contact Us
            </h2>

            <p className="text-gray-700 text-sm mb-4">
              If you have any questions regarding this Privacy Policy or your media content,
              please contact us:
            </p>

            <p className="text-gray-700 font-semibold text-sm">
              Email: marsprinters@gmail.com <br />
              Phone: +254 717 037785 <br />
              Location: Kimilili, Kenya
            </p>

          </div>
        </section>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
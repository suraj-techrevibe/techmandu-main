import { Link } from '@remix-run/react';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import React from 'react';
import KhaltiIcon from '~/assets/svgs/payment-methods/khalti.svg';
import StripeIcon from '~/assets/svgs/payment-methods/stripe.svg';
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from '~/constants';
import { RootLoaderData } from '~/root';

interface FooterProps {
  staticPages: RootLoaderData['staticPages'];
  socialLinks: RootLoaderData['socialLinks'];
}

const NewFooter = ({ staticPages, socialLinks }: FooterProps) => {
  const socialLinksObject = React.useMemo(() => {
    if (!socialLinks) return [];

    const links = [];

    if (socialLinks.facebook) {
      links.push({
        name: 'Facebook',
        href: socialLinks.facebook,
        icon: FacebookIcon,
      });
    }
    if (socialLinks.twitter) {
      links.push({
        name: 'Twitter',
        href: socialLinks.twitter,
        icon: TwitterIcon,
      });
    }
    if (socialLinks.instagram) {
      links.push({
        name: 'Instagram',
        href: socialLinks.instagram,
        icon: InstagramIcon,
      });
    }
    if (socialLinks.linkedin) {
      links.push({
        name: 'LinkedIn',
        href: socialLinks.linkedin,
        icon: LinkedinIcon,
      });
    }
    if (socialLinks.youtube) {
      links.push({
        name: 'YouTube',
        href: socialLinks.youtube,
        icon: YoutubeIcon,
      });
    }
    if (socialLinks.whatsapp) {
      links.push({
        name: 'WhatsApp',
        href: socialLinks.whatsapp,
        icon: MessageCircleIcon,
      });
    }
    if (socialLinks.tiktok) {
      links.push({
        name: 'TikTok',
        href: socialLinks.tiktok,
        icon: TwitterIcon,
      });
    }

    return links;
  }, [socialLinks]);

  const companyLinks = staticPages.items
    ?.filter((item) => item?.group?.slug?.includes('company'))
    .map((item) => ({
      name: item.title,
      href: `/static/${item.slug}`,
    }));

  const usefulLinks = [
    ...(staticPages.items
      ?.filter((item) => item?.group?.slug?.includes('useful'))
      .map((item) => ({
        name: item.title,
        href: `/static/${item.slug}`,
      })) || []),
    { name: 'Techmandu for Business', href: '/techmandu-for-business' },
  ];

  const contactUsLinks = staticPages.items
    ?.filter((item) => item?.group?.slug?.includes('contact'))
    .map((item) => ({
      name: item.title,
      href: `/static/${item.slug}`,
    }));

  const contactDetails = [
    { type: 'email', value: COMPANY_EMAIL, icon: MailIcon },
    { type: 'phone', value: COMPANY_PHONE, icon: PhoneIcon },
    {
      type: 'location',
      value: COMPANY_ADDRESS,
      icon: MapPinIcon,
    },
  ];

  const aboutText =
    'It is your all-in-one destination for the latest gadgets, home appliances, and cutting-edge electronics. From smartphones to smart home devices, we bring you quality, variety, and unbeatable prices.';

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {/* About Section - Full width on mobile, spans 2 columns on tablet, 1 column on desktop */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-xs md:text-sm font-semibold mb-3">
              About Techmandu
            </h3>
            <p className="text-white/80 text-xs leading-relaxed mb-4">
              {aboutText}
            </p>

            {/* Social Media Icons - Show on mobile and tablet */}
            <div className="flex gap-3 lg:hidden">
              {socialLinksObject.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label={social.name}
                    target="_blank"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold mb-3">Company</h3>
            <LinksGroup links={companyLinks} />
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold mb-3">
              Useful Links
            </h3>
            <LinksGroup links={usefulLinks} />
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold mb-3">
              Contact Us
            </h3>
            <LinksGroup links={contactUsLinks} />
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold mb-3">Details</h3>
            <div className="space-y-2">
              {contactDetails.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <div
                    key={contact.type}
                    className="flex items-start text-white/80 text-[10px] leading-tight"
                  >
                    <IconComponent
                      size={12}
                      className="mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span className="break-words">{contact.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods Section */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold mb-3">
              Payment Methods
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white px-3 py-1.5 rounded">
                <img src={KhaltiIcon} className="h-6 w-auto" alt="Khalti" />
              </div>
              <div className="bg-white px-3 py-1.5 rounded">
                <img src={StripeIcon} className="h-6 w-auto" alt="Stripe" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons - Show only on desktop */}
        <div className="hidden lg:flex gap-3 mt-8 pt-8">
          {socialLinksObject.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                className="text-white hover:text-white/80 transition-colors"
                aria-label={social.name}
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/20 mt-6 pt-6">
          <div className="text-center text-white/60">
            © 2025 Techmandu — All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;

function LinksGroup({ links }: { links: { name: string; href: string }[] }) {
  if (!links || !links?.length) {
    return <p className="text-gray-400">No links available</p>;
  }
  return (
    <ul className="space-y-2">
      {links?.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-white/80 hover:text-white text-xs transition-colors block"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

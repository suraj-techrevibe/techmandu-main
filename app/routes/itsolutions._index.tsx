import { Link } from '@remix-run/react';
import { ArrowRight, CheckCircle2, Minus, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

import featuredCardBorderSvg from '~/assets/svgs/featured-card-border.svg';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How can I contact the techmandu Team?',
    answer: (
      <>
        <span className="text-black">
          You can reach us through our contact form on our website or by
          emailing us at
        </span>{' '}
        <span className="text-black font-medium">
          techmandusolutions@gmail.com
        </span>
        .{' '}
        <span className="text-black">
          We typically respond within 24 hours.
        </span>
      </>
    ),
  },
  {
    id: 'faq-2',
    question: 'What services do you offer?',
    answer:
      'We specialize in UI/UX design, custom website development, e‑commerce solutions, digital marketing, and ongoing technical support tailored to your business needs.',
  },
  {
    id: 'faq-3',
    question: 'Do you provide website maintenance services?',
    answer:
      'Yes. We offer ongoing maintenance plans that include content updates, security patches, performance optimizations, and regular backups to keep your website running smoothly.',
  },
  {
    id: 'faq-4',
    question: 'How long does it take to design and develop a website?',
    answer:
      'Timelines vary depending on project scope, but most standard business websites are completed within 3–6 weeks from kickoff to launch.',
  },
  {
    id: 'faq-5',
    question: 'Do you require a deposit for projects?',
    answer:
      'Yes. To secure your project in our schedule, we typically require a 40–50% upfront deposit, with the remaining balance due upon completion and approval.',
  },
] as const;

export default function ITSolutionsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px] bg-[#001049] overflow-hidden">
        <div className="lg:w-[55%] flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-20">
          <div className="max-w-xl w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              ...YOUR ONE STOP SHOP FOR <br />
              <span className="text-[#F15A27]">DIGITAL IDENTITY,</span> <br />
              VERIFICATION & CUTTING <br />
              EDGE TECHNOLOGY <br />
              SOLUTIONS
            </h1>

            <div className="flex flex-wrap gap-4 mt-8 lg:mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#F15A27] px-8 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#E04A1F]"
              >
                <span>Book a Session</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-[45%] relative min-h-[300px] lg:min-h-full">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#001049] via-[#001049]/40 to-transparent hidden lg:block" />
          <img
            src="/heroService.jpg"
            alt="IT Solutions Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001049] to-transparent lg:hidden" />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#eee]">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-center">
            <div className="lg:w-[45%] space-y-6">
              <span className="text-[#F15A27] font-medium text-lg uppercase tracking-widest">
                About
              </span>
              <h2 className="text-4xl lg:text-[45px] font-bold text-gray-900 tracking-tight leading-tight">
                ABOUT US
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-[480px]">
                techmandu is a forward-thinking digital solutions provider
                dedicated to helping businesses and individuals navigate the
                ever-evolving online landscape. With a commitment to delivering
                cutting-edge web services, innovative design, and unparalleled
                customer support, we have established ourselves as a trusted
                partner in the world of digital technology.
              </p>

              <div className="pt-6">
                <Link
                  to="/"
                  className="flex items-center justify-center text-[#FFFFFF] font-bold bg-[#f15a27] hover:bg-[#f15a27]/90 transition-all w-[268.55px] h-[65px] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[1000px] text-lg uppercase tracking-wider py-[18px] px-[36px] gap-[10px] shadow-[0px_1.85px_3.15px_0px_#44444406,0px_8.15px_6.52px_0px_#4444440A,0px_20px_13px_0px_#4444440D,0px_38.52px_25.48px_0px_#4444440F,0px_64.81px_46.85px_0px_#44444413,0px_100px_80px_0px_#4444441A]"
                >
                  EXPLORE MORE
                </Link>
              </div>
            </div>

            <div className="relative w-full lg:w-[613px] flex flex-col items-start lg:translate-x-[-3.66px]">
              <div className="relative w-full lg:w-[609.06px] h-[181px] overflow-hidden rounded-[22px] shadow-sm">
                <img
                  src="/itService-About.jpg"
                  alt="Top IT Support"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-28 h-28 text-[#F15A27]/70">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-[352.93px] mt-4">
                <div className="absolute top-0 left-0 lg:left-[3.66px] w-full lg:w-[609.06px] h-full rounded-[22px] overflow-hidden shadow-sm">
                  <img
                    src="/itService-Img.png"
                    alt="Global Services"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-40 sm:w-52 lg:w-[218.04px] h-[185px] rounded-[22px] overflow-hidden shadow-xl z-30">
                  <img
                    src="/ItServiceIng.jpg"
                    alt="Mobile Tech"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-[-10px] right-0 lg:right-[-20px] w-40 sm:w-48 lg:w-[230px] h-[82px] rounded-[22px] overflow-hidden border-[6px] border-[#DEDEDE] shadow-2xl z-40">
                  <img
                    src="/iTservice-Img.jpg"
                    alt="Coding"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36 bg-[#eeeeee] flex justify-center overflow-hidden">
        <div className="max-w-[1280px] w-full px-4 lg:px-8">
          <div className="flex flex-col items-center gap-20">
            <div className="text-center space-y-4">
              <span className="text-[#F15A27] font-semibold tracking-widest uppercase text-sm font-lato">
                Services
              </span>
              <h2 className="flex flex-col md:flex-row items-center justify-center gap-3 text-[#F15A27]">
                <span className="text-4xl lg:text-[42px] font-bold">
                  The Services We Offer
                </span>
                <span className="font-lato text-[32px] font-normal leading-tight tracking-[-0.02em] bg-[linear-gradient(279.69deg,#01A998_0%,#388BC6_100%)] bg-clip-text text-transparent">
                  For You
                </span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full">
              <ServiceCard
                title="UI/UX Design"
                description="User-centric interfaces that combine aesthetics with usability. We craft intuitive flows and pixel-perfect designs to elevate your product."
                imageSrc="/about-uiux-img.png"
                imageAlt="UI/UX Design"
                featured={false}
              />
              <ServiceCard
                title="Web Development"
                description="Custom web applications built with modern tech. Scalable, performant, and tailored to your business requirements."
                imageSrc="/about-web-development.png"
                imageAlt="Web Development"
                featured={true}
              />
              <ServiceCard
                title="Digital Marketing"
                description="Data-driven strategies to grow your reach. SEO, content, and campaigns that connect you with the right audience."
                imageSrc="/about-digitial-marketing.png"
                imageAlt="Digital Marketing"
                featured={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#eeeeee]">
        <div className="container px-4 md:px-8 mx-auto max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-[45%] space-y-8">
              <div className="space-y-4">
                <span className="text-[#F15A27] font-semibold tracking-widest uppercase text-sm font-lato">
                  Why Choose Us
                </span>
                <h2 className="text-4xl lg:text-[48px] font-bold text-gray-900 leading-[1.1]">
                  Why Businesses Trust Our IT Expertise
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-[500px]">
                  techmandu delivers smart, reliable IT solutions tailored to
                  drive your business forward with innovation and efficiency.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center text-white font-bold bg-[#f15a27] hover:bg-[#f15a27]/90 transition-all w-[240px] h-[60px] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[1000px] text-lg uppercase tracking-wider shadow-lg"
                >
                  GET IN TOUCH
                </Link>
              </div>

              <div className="pt-8">
                <img
                  src="/ItServiceExpertiseImg.jpg"
                  alt="IT Expertise Team"
                  className="w-full h-auto rounded-[20px] shadow-2xl"
                />
              </div>
            </div>

            <div className="lg:w-[55%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <ExpertiseCard
                title="Quality Delivery"
                items={[
                  'On-time Delivery',
                  'Seamless',
                  'Secure',
                  'Extensive Support',
                ]}
                iconSrc="/firstVector.svg"
              />
              <ExpertiseCard
                title="Tailored IT Solutions"
                items={[
                  'Reliability',
                  'Availability',
                  'Serviceability',
                  'Durability',
                ]}
                iconSrc="/secondVector.svg"
              />
              <ExpertiseCard
                title="Quality Results"
                items={[
                  'Measurable Results',
                  'Optimization',
                  'Satisfaction',
                  'Innovation',
                ]}
                iconSrc="/thirdVector.svg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F15A27] py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 p-8">
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute right-[20%] top-[22%] h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute right-16 top-[42%] h-36 w-36 rounded-full bg-white/10" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-start">
          <div className="max-w-[360px] space-y-6 lg:w-[40%]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              Got any questions?
            </p>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-[46px]">
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-white/80">
              Find quick answers to the most common questions our clients ask
              about working with techmandu.
            </p>
          </div>

          <div className="lg:w-[60%]">
            <div className="mx-auto flex max-w-[670px] flex-col gap-4">
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-1"
                className="flex flex-col gap-4"
              >
                {FAQ_ITEMS.map(({ id, question, answer }) => (
                  <AccordionItem key={id} value={id} className="border-none">
                    <div className="flex min-h-[70px] w-full max-w-[670px] flex-col justify-center rounded-[15px] border-[0.5px] border-white/30 bg-white/15 px-4 py-4">
                      <AccordionTrigger className="group flex items-center gap-4 border-none bg-transparent p-0 text-left text-base font-semibold lg:text-lg">
                        <span className="flex-1 text-white">{question}</span>
                        <span className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center text-white">
                          <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                          <Minus className="hidden h-4 w-4 group-data-[state=open]:block" />
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-3 text-sm leading-relaxed lg:text-[15px]">
                        {typeof answer === 'string' ? (
                          <p className="text-white/80">{answer}</p>
                        ) : (
                          <p className="text-sm text-white/80">{answer}</p>
                        )}
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[360px] w-full overflow-hidden md:min-h-[380px] lg:min-h-[400px] mb-0"
        style={{ backgroundColor: 'rgb(28, 48, 70)' }}
      >
        <img
          src="/itsolutions-last-section-img.jpg"
          alt="Start your IT journey"
          className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28, 48, 70, 0.7)' }}
        />

        <div className="relative flex min-h-[360px] w-full items-end justify-center px-4 pt-10 pb-1 md:min-h-[380px] md:px-8 lg:min-h-[400px] lg:pt-12 lg:pb-1">
          <div className="flex h-[320px] w-[700px] max-w-full flex-col justify-center gap-8 rounded-[32px] bg-[#FFFFFF33] pt-4 pr-8 pb-4 pl-8">
            <p className="mx-auto text-center font-lato text-[16px] font-normal leading-[24px] text-[#F15A27]">
              Are You Ready?
            </p>
            <h2 className="text-center text-2xl font-bold leading-tight text-white md:text-[38px]">
              Start Your IT Journey with Us
              <br />
              Today
            </h2>
            <p className="text-center text-base text-white/90 md:text-[17px]">
              Get expert guidance and reliable services to move your business
              forward.
            </p>
            <Link
              to="/contact"
              className="inline-flex w-fit h-[48px] items-center justify-center self-center rounded-lg bg-[#f15a27] hover:bg-[#f15a27]/90 px-8 text-base font-medium text-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  featured,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
}) {
  const isFeatured = Boolean(featured);

  return (
    <div
      className={`relative aspect-[353/473] ${
        isFeatured ? 'lg:h-[490px] max-w-[353px]' : 'lg:h-[398px] max-w-[308px]'
      }`}
    >
      {isFeatured && (
        <img
          src={featuredCardBorderSvg}
          alt="img"
          className="absolute h-full w-full translate-x-4 translate-y-4"
          style={{ filter: 'hue-rotate(170deg) saturate(2) brightness(1.1)' }}
        />
      )}

      <div
        className={`relative flex h-full flex-col items-center justify-between overflow-hidden rounded-[30px] border text-center transition-all duration-300 ${
          isFeatured
            ? 'border-4 border-[#F15A27] bg-transparent backdrop-blur-xl px-4 pt-8 pb-8 gap-8'
            : 'border-4 border-[#F15A27]/40 bg-transparent px-8 pt-6 pb-6 gap-5'
        }`}
      >
        <div className="flex flex-1 items-center justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-auto object-contain ${
              isFeatured ? 'max-h-[260px]' : 'max-h-[200px]'
            }`}
            style={{
              filter: [
                'drop-shadow(0px 4px 6px rgba(255, 100, 0, 0.3))',
                'drop-shadow(0px 8px 14px rgba(241, 90, 39, 0.2))',
                'drop-shadow(0px 16px 24px rgba(255, 160, 30, 0.15))',
                'drop-shadow(0px 22px 32px rgba(255, 200, 50, 0.1))',
              ].join(' '),
            }}
          />
        </div>

        <div className="flex flex-col gap-3 pb-4">
          <h3 className="text-[26px] font-semibold text-[#F15A27] tracking-[0.03em] leading-tight">
            {title}
          </h3>
          <p className="text-[9px] leading-relaxed text-black px-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ExpertiseCard({
  title,
  items,
  iconSrc,
}: {
  title: string;
  items: string[];
  iconSrc: string;
}) {
  return (
    <div className="w-full lg:w-[457px] min-h-[272px] rounded-[20px] p-8 flex flex-col justify-center relative shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
      <div className="flex justify-between items-start w-full gap-2.5">
        <div className="space-y-6 flex-grow">
          <h3 className="text-2xl font-bold text-[#F15A27] tracking-tight">
            {title}
          </h3>
          <ul className="grid grid-cols-1 gap-y-3">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-gray-700 text-sm font-medium"
              >
                <span className="flex-grow">{item}</span>
                <div className="bg-white/10 p-1 rounded-full shadow-inner border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex h-[50px] w-[49.69px] shrink-0 items-center justify-center rounded-[5px] bg-[linear-gradient(135.62deg,#FFFFFF_3.99%,#F15A27_96%)] px-[10px] py-[15px] opacity-100">
          <img
            src={iconSrc}
            alt=""
            aria-hidden
            className="h-full w-auto max-h-full max-w-full scale-110 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

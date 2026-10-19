import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import mobileAppDevSvg from '~/assets/svgs/mobile_app_dev.svg'
import ecommerceDevSvg from '~/assets/svgs/ecommerce_development.svg'
import websiteDesignSvg from '~/assets/svgs/website_design.svg'
import softwareDevSvg from '~/assets/svgs/software_development.svg'
import cloudDevOpsSvg from '~/assets/svgs/cloud_devops.svg'
import digitalMarketingSvg from '~/assets/svgs/digital_marketing.svg'

const services = [
  {
    title: "Mobile App Development",
    icon: mobileAppDevSvg,
    description: "Crafting intuitive and high-performing apps that connect brands with customers seamlessly."
  },
  {
    title: "E-commerce Development",
    icon: ecommerceDevSvg,
    description: "Build your online store with features that simplify sales, boost conversions, and scale effortlessly."
  },
  {
    title: "Website Design",
    icon: websiteDesignSvg,
    description: "Beautiful, responsive, and optimized websites that leave lasting impressions."
  },
  {
    title: "Software Development",
    icon: softwareDevSvg,
    description: "Customized smart, secure and scalable software solutions tailored to your business needs. "
  },
  {
    title: "Cloud & DevOps",
    icon: cloudDevOpsSvg,
    description: "Accelerate deployment, enhance security, and scale smarter with our cloud and DevOps support."
  },
  {
    title: "Digital Marketing",
    icon: digitalMarketingSvg,
    description: "Drive leads, grow visibility, and dominate the digital space with strategic marketing campaigns."
  },
]


const Solutions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-4 sm:mb-6">Our IT Solutions</h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl px-4 sm:px-0">
          We provide high quality tech with different digital experiences especially designed to help your business.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {services.map((service, index) => (
          <div key={index} className="p-4 border-2 sm:p-6 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4">
              <img src={service.icon} alt={service.title} className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-0 sm:mr-4 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{service.title}</h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>


      {/* CTA Section
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 px-4 sm:px-0">
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
          Get a Quote <ArrowRightCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
          Learn more
        </button>
      </div> */}
    </div>
  )
}

export default Solutions
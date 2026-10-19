import React from 'react'

const OurBussinessComponent = () => {
  const businessStats = [
    {
      number: "300+",
      label: "Service Center"
    },
    {
      number: "430+", 
      label: "Project Delivered"
    },
    {
      number: "85+",
      label: "Team Members"
    },
    {
      number: "99%",
      label: "Customer Satisfaction"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section - Match HighestSellingProducts structure */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary2 mb-4 sm:mb-0">
          Our Business
        </h1>
        {/* Optional: Add a link or keep empty for alignment */}
        <div className="hidden sm:block"></div>
      </div>

      {/* Stats Grid - Match the grid structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {businessStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
              {stat.number}
            </div>
            <div className="text-gray-600 text-sm sm:text-base font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurBussinessComponent
import React from 'react'

const ServiceCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
  {filteredServices.map((service) => (
    <ServiceCard
      key={service.id}
      id={service.id}
      name={service.name}
      category={categoryName}
      city={cityName}
    />
  ))}
</div>
  )
}

export default ServiceCard
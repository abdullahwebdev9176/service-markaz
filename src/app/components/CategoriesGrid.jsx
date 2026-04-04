import React from 'react';
import Link from 'next/link';

const CategoriesGrid = ({ 
  categories, 
  href = (category) => `/categories/${category.slug}`,
  className = "w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%]"
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.slug}
            href={href(category)}
            className={`${className} bg-white border border-gray-200 shadow-sm rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition`}
          >
            <Icon size={40} className="mx-auto text-blue-600" />
            <p className="mt-3 font-medium text-gray-700">
              {category.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;

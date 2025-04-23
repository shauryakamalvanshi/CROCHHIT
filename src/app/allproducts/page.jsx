import React from 'react'
import Card from '../components/ProductCard'

const page = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 xl:px-40 py-8">
      <h1 className="mb-10 font-serif text-3xl font-bold text-black text-center sm:text-left">
        All Products
      </h1>
      <div className="flex justify-center sm:justify-start">
        <Card />
      </div>
    </div>
  )
}

export default page

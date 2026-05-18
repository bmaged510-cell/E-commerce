import { getAllCategories } from '@/api/services/routemisr.service';
import React from 'react'

type CategoryType = {
  _id: string;
  name: string;
  image: string;
}

export default async function HomeCategories() {



  const allCategories = await getAllCategories();

  return (
    <>
      <div className="w-[90%] mx-auto my-8">
        <h1 className="text-4xl font-bold mx-auto border-s-8 border-[#16A34A] ps-2">
          Shop by <span className="text-[#16A34A]">Category</span>
        </h1>
      <div className='flex flex-wrap my-6'>
          {allCategories?.map((category)=> <div className='w-full md:w-1/2 lg:w-1/4 xl:w-1/6 p-3' key={category._id}>
         <div className='p-4 flex flex-col gap-3 items-center border rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer'>
          <img src={category.image} className="size-20 rounded full" alt="" />
          <h2>{category.name}</h2>
         </div>
        </div>)}
      </div>
      </div>
    </>
  );
}
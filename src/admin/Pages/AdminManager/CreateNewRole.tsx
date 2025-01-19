import React from 'react'
import ImportImgs from '../../components/ImportImgs'

const CreateNewRole = () => {
    const images = ImportImgs();
  return (
    <section>
        <div className="w-[95%] mx-auto h-full py-10">
            <div className='flex items-center gap-'>
                <img src={images.arrowleft} alt='Arrow-left' />
                <h2 className="text-2xl font-semibold">Create New Role</h2>
            </div>
            <div>
                
            </div>
        </div>
    </section>
  )
}

export default CreateNewRole

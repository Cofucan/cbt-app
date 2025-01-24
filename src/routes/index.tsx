import { createFileRoute, useNavigate } from '@tanstack/react-router'
import ImportingImgs from '../student/Components/ImportingImgs.tsx'
import { useEffect, useState } from 'react'
import { getSchoolConfig } from '../student/api/auth.ts'
import { baseUrl } from '../lib/utils.ts'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const images = ImportingImgs()
  const navigate = useNavigate()
  const [schoolLogo, setSchoolLogo] = useState('')

  useEffect(() => {
    const fetchSchoolLogo = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const logoData = await getSchoolConfig()
          const logoPath = logoData?.logo

          const logoUrl = logoPath
            ? `${baseUrl}/media/${logoPath}`
            : images.mainLogo
          setSchoolLogo(logoUrl)

          console.log('School Logo URL in landingPage:', logoPath)
        } else {
          console.error('No token found in localStorage')
        }
      } catch (error) {
        console.error('Error fetching school logo:', error)
      }
    }

    fetchSchoolLogo()
  }, [])

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${images.bgImgMain})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      <div className="z-10 flex flex-col items-center justify-center gap-5">
        <div>
          <img
            src={schoolLogo}
            // src={images.enugun}
            alt="School Logo"
            className="bg-cover bg-center"
            width={200}
          />
        </div>

        <div
          className="text-center text-white"
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '8px 5px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          <h1 className="mb-4 text-2xl font-bold md:text-5xl lg:my-8 lg:text-7xl">
            Welcome to ESUT
          </h1>
          <h2 className="mb-8 text-2xl font-bold md:text-5xl lg:text-7xl">
            CBT Portal
          </h2>

          <div className="flex justify-center font-semibold">
            <button
              onClick={() => navigate({ to: '/student/login' })}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#FF6636] px-8 py-4 text-lg text-white md:text-3xl lg:px-10 lg:text-3xl"
            >
              Proceed To Login
              <img src={images.arrowRight} alt="Proceed" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

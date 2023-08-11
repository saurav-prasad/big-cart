import React from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'

function Breadcrumbs() {

    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className='mt-4'>
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li >
                    <div className="flex items-center">
                        {/* <a  className="mr-2 text-sm font-medium text-gray-900"> */}
                        <span href='/' className="mr-2 text-sm font-medium text-gray-900">
                            Home                        </span>
                        <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                        >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                </li>
                {pathnames.map((breadcrumb) => (
                    (pathnames[(pathnames.length - 1)] !== breadcrumb) &&
                    <li>
                        <div className="flex items-center">
                            {/* <a  className="mr-2 text-sm font-medium text-gray-900"> */}
                            <span href='/' className="mr-2 text-sm font-medium text-gray-900">
                                { breadcrumb}
                            </span>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                ))}
                <li className="text-sm">
                    <span aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        {pathnames[(pathnames.length - 1)]}
                    </span>
                </li>
            </ol>
        </nav >

    )
}

export default Breadcrumbs
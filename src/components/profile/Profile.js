import { useUserState } from "../../context/UserState"

export default function Profile() {

    const [{ userDetails },] = useUserState()

    return (
        <div className="max-w-screen-md	mt-14 select-all mb-10 mx-auto">
            <div>
                <h1 className="text-3xl font-semibold leading-7 text-gray-900">Your Profile</h1>
            </div>
            <div className="px-4 sm:px-0 mb-8 mt-12">
                <img
                    className="inline-block object-contain h-24 w-24 rounded-md"
                    src={userDetails?.photo}
                    alt={userDetails?.name}
                />
                <p className="mt-1 text-sm leading-6 text-gray-500">User ID: {userDetails?.uid}</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">User-id</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails?.uid}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails?.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails?.email}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

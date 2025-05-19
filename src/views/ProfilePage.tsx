const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span className="text-4xl font-bold text-gray-400">M</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Mathew Thompson</h2>
            <p className="text-gray-500 mb-4">UI/UX Designer</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>mathew@example.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>+1 234 567 890</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>San Francisco, CA</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p>Design</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="bg-primary text-white px-4 py-2 rounded-md">Edit Profile</button>
              <button className="border border-gray-300 px-4 py-2 rounded-md">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import { useAuthStore } from '@/store';
import { Building, Hash, Mail, User, UserCheck } from 'lucide-react';
export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="container">
      <div className="relative z-10 p-8 md:p-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-16">
          {/* Avatar with glow effect */}
          <div className="relative mb-6">
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 bg-primary`}
            ></div>
            <div
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-110 bg-primary`}
            >
              <span className="text-4xl font-bold text-foreground drop-shadow-lg">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-3 transition-colors duration-700
                text-foreground
              `}
            >
              {user?.name}
            </h1>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Name Card */}
          <div
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl
bg-card border border-border
            `}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 bg-primary/10 border border-primary`}
              >
                <User className={`w-6 h-6 transition-colors duration-500 text-primary`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-2 transition-colors duration-500 text-muted-foreground`}
                >
                  Full Name
                </p>
                <p
                  className={`text-xl font-bold break-words transition-colors duration-500 text-foreground`}
                >
                  {user?.name}
                </p>
              </div>
            </div>
          </div>

          {/* LDAP ID Card */}
          <div
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-card border border-border`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 bg-primary/10 border border-primary`}
              >
                <Hash className={`w-6 h-6 transition-colors duration-500 text-primary`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-2 transition-colors duration-500 text-muted-foreground`}
                >
                  LDAP ID
                </p>
                <p
                  className={`text-xl font-bold break-words transition-colors duration-500 text-foreground`}
                >
                  {user?.ldapid}
                </p>
              </div>
            </div>
          </div>

          {/* Institute ID Card */}
          <div
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-card border border-border`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 bg-primary/10 border border-primary`}
              >
                <Building className={`w-6 h-6 transition-colors duration-500 text-primary`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-2 transition-colors duration-500 text-muted-foreground`}
                >
                  Institute ID
                </p>
                <p
                  className={`text-xl font-bold break-words transition-colors duration-500 text-foreground`}
                >
                  {user?.idNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-card border border-border`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 bg-primary/10 border border-primary`}
              >
                <Mail className={`w-6 h-6 transition-colors duration-500 text-primary`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-2 transition-colors duration-500 text-muted-foreground`}
                >
                  Email Address
                </p>
                <p
                  className={`text-xl font-bold break-words transition-colors duration-500 text-foreground`}
                >
                  {user?.ldapid}@iitbhilai.ac.in
                </p>
              </div>
            </div>
          </div>

          {/* Roles Card (Full Width) */}
          <div
            className={`group relative overflow-hidden rounded-2xl p-6 col-span-1 md:col-span-2 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-card border border-border`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-xl transition-all duration-500 group-hover:scale-110 bg-primary/10 border border-primary `}
              >
                <UserCheck className={`w-6 h-6 transition-colors duration-500 text-primary`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium mb-4 transition-colors duration-500 text-muted-foreground`}
                >
                  User Roles
                </p>
                <div className="flex flex-wrap gap-3">
                  {user?.roles?.map((role, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-chip-purple/10 border border-chip-purple text-chip-purple`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-16 pt-8 border-t border-gray-200/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className={`text-2xl font-bold transition-colors duration-700 text-foreground`}>
                24/7
              </p>
              <p className={`text-sm transition-colors duration-700 text-muted-foreground`}>
                Active Status
              </p>
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-700 text-foreground`}>
                {user?.roles?.length || 0}
              </p>
              <p className={`text-sm transition-colors duration-700 text-muted-foreground`}>
                Active Roles
              </p>
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-700 text-foreground`}>
                100%
              </p>
              <p className={`text-sm transition-colors duration-700 text-muted-foreground`}>
                Access Level
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { logos } from '@/assets';
export const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white text-gray-900 dark:from-black dark:via-gray-900 dark:to-black dark:text-white">
      <div className="relative w-full h-screen overflow-hidden">
        {/* SVG Background Images */}
        <img
          src={logos.short.light}
          alt="HorizonX Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 dark:hidden"
        />
        <img
          src={logos.short.dark}
          alt="HorizonX Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 hidden dark:block"
        />

        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10 z-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/40 to-white/90 dark:from-black/90 dark:via-black/40 dark:to-black/90" />

        {/* Floating Elements */}

        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse z-10 bg-[#e3eafc]/40 dark:bg-[#2d3c6b]/30" />
        <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full blur-xl animate-pulse delay-700 z-10 bg-[#eee6fa]/40 dark:bg-[#3e2d60]/30" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-xl animate-pulse delay-1000 z-10 bg-[#e7e9f7]/40 dark:bg-[#2e314f]/30" />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 animate-slide-up">
            <span className="bg-primary bg-clip-text text-transparent">HorizonX</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mb-12 leading-relaxed animate-slide-up delay-200 text-muted-foreground">
            One Platform. Every Service.{' '}
            <span className="font-semibold text-primary">Zero Hassle.</span>
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 rounded-xl bg-primary text-primary-foreground text-xl font-bold shadow-lg hover:bg-primary/90 transition-all duration-200 animate-slide-up delay-300"
          >
            Sign up for free
          </a>
        </div>
      </div>
    </div>
  );
};

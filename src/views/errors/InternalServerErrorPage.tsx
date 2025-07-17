const InternalServerErrorPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary">500</h1>
      <h2 className="text-2xl font-semibold mt-4">Internal Server Error</h2>
      <p className="mt-2 text-muted-foreground">
        Something went wrong on our end. Please try again later.
      </p>
    </div>
  );
};

export default InternalServerErrorPage; 
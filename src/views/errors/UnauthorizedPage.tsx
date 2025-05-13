import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-destructive">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Unauthorized Access</h2>
      <p className="mt-2 text-muted-foreground">
        You don't have permission to access this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
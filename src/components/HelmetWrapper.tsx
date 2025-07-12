import { Transitions, Button } from '@/components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

type HelmetWrapperProps = {
  title?: string;
  description?: string;
  keywords?: string;
  heading?: string;
  subHeading?: string;
  isBackbuttonVisible?: boolean;
  children?: React.ReactNode;
};

export const HelmetWrapper: React.FC<HelmetWrapperProps> = ({
  title = 'Seamless',
  description = 'Seamless Management System',
  keywords = 'default, keywords',
  heading,
  subHeading,
  children,
  isBackbuttonVisible = false,
}) => {
  const navigate = useNavigate();
  return (
    <Transitions type="slide" direction="down" position="top" show={true}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>

      {(heading || subHeading || isBackbuttonVisible) && (
        <div className="mx-6 mt-6 mb-4">
          <div className="rounded-2xl shadow-lg border border-muted bg-card p-6 transition-all duration-300">
            {/* Back button above heading */}
            {isBackbuttonVisible && (
              <div className="mb-4 flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className={`
        group w-auto px-4 py-2 flex items-center gap-2 font-semibold
        bg-primary border-none shadow
        transition-all duration-300
        animate-fade-in
      `}
                  // gradient-to-r from-primary to-secondary
                  style={{ boxShadow: '0 2px 8px 0 rgba(60,60,180,0.08)' }}
                >
                  <span className="relative flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </span>
                </Button>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                {heading && (
                  <h1 className="xl:text-3xl text-lg md:text-2xl font-bold text-foreground truncate relative pb-2">
                    {heading}
                    <span className="block h-1 w-16 bg-gradient-to-r from-primary to- rounded-full mt-2" />
                  </h1>
                )}
                {subHeading && (
                  <div className="mt-1 text-base md:text-lg text-muted-foreground font-medium">
                    {subHeading}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto p-6">{children}</div>
    </Transitions>
  );
};

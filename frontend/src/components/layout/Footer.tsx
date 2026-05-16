import type { FC } from "react";

interface FooterProps {
  year: number,
  authorName: string,
  authorUrl: string,
  description: string,
} 

const Footer: FC<FooterProps> = ({ year, authorName, authorUrl, description }) => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          {/* Copyright Text */}
          <p className="text-sm text-gray-600 text-center">
            &#169; {year}{' '}
            <a
              href={authorUrl}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              aria-label={`Visit ${authorName}'s profile`}
            >
              {authorName}{' '}
            </a>

            {/* Description */}
            {description && (
              <span>
                {description}
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
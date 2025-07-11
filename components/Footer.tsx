import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Aetherium Nova Project. All Rights Reserved. This is a conceptual demonstration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';

const MainFooter = () => {
  return (
    <footer className="px-6 py-3 text-xs text-muted-foreground border-t bg-muted/30">
      <div className="flex justify-between items-center">
        <span>© 2025 Recogx Init. All rights reserved.</span>
        <div className="flex items-center space-x-4">
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link to="/support" className="hover:underline">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;


import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="bg-chai-blue text-white p-1 rounded-md mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-chai-darkblue">CrisisChain</span>
            </div>
            <p className="text-sm text-chai-gray mt-2">Blockchain-Powered Aid Distribution for Africa</p>
          </div>
          
          <div className="flex space-x-6 md:space-x-10">
            <Link to="/about" className="text-chai-gray hover:text-chai-blue text-sm">About</Link>
            <Link to="/privacy" className="text-chai-gray hover:text-chai-blue text-sm">Privacy</Link>
            <Link to="/terms" className="text-chai-gray hover:text-chai-blue text-sm">Terms</Link>
            <Link to="/contact" className="text-chai-gray hover:text-chai-blue text-sm">Contact</Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-chai-gray">© 2025 CrisisChain. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-center text-chai-gray">
          <p>Powered by Cardano | IPFS | Biometric Authentication</p>
          <p className="mt-1">This is a demo application for humanitarian aid distribution using blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}

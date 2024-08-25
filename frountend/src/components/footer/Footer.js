import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="mb-8 sm:mb-0">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Flowbite Logo"
                className="h-8"
              />
              <span className="ml-2 text-xl font-semibold">Flowbite</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h5 className="text-lg font-semibold mb-2">About</h5>
              <ul>
                <li>
                  <a href="/flowbite" className="hover:underline">
                    Flowbite
                  </a>
                </li>
                <li>
                  <a href="/tailwind-css" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
              <ul>
                <li>
                  <a href="/github" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="/discord" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-2">Legal</h5>
              <ul>
                <li>
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Flowbite™. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <a href="/facebook" className="text-gray-400 hover:text-white">
              <FacebookIcon />
            </a>
            <a href="/instagram" className="text-gray-400 hover:text-white">
              <InstagramIcon />
            </a>
            <a href="/twitter" className="text-gray-400 hover:text-white">
              <XIcon />
            </a>
            <a href="/github" className="text-gray-400 hover:text-white">
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

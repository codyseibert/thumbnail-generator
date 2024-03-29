import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="relative z-10 bg-white text-gray-800">
      <div
        tabIndex={0}
        aria-label="footer"
        className="focus:outline-none border-t border-b border-gray-200 py-16"
      >
        <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
          <div className="lg:flex">
            <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
              <div className="w-full lg:w-1/2 px-6">
                <ul>
                  <li className="mt-6">
                    <a className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand text-gray-800 ">
                      Templates
                    </a>
                  </li>
                  <li className="mt-6">
                    <a className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand text-gray-800">
                      Pricing
                    </a>
                  </li>
                  <li className="mt-6">
                    <a className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand text-gray-800">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2 px-6">
                <ul>
                  <li>
                    <a className="focus:outline-none focus:underline text-xs lg:text-sm leading-none hover:text-brand text-gray-800">
                      Free templates
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex">
              <div className="w-full lg:w-1/2 px-6">
                <ul>
                  <li>
                    <a className="focus:underline focus:outline-none text-xs lg:text-sm leading-none hover:text-brand text-gray-800">
                      Privacy policy
                    </a>
                  </li>
                  <li className="mt-6">
                    <a className="focus:underline focus:outline-none text-xs lg:text-sm leading-none hover:text-brand text-gray-800">
                      Terms of service
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <a aria-label="Github">
                    <div className="text-gray-800 cursor-pointer hover:text-brand">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_1-svg1.svg"
                        alt="Github"
                      />
                    </div>
                  </a>
                  <a aria-label="Twitter" className="ml-4">
                    <div className="text-gray-800 cursor-pointer hover:text-brand">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_1-svg2.svg"
                        alt="Twitter"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

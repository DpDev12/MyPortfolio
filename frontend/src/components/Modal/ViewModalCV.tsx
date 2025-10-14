import { FaDownload, FaPhone, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useState } from "react";

interface ViewModalCVProps<T = any> {
  item: T | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewModalCV = <T,>({
  item,
  isOpen,
  onClose
}: ViewModalCVProps<T>) => {
  const [pdfError, setPdfError] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  if (!isOpen || !item) return null;

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/PAUL_ARGIE_PURISIMA-RESUME-Updated.pdf';
    link.download = 'Paul_Argie_Purisima_Resume.pdf';
    link.click();
  };

  const handleViewFullPDF = () => {
    window.open('/PAUL_ARGIE_PURISIMA-RESUME-Updated.pdf', '_blank');
  };

  const handlePdfError = () => {
    setPdfError(true);
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white flex flex-col h-full max-h-[90vh] rounded-lg max-w-4xl w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 pr-8">Hi, I am Paul!</h2>
            <span className="text-blue-400 flex items-center gap-2">
              <FaPhone className="transform -scale-x-100" />
              <p>+63 938-995-4732</p>
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadResume}
              className="p-2 bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              type="button"
              title="Download Resume"
            >
              <FaDownload className="text-black group-hover:animate-bounce" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-gray-100 rounded-full transition-colors duration-200"
              type="button"
            >
              <FaX className="text-black" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Description */}
            <p className="text-neutral-900 text-base md:text-lg text-justify">
              Specializing in modern web development with proficiency in
              React, Laravel, JavaScript, and responsive design.
              I combine technical expertise with creative problem-solving to
              build applications that are both functional and visually appealing.
            </p>
            
            {/* PDF Preview Section */}
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="bg-gray-100 p-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Resume Preview</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleViewFullPDF}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                  >
                    <FaEye size={12} />
                    View Full
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    <FaDownload size={12} />
                    Download
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer with Fallback */}
              <div className="h-96 bg-white">
                {!pdfError ? (
                  <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    className="w-full h-full border-none"
                    title="Resume Preview"
                    onError={handlePdfError}
                    onLoad={() => console.log('PDF loaded successfully')}
                  />
                ) : (
                  // Fallback when PDF can't load
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50">
                    <div className="mb-4 text-gray-400">
                      <FaExternalLinkAlt size={48} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      PDF Preview Not Available
                    </h4>
                    <p className="text-gray-600 mb-4 max-w-md">
                      Your browser may not support inline PDF viewing. 
                      Click the buttons below to view or download the resume.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleViewFullPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <FaEye size={14} />
                        Open PDF
                      </button>
                      <button
                        onClick={handleDownloadResume}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <FaDownload size={14} />
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alternative: Show resume content as text/images */}
            {/* <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Overview:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Technical Skills:</h5>
                  <ul className="text-gray-600 space-y-1">
                    <li>• React.js & TypeScript</li>
                    <li>• Laravel & PHP</li>
                    <li>• JavaScript (jQuery)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Experience:</h5>
                  <ul className="text-gray-600 space-y-1">

                    <li>• Full-Stack Development</li>
                    <li>• Responsive Web Design</li>
                    <li>• API Integration</li>
                    <li>• Database Management</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex gap-2">
            <button
              onClick={handleViewFullPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <FaEye size={14} />
              View PDF
            </button>
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FaDownload size={14} />
              Download
            </button>
          </div>
          
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer px-4 py-2 text-gray-700 bg-gradient-to-r from-indigo-50 to-blue-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
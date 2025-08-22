
import { BsEmojiGrin } from 'react-icons/bs';
import { FaX } from 'react-icons/fa6';

interface ViewProjectModalProps<T = any> {
  item: T | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewProjectModal = <T,>({ 
  item, 
  isOpen, 
  onClose 
}: ViewProjectModalProps<T>) => {
  if (!isOpen || !item) return null;

return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
       
      {/* <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"> */}
      <div className="bg-white flex flex-col h-full max-h-[50vh] rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0 rounded-t-2xl">
          <div className='flex'>
            <h2 className="text-2xl font-bold text-gray-900 pr-8">Oops! Sorry...</h2>
            <span className='text-red-500 text-3xl'><BsEmojiGrin/></span>
          </div>
          <div className="flex gap-2">
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
        <div className="p-6">
          <p className="text-neutral-900 text-base md:text-lg text-justify">
            "This is a prototype version with core features only."
          </p>
          <p className="text-neutral-900 text-base md:text-lg text-justify">
            "Limited functionality - full version coming soon!"
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer px-4 py-2 text-gray-700 bg-gradient-to-r from-indigo-50 to-blue-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
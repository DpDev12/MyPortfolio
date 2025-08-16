// hooks/useModal.ts
import { User } from '@/types';
import { useState, useEffect } from 'react';

interface UseModalReturn<T = any> {
  isOpen: boolean;
  data: T | null;
  openModal: (modalData?: T) => void;
  closeModal: () => void;
}

export const useModal = <T = any>(): UseModalReturn<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (modalData: T | null = null): void => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setData(null);
  };

  // Handle escape key and cleanup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return {
    isOpen,
    data,
    openModal,
    closeModal,
  };
};

// Project-specific interfaces
interface Project {
  id: number;
  title: string;
  body: string;
  status: string;
  image?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

interface UseProjectModalReturn {
  isOpen: boolean;
  project: Project | null;
  openProjectModal: (project: Project) => void;
  closeModal: () => void;
}

// Specialized hook for projects
export const useProjectModal = (): UseProjectModalReturn => {
  const modal = useModal<Project>();
     
  const openProjectModal = (project: Project): void => {
    modal.openModal(project);
  };

  return {
    isOpen: modal.isOpen,
    project: modal.data, // Alias data to project
    openProjectModal,
    closeModal: modal.closeModal,
  };
};

// Testimony-specific interfaces
interface Testimony {
  id: number;
  name: string;
  email: string;
  title: string;
  location: string;
  testimonial: string;
  image?: string;
  image_url?: string;
  companyname?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface UseTestimonyModalReturn {
  isOpen: boolean;
  testimony: Testimony | null;
  openTestimonyModal: (testimony: Testimony) => void;
  closeModal: () => void;
}

// Specialized hook for testimonies
export const useTestimonyModal = (): UseTestimonyModalReturn => {
  const modal = useModal<Testimony>();
     
  const openTestimonyModal = (testimony: Testimony): void => {
    modal.openModal(testimony);
  };

  return {
    isOpen: modal.isOpen,
    testimony: modal.data, // Alias data to testimony
    openTestimonyModal,
    closeModal: modal.closeModal,
  };
};

// Generic view modal hook - for any data type
{/* export const useViewModal = <T = any>(): UseModalReturn<T> => {
  return useModal<T>();
}; */}

interface UseUserModalReturn {
  isOpen: boolean;
  item: T | null;
  openViewModal: (T) => void;
  closeModal: () => void;
}

// Add new modal types easily
export const useUserModal = (): UseUserModalReturn => {
  const modal = useModal<T>();
  
  const openViewModal = (item: T): void => {
    modal.openModal(item);
  };

  return {
    isOpen: modal.isOpen,
    item: modal.data,
    openViewModal,
    closeModal: modal.closeModal,
  };
};

{/* // Usage examples:
// const projectModal = useProjectModal();
// const testimonyModal = useTestimonyModal();
// const genericModal = useViewModal<SomeDataType>(); */}
// hooks/useProjectSlider.js
import { useState, useEffect } from 'react';

export const useSlider = (projects, autoSlideInterval = 3000) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (!projects || projects.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === projects.length - 1 ? 0 : prevIndex + 1
            );
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [projects, autoSlideInterval]);

    // Navigation functions
    const goToNext = () => {
        if (!projects || projects.length === 0) return;
        setCurrentIndex((prevIndex) => 
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        if (!projects || projects.length === 0) return;
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        if (!projects || projects.length === 0) return;
        setCurrentIndex(index);
    };

    // Get current project
    const currentProject = projects && projects.length > 0 ? projects[currentIndex] : null;

    return {
        currentIndex,
        currentProject,
        goToNext,
        goToPrev,
        goToSlide,
        totalProjects: projects?.length || 0,
        hasProjects: projects && projects.length > 0
    };
};
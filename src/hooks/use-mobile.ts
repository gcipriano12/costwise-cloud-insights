
import { useEffect, useState } from "react"

export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>('lg');

  useEffect(() => {
    // Function to check current breakpoint based on window width
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setBreakpoint('xs'); // Extra small devices
      } else if (width >= 480 && width < 768) {
        setBreakpoint('sm'); // Small devices
      } else if (width >= 768 && width < 1024) {
        setBreakpoint('md'); // Medium devices
      } else if (width >= 1024 && width < 1280) {
        setBreakpoint('lg'); // Large devices
      } else if (width >= 1280 && width < 1536) {
        setBreakpoint('xl'); // Extra large devices
      } else {
        setBreakpoint('2xl'); // 2XL devices
      }
    }
    
    // Check initially
    checkBreakpoint();
    
    // Add listeners for resize and orientation change
    window.addEventListener("resize", checkBreakpoint);
    window.addEventListener("orientationchange", checkBreakpoint);
    
    // Also check after a small delay to ensure correct interpretation
    // after orientation changes
    const orientationTimer = setTimeout(() => {
      checkBreakpoint();
    }, 300);
    
    // Clean up listeners when component unmounts
    return () => {
      window.removeEventListener("resize", checkBreakpoint);
      window.removeEventListener("orientationchange", checkBreakpoint);
      clearTimeout(orientationTimer);
    }
  }, []);

  return breakpoint;
}

export function useIsMobile() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm';
}

export function useIsTablet() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'md';
}

export function useIsDesktop() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
}

export function useIsMobileOrTablet() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
}

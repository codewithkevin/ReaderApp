import { Dimensions, PixelRatio, Platform, ScaledSize } from 'react-native';
import { useEffect, useState } from 'react';

const BASE_DIMENSIONS = {
    width: 375,
    height: 812
};

type Orientation = 'portrait' | 'landscape';

interface ResponsiveContext {
    screenWidth: number;
    screenHeight: number;
    orientation: Orientation;
    isSmallDevice: boolean;
    isMediumDevice: boolean;
    isLargeDevice: boolean;
    isTablet: boolean;
    scale: (size: number) => number;
    scaleHeight: (size: number) => number;
    scaleFontSize: (size: number) => number;
    hp: (percentage: number) => number;
    wp: (percentage: number) => number;
}

export const BREAKPOINTS = {
    smallPhone: 320,
    phone: 375,
    largPhone: 414,
    smallTablet: 600,
    tablet: 768,
    largeTablet: 1024,
    desktop: 1280
};

// Get the current dimensions
const getDimensions = (): ScaledSize => Dimensions.get('window');

// Standalone utility functions that can be imported directly
export const wp = (percentage: number): number => {
    const { width } = getDimensions();
    return PixelRatio.roundToNearestPixel(width * percentage / 100);
};

export const hp = (percentage: number): number => {
    const { height } = getDimensions();
    return PixelRatio.roundToNearestPixel(height * percentage / 100);
};

export const scale = (size: number): number => {
    const { width } = getDimensions();
    const scaleWidth = width / BASE_DIMENSIONS.width;
    return PixelRatio.roundToNearestPixel(size * scaleWidth);
};

export const scaleHeight = (size: number): number => {
    const { height } = getDimensions();
    const scaleHeight = height / BASE_DIMENSIONS.height;
    return PixelRatio.roundToNearestPixel(size * scaleHeight);
};

export const scaleFontSize = (size: number): number => {
    // Different font scaling logic based on platform
    const scaleFactor = Platform.OS === 'ios' ?
        Math.min(scale(1), 1.2) : // iOS scales up to 20% more
        Math.min(scale(1), 1.3);  // Android scales up to 30% more

    return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

/**
 * Hook to get and subscribe to screen dimensions
 */
export const useResponsiveScreen = (): ResponsiveContext => {
    const [dimensions, setDimensions] = useState<ScaledSize>(getDimensions());

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setDimensions(window);
        };

        // Subscribe to dimension changes
        const subscription = Dimensions.addEventListener('change', onChange);

        // Cleanup subscription on unmount
        return () => {
            subscription.remove();
        };
    }, []);

    const { width, height } = dimensions;
    const orientation: Orientation = width > height ? 'landscape' : 'portrait';

    // Device size detection
    const isSmallDevice = width < 360;
    const isMediumDevice = width >= 360 && width < 768;
    const isLargeDevice = width >= 768;
    const isTablet = width >= 768 || (Platform.OS === 'ios' && Platform.isPad);

    // Return both the utility functions and responsive context
    return {
        screenWidth: width,
        screenHeight: height,
        orientation,
        isSmallDevice,
        isMediumDevice,
        isLargeDevice,
        isTablet,
        scale,
        scaleHeight,
        scaleFontSize,
        hp,
        wp
    };
};

/**
 * Utility function to create styles based on screen size
 * @param smallStyles Styles for small screens
 * @param mediumStyles Styles for medium screens
 * @param largeStyles Styles for large screens
 * @returns Appropriate styles based on current screen size
 */
export const createResponsiveStyles = <T extends object>(
    smallStyles: T,
    mediumStyles?: Partial<T>,
    largeStyles?: Partial<T>
): T => {
    const { isSmallDevice, isMediumDevice, isLargeDevice } = useResponsiveScreen();

    if (isLargeDevice && largeStyles) {
        return { ...smallStyles, ...mediumStyles, ...largeStyles };
    }

    if (isMediumDevice && mediumStyles) {
        return { ...smallStyles, ...mediumStyles };
    }

    return smallStyles;
};

export const useResponsiveStyles = <T extends object>(stylesByBreakpoint: {
    base: T;
    sm?: Partial<T>;
    md?: Partial<T>;
    lg?: Partial<T>;
    tablet?: Partial<T>;
    landscape?: Partial<T>;
}): T => {
    const {
        screenWidth,
        orientation,
        isTablet
    } = useResponsiveScreen();

    const { base, sm, md, lg, tablet, landscape } = stylesByBreakpoint;

    let responsiveStyles = { ...base };

    if (sm && screenWidth >= BREAKPOINTS.smallPhone) {
        responsiveStyles = { ...responsiveStyles, ...sm };
    }

    if (md && screenWidth >= BREAKPOINTS.phone) {
        responsiveStyles = { ...responsiveStyles, ...md };
    }

    if (lg && screenWidth >= BREAKPOINTS.tablet) {
        responsiveStyles = { ...responsiveStyles, ...lg };
    }

    if (tablet && isTablet) {
        responsiveStyles = { ...responsiveStyles, ...tablet };
    }

    if (landscape && orientation === 'landscape') {
        responsiveStyles = { ...responsiveStyles, ...landscape };
    }

    return responsiveStyles as T;
};
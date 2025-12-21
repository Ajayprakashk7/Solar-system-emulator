import { track } from '@vercel/analytics';

/**
 * Analytics event tracking utilities
 * Integrates with Vercel Analytics for user behavior insights
 */

/**
 * Track planet selection
 */
export const trackPlanetSelected = (planetName: string) => {
  track('planet_selected', { 
    planet: planetName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track moon selection
 */
export const trackMoonSelected = (moonName: string, parentPlanet: string) => {
  track('moon_selected', { 
    moon: moonName,
    parent: parentPlanet,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track speed control changes
 */
export const trackSpeedChanged = (speed: number) => {
  track('speed_changed', { 
    speed,
    speedLabel: getSpeedLabel(speed),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track camera reset
 */
export const trackCameraReset = () => {
  track('camera_reset', {
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track NASA image views
 */
export const trackNASAImageViewed = (celestialBody: string, imageType: 'planet' | 'moon') => {
  track('nasa_image_viewed', { 
    body: celestialBody,
    type: imageType,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track educational content access
 */
export const trackEducationalContentViewed = (celestialBody: string) => {
  track('educational_content_viewed', {
    body: celestialBody,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track control menu interactions
 */
export const trackControlMenuToggled = (isOpen: boolean) => {
  track('control_menu_toggled', {
    action: isOpen ? 'opened' : 'closed',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track planet menu interactions
 */
export const trackPlanetMenuToggled = (isOpen: boolean) => {
  track('planet_menu_toggled', {
    action: isOpen ? 'opened' : 'closed',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track detail view entry/exit
 */
export const trackDetailView = (celestialBody: string, action: 'enter' | 'exit') => {
  track('detail_view', {
    body: celestialBody,
    action,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track intro animation completion
 */
export const trackIntroCompleted = (duration: number) => {
  track('intro_completed', {
    duration,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track errors
 */
export const trackError = (errorType: string, errorMessage: string, context?: string) => {
  track('error_occurred', {
    type: errorType,
    message: errorMessage,
    context,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track performance metrics
 */
export const trackPerformanceMetric = (metric: string, value: number, unit?: string) => {
  track('performance_metric', {
    metric,
    value,
    unit,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track texture loading
 */
export const trackTextureLoaded = (texturePath: string, loadTime: number) => {
  track('texture_loaded', {
    path: texturePath,
    loadTime,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track texture loading failures
 */
export const trackTextureLoadFailed = (texturePath: string, error: string) => {
  track('texture_load_failed', {
    path: texturePath,
    error,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track user session duration
 */
export const trackSessionDuration = (duration: number) => {
  track('session_duration', {
    duration,
    durationMinutes: Math.floor(duration / 60000),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track device capabilities
 */
export const trackDeviceCapabilities = (capabilities: {
  isMobile: boolean;
  pixelRatio: number;
  webGL: boolean;
  webGL2: boolean;
}) => {
  track('device_capabilities', {
    ...capabilities,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track keyboard shortcuts used
 */
export const trackKeyboardShortcut = (key: string, action: string) => {
  track('keyboard_shortcut', {
    key,
    action,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track mobile gestures
 */
export const trackMobileGesture = (gesture: 'pinch' | 'swipe' | 'tap', target?: string) => {
  track('mobile_gesture', {
    gesture,
    target,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Aggregated analytics events object for easy import
 */
export const analyticsEvents = {
  planetSelected: trackPlanetSelected,
  moonSelected: trackMoonSelected,
  speedChanged: trackSpeedChanged,
  cameraReset: trackCameraReset,
  nasaImageViewed: trackNASAImageViewed,
  educationalContentViewed: trackEducationalContentViewed,
  controlMenuToggled: trackControlMenuToggled,
  planetMenuToggled: trackPlanetMenuToggled,
  detailView: trackDetailView,
  introCompleted: trackIntroCompleted,
  error: trackError,
  performanceMetric: trackPerformanceMetric,
  textureLoaded: trackTextureLoaded,
  textureLoadFailed: trackTextureLoadFailed,
  sessionDuration: trackSessionDuration,
  deviceCapabilities: trackDeviceCapabilities,
  keyboardShortcut: trackKeyboardShortcut,
  mobileGesture: trackMobileGesture,
} as const;

/**
 * Helper function to get speed label
 */
function getSpeedLabel(speed: number): string {
  if (speed === 0) return 'Paused';
  if (speed < 0.5) return 'Ultra Slow';
  if (speed < 1) return 'Slow';
  if (speed === 1) return 'Normal';
  if (speed <= 2) return 'Fast';
  if (speed <= 5) return 'Very Fast';
  return 'Ludicrous Speed';
}

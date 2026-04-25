import '@testing-library/jest-dom'

// Mock fonts globally
jest.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'geist-sans' }),
  Geist_Mono: () => ({ variable: 'geist-mono' }),
}))

// Helper to create a mocked DOM element with stable tracking
const createMockElement = () => {
  const el = document.createElement('div')
  el.addEventListener = jest.fn()
  el.removeEventListener = jest.fn()
  el.requestFullscreen = jest.fn()
  // Mock classList methods
  jest.spyOn(el.classList, 'add').mockImplementation(() => {})
  jest.spyOn(el.classList, 'remove').mockImplementation(() => {})
  jest.spyOn(el.classList, 'contains').mockReturnValue(false)
  jest.spyOn(el.classList, 'toggle').mockImplementation(() => {})
  return el
}

// Global stable mocks
const mockSource = {
  setData: jest.fn(),
  getClusterExpansionZoom: jest.fn((id, cb) => {
    if (cb) cb(null, 15);
    return Promise.resolve(15);
  })
};

const mockCanvas = { style: {} };

const createMockMap = () => ({
  on: jest.fn(),
  off: jest.fn(),
  remove: jest.fn(),
  setProjection: jest.fn(),
  getCenter: jest.fn(() => ({ lng: 0, lat: 0 })),
  getZoom: jest.fn(() => 10),
  getBearing: jest.fn(() => 0),
  getPitch: jest.fn(() => 0),
  isMoving: jest.fn(() => false),
  jumpTo: jest.fn(),
  setStyle: jest.fn(),
  getContainer: jest.fn(() => createMockElement()),
  zoomTo: jest.fn(),
  resetNorthPitch: jest.fn(),
  flyTo: jest.fn(),
  easeTo: jest.fn(),
  addSource: jest.fn(),
  removeSource: jest.fn(),
  getSource: jest.fn(() => mockSource),
  addLayer: jest.fn(),
  removeLayer: jest.fn(),
  getLayer: jest.fn(() => ({})),
  setPaintProperty: jest.fn(),
  setLayoutProperty: jest.fn(),
  getCanvas: jest.fn(() => mockCanvas),
  setFeatureState: jest.fn(),
  queryRenderedFeatures: jest.fn(() => []),
});

const createMockMarker = () => {
  let draggable = false;
  let lngLat = { lng: 0, lat: 0 };
  const element = createMockElement(); // STABLE ELEMENT
  const marker = {
    setLngLat: jest.fn().mockImplementation((ll) => {
      lngLat = Array.isArray(ll) ? { lng: ll[0], lat: ll[1] } : ll;
      return marker;
    }),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
    getElement: jest.fn(() => element),
    on: jest.fn().mockReturnThis(),
    getLngLat: jest.fn(() => lngLat),
    isDraggable: jest.fn(() => draggable),
    setDraggable: jest.fn().mockImplementation((d) => {
      draggable = d;
      return marker;
    }),
    getOffset: jest.fn(() => ({ x: 0, y: 0 })),
    setOffset: jest.fn().mockReturnThis(),
    getRotation: jest.fn(() => 0),
    setRotation: jest.fn().mockReturnThis(),
    getRotationAlignment: jest.fn(() => 'auto'),
    setRotationAlignment: jest.fn().mockReturnThis(),
    getPitchAlignment: jest.fn(() => 'auto'),
    setPitchAlignment: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
  };
  return marker;
};

const createMockPopup = () => ({
  setLngLat: jest.fn().mockReturnThis(),
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
  setDOMContent: jest.fn().mockReturnThis(),
  setMaxWidth: jest.fn().mockReturnThis(),
  setOffset: jest.fn().mockReturnThis(),
  isOpen: jest.fn(() => true),
  getLngLat: jest.fn(() => ({ lng: 0, lat: 0 })),
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
});

// Mock MapLibre GL
const maplibre = {
  Map: jest.fn(() => createMockMap()),
  Marker: jest.fn(() => createMockMarker()),
  Popup: jest.fn(() => createMockPopup()),
};
jest.mock('maplibre-gl', () => maplibre);

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock MutationObserver as a class with instances
global.MutationObserver = jest.fn().mockImplementation(function(callback) {
  this.observe = jest.fn();
  this.disconnect = jest.fn();
  this.trigger = (mutations) => callback(mutations, this);
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) => success({
    coords: {
      latitude: 51.1,
      longitude: 45.3
    }
  })),
  watchPosition: jest.fn()
};
global.navigator.geolocation = mockGeolocation;

// Mock fullscreen API
document.exitFullscreen = jest.fn();
Object.defineProperty(document, 'fullscreenElement', {
  get: jest.fn(() => null),
  configurable: true
});

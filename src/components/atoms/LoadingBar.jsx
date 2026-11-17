import LoadingBarPackage from 'react-redux-loading-bar';

// Mengatasi ketidakcocokan CJS/ESM interop pada bundler Vite
const LoadingBar =
  LoadingBarPackage.default?.default ||
  LoadingBarPackage.default ||
  LoadingBarPackage;

export default LoadingBar;

'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { renderLogger } from '@/lib/logger';

interface Scene3DErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface Scene3DErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary specifically for 3D scene components
 * Provides graceful degradation with FallbackSolarSystem
 */
export class Scene3DErrorBoundary extends Component<
  Scene3DErrorBoundaryProps,
  Scene3DErrorBoundaryState
> {
  constructor(props: Scene3DErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<Scene3DErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    renderLogger.error('3D Scene Error Boundary caught error:', {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Reload the page to reset WebGL context
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="max-w-2xl rounded-lg bg-gray-900 p-8 text-center shadow-xl">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-red-500">3D Rendering Error</h2>
              <p className="text-gray-400">
                The 3D solar system visualization encountered an error
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6 rounded-lg bg-black/50 p-4 text-left">
                <p className="mb-2 font-mono text-sm text-red-400">
                  {this.state.error.message}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-400">
                      Component Stack
                    </summary>
                    <pre className="mt-2 max-h-40 overflow-auto text-xs text-gray-500">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                This might be due to:
              </p>
              <ul className="text-left text-sm text-gray-400">
                <li className="mb-2">• WebGL compatibility issues with your browser</li>
                <li className="mb-2">• Insufficient GPU memory or resources</li>
                <li className="mb-2">• Browser extensions blocking 3D rendering</li>
                <li className="mb-2">• Hardware acceleration is disabled</li>
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={this.handleReset}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Reload Page
                </button>
                <a
                  href="https://get.webgl.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
                >
                  Check WebGL Support
                </a>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                If the problem persists, try using a different browser or updating your graphics drivers
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

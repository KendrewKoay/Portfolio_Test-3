import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  declare state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React Component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 text-stone-800">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200 text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h1 className="text-xl font-bold mb-2">页面载入遇到意外</h1>
            <p className="text-sm text-stone-600 mb-6">
              应用在渲染时遇到未知问题，请刷新页面重试。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors shadow-sm"
            >
              刷新页面 (Reload)
            </button>
            {this.state.error && (
              <pre className="mt-6 p-3 bg-stone-50 text-stone-500 text-xs rounded text-left overflow-auto max-h-32">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}






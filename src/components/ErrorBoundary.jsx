import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // No error-reporting service wired up yet — console is the only
    // visibility we have for now. Worth revisiting if that ever changes.
    console.error("Draftly crashed:", error, errorInfo);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] dark:bg-[#1C2541] px-6">
          <div className="max-w-sm text-center">
            <h1 className="font-display text-2xl font-semibold text-[#1C2541] dark:text-[#F2EFE9] mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-6">
              Draftly hit an unexpected error. Your resume data is safely
              stored — reloading should fix this.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 px-5 py-2.5 rounded-full text-[#1C2541] dark:text-[#F2EFE9]"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2.5 rounded-full font-medium"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import { Component, type ReactNode } from 'react'
import { resetDemo } from '../../utils/demo'

type Props = { children: ReactNode }
type State = { failed: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) {
      return this.props.children
    }
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold text-plum-900">Something went wrong</h1>
        <p className="mt-3 text-ink-500">Resetting the demo data usually fixes it.</p>
        <button
          onClick={resetDemo}
          className="mt-8 rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-plum-900"
        >
          Reset demo and go home
        </button>
      </div>
    )
  }
}
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto section-spacing">
        {/* Header */}
        <header className="text-center mb-section">
          <h1 className="text-5xl font-display font-bold text-primary mb-4">
            Pomodoro Timer
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto text-balance">
            A productivity app demonstrating custom Tailwind CSS design tokens
          </p>
        </header>

        {/* Timer Section */}
        <section className="card max-w-2xl mx-auto text-center mb-section">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
            Focus Session
          </h2>

          <div className="timer-display text-pomodoro-work mb-8 p-timer bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl shadow-timer">
            25:00
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary">
              Start Focus
            </button>
            <button className="btn-success">
              Short Break
            </button>
            <button className="btn-secondary">
              Long Break
            </button>
          </div>
        </section>

        {/* Design Token Examples */}
        <section className="card mb-section">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
            Custom Design Token Examples
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Color Tokens */}
            <div>
              <h3 className="text-lg font-medium text-secondary-700 mb-4">Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-lg shadow-soft"></div>
                  <span className="text-sm text-secondary-600">Primary</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-success rounded-lg shadow-soft"></div>
                  <span className="text-sm text-secondary-600">Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-warning rounded-lg shadow-soft"></div>
                  <span className="text-sm text-secondary-600">Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-error rounded-lg shadow-soft"></div>
                  <span className="text-sm text-secondary-600">Error</span>
                </div>
              </div>
            </div>

            {/* Typography Tokens */}
            <div>
              <h3 className="text-lg font-medium text-secondary-700 mb-4">Typography</h3>
              <div className="space-y-2">
                <div className="font-display text-xl text-primary">Display Font</div>
                <div className="font-sans text-base text-secondary-600">Sans Serif</div>
                <div className="font-mono text-sm text-secondary-500">Monospace</div>
                <div className="text-timer-small text-pomodoro-work">Timer Text</div>
              </div>
            </div>

            {/* Spacing Tokens */}
            <div>
              <h3 className="text-lg font-medium text-secondary-700 mb-4">Spacing</h3>
              <div className="space-y-2">
                <div className="bg-primary-100 h-4 w-card rounded"></div>
                <div className="bg-success-100 h-4 w-18 rounded"></div>
                <div className="bg-warning-100 h-4 w-24 rounded"></div>
                <div className="bg-error-100 h-4 w-32 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
            Button Variants
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary animate-fade-in">
              Primary Button
            </button>
            <button className="btn-secondary">
              Secondary Button
            </button>
            <button className="btn-success">
              Success Button
            </button>
            <button className="btn-warning">
              Warning Button
            </button>
            <button className="btn-error">
              Error Button
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
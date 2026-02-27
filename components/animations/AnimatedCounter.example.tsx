import AnimatedCounter from './AnimatedCounter';

export default function AnimatedCounterExample(): JSX.Element {
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          AnimatedCounter Examples
        </h2>
      </div>

      {/* Basic counter */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Basic Counter</h3>
        <AnimatedCounter
          value={1000}
          className="text-4xl font-bold text-white"
        />
      </div>

      {/* Counter with suffix */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">With Suffix (+)</h3>
        <AnimatedCounter
          value={10000}
          suffix="+"
          className="text-4xl font-bold text-white"
        />
      </div>

      {/* Counter with percentage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Percentage</h3>
        <AnimatedCounter
          value={99.9}
          suffix="%"
          className="text-4xl font-bold text-white"
        />
      </div>

      {/* Counter with prefix */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">With Prefix ($)</h3>
        <AnimatedCounter
          value={299}
          prefix="$"
          className="text-4xl font-bold text-white"
        />
      </div>

      {/* Counter with custom duration */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          Slow Animation (4s)
        </h3>
        <AnimatedCounter
          value={500}
          duration={4000}
          suffix="+"
          className="text-4xl font-bold text-white"
        />
      </div>

      {/* Stats grid example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Stats Grid Example</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <AnimatedCounter
              value={10000}
              suffix="+"
              className="text-5xl font-bold text-white block"
            />
            <p className="text-base text-muted mt-2">Protected Systems</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              value={99.9}
              suffix="%"
              className="text-5xl font-bold text-white block"
            />
            <p className="text-base text-muted mt-2">Uptime Guarantee</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              value={500}
              suffix="+"
              className="text-5xl font-bold text-white block"
            />
            <p className="text-base text-muted mt-2">Enterprise Clients</p>
          </div>
          <div className="text-center">
            <AnimatedCounter
              value={24}
              suffix="/7"
              className="text-5xl font-bold text-white block"
            />
            <p className="text-base text-muted mt-2">Support Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

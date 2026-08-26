import { getStats } from "@/actions/settings";

export default async function Stats() {
  const dbStats = await getStats();

  const stats = dbStats.map((s) => ({
    ...s,
    value: s.value.endsWith("+") ? s.value : `${s.value}+`,
  }));

  if (!stats.length) return null;

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-gray-600 text-sm md:text-base font-medium"
                style={{ fontFamily: "var(--font-opensans)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

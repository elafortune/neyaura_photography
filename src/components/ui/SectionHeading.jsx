export default function SectionHeading({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide ${
          light ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 font-sans text-sm md:text-base tracking-widest uppercase ${
            light ? 'text-warm-gray' : 'text-taupe'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 mx-auto w-12 h-px ${
          light ? 'bg-warm-gray/50' : 'bg-sand'
        }`}
      />
    </div>
  );
}

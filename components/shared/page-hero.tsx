interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="bg-brand-black py-14 text-center text-white md:py-20">
      <div className="container-page">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-h1">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-gray-300">{description}</p>}
      </div>
    </section>
  );
}

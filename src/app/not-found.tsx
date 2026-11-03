import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-5 px-6 py-20">
      <p className="text-sm uppercase tracking-[0.35em] text-body">404</p>
      <h1 className="max-w-2xl text-4xl font-semibold text-heading">
        The page you requested was not found.
      </h1>
      <p className="max-w-xl text-body">
        This portfolio is a single page — everything lives on the homepage.
      </p>
      <Link
        href="/en"
        className="inline-flex w-fit rounded-full border border-brand/60 bg-brand/15 px-5 py-3 text-sm font-medium text-heading transition hover:border-brand-strong hover:bg-brand/25"
      >
        Return to homepage
      </Link>
    </section>
  );
}

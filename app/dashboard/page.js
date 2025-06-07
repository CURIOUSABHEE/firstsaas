import Link from "next/link";

export default function dashboard() {
  return (
    <main>
      <section className="text-center py-32 px-8 max-w-3xl mx-auto">
        <h1>Private dashboard </h1>
        <Link href="/" className="btn btn-primary">
          HOME
        </Link>
      </section>
    </main>
  );
}

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn&apos;t find the property you&apos;re looking for.
      </p>
      <a href="/properties" className="text-primary hover:underline">
        View all properties
      </a>
    </div>
  );
}

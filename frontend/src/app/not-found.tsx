import Header from '@/components/Header';

export default function Custom404() {
  return (
    <>
      <Header heading={`404 - Not Found`} />
      <main className="p-4 m-4">
        <p className="m-4 text-center text-4xl font-semibold">
          The requested resource does not exist
        </p>
      </main>
    </>
  );
}

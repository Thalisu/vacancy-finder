import Header from "@/app/components/Header";
import Form from "./Form";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-1 flex-col items-center">
        <Form />
      </main>
    </>
  );
}

import { HeaderSVG } from "./svgs";

export default function Header({ small = false }: { small?: boolean }) {
  return (
    <header className="flex h-fit w-full justify-center py-4">
      <HeaderSVG
        className={`${small ? "w-1/5" : "w-3/5"} h-auto min-w-96 max-w-2xl`}
      />
    </header>
  );
}

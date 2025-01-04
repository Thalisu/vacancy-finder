export default function Filter({
  id,
  handler,
}: {
  id: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mx-4 flex w-fit gap-2 overflow-hidden border-b pb-1 transition-all">
      <input
        id={id}
        type="checkbox"
        defaultChecked
        onChange={(e) => handler(e)}
        className="cursor-pointer border-complementary bg-complementary"
      />
      <label htmlFor={id} className="w-fit cursor-pointer select-none">
        {id}
      </label>
    </div>
  );
}

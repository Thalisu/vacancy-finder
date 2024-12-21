interface props {
  addExtraFields: () => void;
  removeExtraField: () => void;
  handleSave: () => void;
  noFilledKeywords: { state: boolean; msg: string };
}

export default function NotSavedSearchButtons(props: props) {
  return (
    <div className="mt-2 flex gap-2">
      <button
        type="button"
        className={`bg-complementary max-w-fit rounded-xl p-2`}
        onClick={props.addExtraFields}
      >
        Adicionar
      </button>
      <button
        type="button"
        className={`bg-complementary max-w-fit rounded-xl p-2`}
        onClick={props.removeExtraField}
      >
        Remover
      </button>
      <button
        type="button"
        className={`bg-complementary max-w-fit rounded-xl p-2`}
        onClick={props.handleSave}
      >
        Salvar
      </button>
      {props.noFilledKeywords.state && (
        <p className="flex items-center text-red-600/90">
          {props.noFilledKeywords.msg}
        </p>
      )}
    </div>
  );
}

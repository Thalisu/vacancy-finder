interface props {
  isAllInputsWithValue: boolean;
  addKeyword: () => void;
  isLengthOne: boolean;
  removeKeyword: () => void;
  saveSearch: () => void;
}
export default function NotSavedSearchButtons(props: props) {
  return (
    <div className="mt-2 flex gap-2">
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        style={{ opacity: props.isAllInputsWithValue ? "1" : ".5" }}
        disabled={!props.isAllInputsWithValue}
        onClick={props.addKeyword}
      >
        Adicionar
      </button>
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        style={{ opacity: props.isLengthOne ? ".5" : "1" }}
        disabled={props.isLengthOne}
        onClick={props.removeKeyword}
      >
        Remover
      </button>
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        style={{ opacity: props.isAllInputsWithValue ? "1" : ".5" }}
        disabled={!props.isAllInputsWithValue}
        onClick={() => props.saveSearch()}
      >
        Salvar
      </button>
    </div>
  );
}

interface props {
  addExtraFields: () => void;
  removeExtraField: () => void;
  handleSave: () => void;
}

export default function NotSavedSearchButtons(props: props) {
  return (
    <div className="mt-2 flex gap-2">
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        onClick={props.addExtraFields}
      >
        Adicionar
      </button>
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        onClick={props.removeExtraField}
      >
        Remover
      </button>
      <button
        type="button"
        className={`max-w-fit rounded-xl bg-gray-950 p-2`}
        onClick={props.handleSave}
      >
        Salvar
      </button>
    </div>
  );
}

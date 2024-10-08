"use client";
import { inter } from "../lib/fonts";
import useKeywordInputs from "../hooks/useKeywordInputs";
import Select from "./Select";
import { Dispatch, SetStateAction } from "react";

export default function KeywordField({
  index,
  setIsSearchAvailable,
}: {
  index: number;
  setIsSearchAvailable: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    keywordInputs,
    isAllInputsWithValue,
    addKeyword,
    removeKeyword,
    saveSearch,
  } = useKeywordInputs(setIsSearchAvailable);

  const isLengthOne = keywordInputs.length === 1;

  return (
    <div className="relative flex min-h-32 flex-col bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}
      </p>
      <div
        className={`${inter.className} mb-auto flex flex-wrap items-center gap-2`}
      >
        {keywordInputs.map((input) => input.node)}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <Select id="time" label="Período: " index={index - 1}>
          <option value="r86400">Útimas 24 horas</option>
          <option value="r604800">Útima semana</option>
          <option value="r2592000">Útimo mês</option>
        </Select>
        <Select id="remote" label="Remoto: " index={index - 1}>
          <option value="1%2C2%2C3">Todas as vagas</option>
          <option value="3">Somente Híbridas</option>
          <option value="2">Somente Remotas</option>
          <option value="1">Somente Presenciais</option>
        </Select>
        <Select
          id="local"
          label="Local: "
          index={index - 1}
          selectConfig={{ disabled: true }}
        >
          <option value="Brazil">Brasil</option>
        </Select>
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: isAllInputsWithValue ? "1" : ".5" }}
          disabled={!isAllInputsWithValue}
          onClick={addKeyword}
        >
          Adicionar
        </button>
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: isLengthOne ? ".5" : "1" }}
          disabled={isLengthOne}
          onClick={removeKeyword}
        >
          Remover
        </button>
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: isAllInputsWithValue ? "1" : ".5" }}
          disabled={!isAllInputsWithValue}
          onClick={() => saveSearch(index)}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

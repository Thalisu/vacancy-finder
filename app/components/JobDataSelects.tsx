import { ChangeEvent } from "react";
import Select from "./Select";
import { IJobsData } from "../lib/types";

interface props {
  index: number;
  jobSearchData: IJobsData;
  handleSetJobSearchData: (data: Partial<IJobsData>) => void;
}

export default function JobDataSelects(props: props) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select
        id="time"
        label="Período: "
        index={props.index - 1}
        selectConfig={{
          value: props.jobSearchData.time,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            props.handleSetJobSearchData({ time: e.target.value }),
        }}
      >
        <option value="r86400">Útimas 24 horas</option>
        <option value="r604800">Útima semana</option>
        <option value="r2592000">Útimo mês</option>
      </Select>
      <Select
        id="remote"
        label="Remoto: "
        index={props.index - 1}
        selectConfig={{
          value: props.jobSearchData.remote,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            props.handleSetJobSearchData({ remote: e.target.value }),
        }}
      >
        <option value="1%2C2%2C3">Todas as vagas</option>
        <option value="3">Somente Híbridas</option>
        <option value="2">Somente Remotas</option>
        <option value="1">Somente Presenciais</option>
      </Select>
      <Select
        id="local"
        label="Local: "
        index={props.index - 1}
        selectConfig={{
          disabled: true,
          value: props.jobSearchData.location,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            props.handleSetJobSearchData({ location: e.target.value }),
        }}
      >
        <option value="Brazil">Brasil</option>
      </Select>
    </div>
  );
}

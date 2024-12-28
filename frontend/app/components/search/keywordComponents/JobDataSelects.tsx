import { ChangeEvent, useState } from "react";
import Select from "./Select";
import { IJobsData } from "../../../lib/types";

export default function JobDataSelects({ jobsData }: { jobsData: IJobsData }) {
  const [jobSearchData, setJobSearchData] = useState(jobsData);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select
        id="time"
        label="Período: "
        index={0}
        selectConfig={{
          value: jobSearchData.time,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            setJobSearchData((prev) => ({ ...prev, time: e.target.value })),
        }}
      >
        <option value="r86400">Útimas 24 horas</option>
        <option value="r604800">Útimos 7 dias</option>
        <option value="r2592000">Útimos 30 dias</option>
      </Select>
      <Select
        id="remote"
        label="Remoto: "
        index={0}
        selectConfig={{
          value: jobSearchData.remote,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            setJobSearchData((prev) => ({ ...prev, remote: e.target.value })),
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
        index={0}
        selectConfig={{
          disabled: true,
          value: jobSearchData.location,
          onChange: (e: ChangeEvent<HTMLSelectElement>) =>
            setJobSearchData((prev) => ({ ...prev, location: e.target.value })),
        }}
      >
        <option value="Brazil">Brasil</option>
      </Select>
    </div>
  );
}

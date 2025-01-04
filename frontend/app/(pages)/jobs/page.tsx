import Header from "@/app/components/Header";
import JobContainer from "./jobContainer";

export default function Jobs() {
  return (
    <div className="flex w-full grow flex-col items-center">
      <Header small={true} />
      <JobContainer />
    </div>
  );
}

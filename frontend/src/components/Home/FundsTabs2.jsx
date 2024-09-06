import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundCards from "./UniversityCard";
import SectionTitle from "./SectionTitle";

export default function FundsTabs({ universities }) {
  return (
    <Tabs className="sm:mt-0 mt-14">
      <div className="my-8 flex flex-col items-center">
        <SectionTitle 
          title="Most Popular Colleges" 
          classes="text-center text-2xl font-bold sm:text-3xl" 
        />
      </div>
      <TabPanel>
        <div className="flex justify-center">
          {universities.length > 0 ? (
            <FundCards universities={universities} />
          ) : (
            <p className="text-center text-gray-600">No colleges found</p>
          )}
        </div>
      </TabPanel>
    </Tabs>
  );
}

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundCards from "./UniversityCard";
import SectionTitle from "./SectionTitle";

export default function FundsTabs() {
  return (
    <Tabs className="sm:mt-0 mt-14">
      <div className="flex items-center sm:justify-between justify-center flex-wrap my-8">
        <SectionTitle title="Admission HElp" />
        <TabList className="flex overflow-auto">
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            All
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Engineering
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Medical
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            MBA
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            BCA
          </Tab>
        </TabList>
      </div>
      <TabPanel>
        <FundCards />
      </TabPanel>
      <TabPanel>
        <p>something else not available yet</p>
      </TabPanel>
      <TabPanel>
        <FundCards />
      </TabPanel>
      <TabPanel>
        <p>something else not available yet</p>
      </TabPanel>
      <TabPanel>
        <FundCards />
      </TabPanel>
    </Tabs>
  );
}

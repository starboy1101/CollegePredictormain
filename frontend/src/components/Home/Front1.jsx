import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Front() {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <section className="z-10">
      <div className="sm:w-11/12 mx-auto">
        <div
          className="relative w-full aspect-[16/7] sm:rounded-3xl bg-homefrontbg bg-cover bg-center bg-no-repeat"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white text-[50px] font-bold">
            <div className="text-center" style={{ transform: 'scale(1)', transformOrigin: 'center' }}>
              <div style={{ aspectRatio: '16/7', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>College Predictor</div>
                <div>Find Suitable College</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[24%] sm:left-[6%] left-[5%] flex items-center flex-wrap gap-4">
          </div>
        </div>
      </div>
    </section>
  );      
}  

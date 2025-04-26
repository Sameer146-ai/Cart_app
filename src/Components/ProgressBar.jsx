import { useState } from "react";
import { useEffect } from "react";
export default function ProgressBar(){
  let initialState={
    loadingProgress: 0,
    statusLoadingOrCompleted: "Loading...",    
  }
  let [stateProgressBar, updateStateProgressBar] = useState(initialState);
  useEffect(()=>{
    //console.log('called useEffect');
    let intervalId;
 
      // then just increase loading progress value
      intervalId = setInterval(()=>{
        updateStateProgressBar(previousState=>{
          if(previousState.loadingProgress <100){ 
            // //console.log(stateProgressBar);
            return{
              ...previousState,
              loadingProgress : previousState.loadingProgress + 1
            };
  
          }else{
            // clear the interval
            // //console.log('clearing interval');
   
            clearInterval(intervalId);
            return {
              ...previousState,
              statusLoadingOrCompleted: "Completed!"
            };
          }
          }
        );
      },200);
      // //console.log('interval id is', intervalId);
  }, []);


  let progressBarWidth = `${stateProgressBar.loadingProgress}%`;
  return(
    <section className="flex flex-col gap-[1rem] text-slate-300 items-center p-[2rem]">
        <h2 className="text-[2rem] font-semibold">Progress Bar</h2>
        <div className="containerProgressBar bg-slate-300 w-[50rem] h-[3em] rounded-full relative flex " >
          <div style={{width: progressBarWidth}} className={`absolute bg-yellow-300  h-[3rem] rounded-full  z-[10] `}>
          </div>
          <div className="absolute text-slate-900 text-[2rem] z-[50] left-[45%]">
            {stateProgressBar.loadingProgress}%
          </div>
        </div>
        <div className="text-[1.5rem]">{stateProgressBar.statusLoadingOrCompleted}</div>
    </section>
  );
}
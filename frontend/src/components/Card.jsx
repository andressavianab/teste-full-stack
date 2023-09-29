export const Card = (props) => {
  return (
    <div className="w-full bg-slate-950 flex flex-col border border-gray-700 rounded-lg">
      <div className="h-[40%] w-full flex flex-col p-3 bg-yellow-500">
        <h1 className="text-base text-slate-950 font-bold">{props.name}</h1>
        <p className="text-xs text-slate-700">{props.tagline}</p>

      </div>
      <div className="h-[60%] w-full p-3 text-xs">
        <p className="text-slate-200 font-bold"><span className="text-slate-300 font-normal">First brewed: </span>{props.first_brewed}</p>
        <p className="text-slate-200 font-bold"><span className="text-slate-300 font-normal">abv:</span> {props.abv}</p>
        <p className="text-slate-200 font-bold"><span className="text-slate-300 font-normal">ibu:</span> {props.ibu}</p>
        <p className="text-slate-200 font-bold"><span className="text-slate-300 font-normal">ph:</span> {props.ph}</p>
        <p className="text-slate-200 font-bold"><span className="text-slate-300 font-normal">ebc:</span> {props.ebc}</p>
    
      </div>
    </div>
  );
};

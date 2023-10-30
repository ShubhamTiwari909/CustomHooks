import React from 'react';
import useToggle from '../CustomHooks/useToggle';

function ToggleComponent() {
  const { isToggled, toggle } = useToggle(false);
  const { isToggled:darkMode, toggle:setDarkMode } = useToggle(false);

  return (
    <div className={`p-10 border rounded-xl flex items-center gap-x-4 min-h-[200px] ${darkMode ? "bg-slate-900 border-slate-100" : "bg-slate-100 border-slate-900"}`}>
      <button className={`text-white px-6 py-2 rounded-full min-w-[200px] ${isToggled ? "bg-green-500" : "bg-red-500"}`} onClick={toggle}>Toggled - {isToggled ? 'Yes' : 'No'}</button>
      <button className={`text-white px-6 py-2 rounded-full min-w-[200px] ${darkMode ? "bg-slate-100 text-slate-900" : "bg-slate-900"}`} onClick={setDarkMode}>{darkMode ? 'Light' : 'Dark'}</button>
    </div>
  );
}

export default ToggleComponent;

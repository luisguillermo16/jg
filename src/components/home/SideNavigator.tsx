import { FC } from 'react';

interface NavSection {
  id: string;
  label: string;
}

interface SideNavigatorProps {
  sections: NavSection[];
  activeSection: string;
}

const SideNavigator: FC<SideNavigatorProps> = ({ sections, activeSection }) => {
  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className="group relative flex items-center justify-end gap-4"
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest text-white/40 group-hover:text-accent transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 ${activeSection === sec.id ? 'opacity-100 translate-x-0 text-accent' : ''}`}>
            {sec.label}
          </span>
          <div
            className={`w-3 h-12 rounded-full transition-all duration-700 ${activeSection === sec.id ? 'bg-accent h-24 shadow-[0_0_20px_rgba(163,255,0,0.4)]' : 'bg-white/10 hover:bg-white/30'}`}
          />
        </a>
      ))}
    </div>
  );
};

export default SideNavigator;

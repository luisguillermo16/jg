import { type FC } from 'react';

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
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className="group relative flex items-center justify-end"
        >
          <span className={`text-[10px] uppercase font-bold tracking-widest transition-all duration-300 ${activeSection === sec.id ? 'opacity-100 text-accent' : 'opacity-0 text-white/40 group-hover:opacity-100'}`}>
            {sec.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SideNavigator;


interface MenuItemType {
  children: React.ReactNode
  handleNavigation: (pathName: string) => void,
  isOpen?: boolean,
  name: string,
  pathName: string,
}

export const MenuItem = ({ children, handleNavigation, isOpen, name, pathName }: MenuItemType) => {
  return (
    <div className={`flex min-w-24 h-12 text-medium gap-3 rounded-small p-1 max-w-full place-items-center cursor-pointer ${location.pathname === pathName ? 'text-black bg-white' : 'text-white bg-transparent'} transition-transform duration-100 hover:scale-105`} onClick={() => handleNavigation(pathName)}>
      {children}
      {isOpen && (
        <p className="font-poppins overflow-clip whitespace-nowrap tracking-wide caret-transparent">
          {name}
        </p>
      )}
    </div>
  );
}


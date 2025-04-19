import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

// Array of menu items
const menuItems = [
    {
        label: 'Advanced State Management',
        submenu: [
            { label: '01. New state', path: '/advanced-state-management/new-state' },
            { label: '02. Previous State', path: '/advanced-state-management/previous-state' },
            { label: '03. State Object', path: '/advanced-state-management/state-object' },
            { label: '04. Action Function', path: '/advanced-state-management/action-function' },
            { label: '05. Traditional Reducer', path: '/advanced-state-management/traditional-reducer' },
            { label: '06. Real World', path: '/advanced-state-management/real-world' },
        ],
    },
    {
        label: 'State Optimization',
        submenu: [
            { label: '01. Optimize state updates', path: '/state-optimization/update' },
        ],
    },
    {
        label: 'Custom Hooks',
        submenu: [
            { label: '01. Hook Function', path: '/custom-hook/hoo-function' },
            { label: '02. useCallback', path: '/custom-hook/usecalllback' },
        ],
    },
    {
        label: 'Shared Context',
        submenu: [
            { label: '01. Context Provider', path: '/share-context/provider' },
            { label: '02. Context Hook', path: '/share-context/hook' },
        ],
    },
    {
        label: 'Portals',
        submenu: [
            { label: '01. createPortal', path: '/portals/create' },
        ],
    },
    {
        label: 'Layout Computation',
        submenu: [
            { label: '01. useLayoutEffect', path: '/layout-compitation/use-layout-effect' },
        ],
    },
    {
        label: 'Imperative Handles',
        submenu: [
            { label: '01. useImperativeHandle', path: '/imperative/use' },
        ],
    },
    {
        label: 'Focus Management',
        submenu: [
            { label: '01. flushSync', path: '/focus-management/flushsync' },
        ],
    },
    {
        label: 'Sync External State',
        submenu: [
            { label: '01. useSyncExternalStore', path: '/external-store/use' },
            { label: '02. Make Store Utility', path: '/external-store/utility' },
            { label: '03. Handling Server Rendering', path: '/external-store/server' },
        ],
    },
];

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (name: string) => {
        setOpenSubmenu((prev) => (prev === name ? null : name));
    };

    return (
        <>

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out`}
            >
                {/* Main nav */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((menu, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleSubmenu(menu.label)}
                                className={`flex my-1 items-center justify-between w-full p-2 rounded-r transition-all duration-300 ease-in-out ${openSubmenu === menu.label ? 'border-l-4 border-blue-500 bg-gray-800' : 'border-l-2 border-transparent hover:border-l-4 hover:border-blue-500 hover:bg-gray-800'
                                    }`}
                            >
                                <span className="flex items-center space-x-3">
                                    <span>{menu.label}</span>
                                </span>
                                {openSubmenu === menu.label ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            <div
                                className={`pl-6 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === menu.label ? '' : 'max-h-0'
                                    }`}
                            >
                                {menu.submenu.map((item, subIndex) => (
                                    <NavLink
                                        key={subIndex}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `block p-2 my-1 pl-4 rounded-r border-l-4 transition-all duration-300 ease-in-out ${isActive
                                                ? 'border-blue-500 bg-gray-800 text-blue-200'
                                                : 'border-transparent hover:bg-gray-800 hover:border-blue-500'
                                            }`
                                        }
                                        end // Ensures exact matching for active state
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;

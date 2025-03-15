import React, { ReactNode } from 'react';

interface AsideProps {
    children: ReactNode;
    className?: string;
}

const Aside: React.FC<AsideProps> = ({ children, className = '' }) => {
    return (
        <aside className={`w-64 h-full bg-gray-100 p-4 shadow-md ${className}`}>
            {children}
        </aside>
    );
};

export default Aside;
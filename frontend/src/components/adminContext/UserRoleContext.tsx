import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IUserRoleContext {
    isAdmin: boolean;
    toggleAdmin: () => void;
}

const UserRoleContext = createContext<IUserRoleContext | undefined>(undefined);

interface UserRoleProviderProps {
    children: ReactNode;
}

export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleAdmin = () => {
        setIsAdmin(!isAdmin);
    };

    return (
        <UserRoleContext.Provider value={{ isAdmin, toggleAdmin }}>
            {children}
        </UserRoleContext.Provider>
    );
};

export const useUserRole = (): IUserRoleContext | undefined => {
    const context = useContext(UserRoleContext);
    return context;
};
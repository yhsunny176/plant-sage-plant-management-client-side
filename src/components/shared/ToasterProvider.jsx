import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: 'font-medium',
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                // Success toast styling
                success: {
                    duration: 3000,
                    style: {
                        background: '#10b981',
                        color: '#ffffff',
                        border: '1px solid #059669',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                    },
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#10b981',
                    },
                },
                // Error toast styling
                error: {
                    duration: 4000,
                    style: {
                        background: '#ef4444',
                        color: '#ffffff',
                        border: '1px solid #dc2626',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                    },
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#ef4444',
                    },
                },
                // Loading toast styling
                loading: {
                    style: {
                        background: '#3b82f6',
                        color: '#ffffff',
                        border: '1px solid #2563eb',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                    },
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#3b82f6',
                    },
                },
            }}
        />
    );
};

export default ToasterProvider;
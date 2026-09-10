import React from "react";
import { Link } from "@inertiajs/react";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    onClick?: (e?: any) => void;
    to?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    to,
    type = "button",
    disabled = false,
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none";

    const variantClasses = {
        primary:
            "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900",
        secondary:
            "bg-secondary-300 text-accent-950 hover:bg-secondary-400 active:bg-secondary-500",
        outline:
            "bg-transparent border-2 border-current text-primary-700 hover:text-primary-800 hover:bg-primary-50",
        text: "bg-transparent text-primary-700 hover:text-primary-800 hover:underline",
    };

    const sizeClasses = {
        sm: "text-sm px-3 py-1.5 rounded",
        md: "text-base px-5 py-2.5 rounded-md",
        lg: "text-lg px-7 py-3 rounded-lg",
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    if (to) {
        return (
            <Link href={to} className={allClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={allClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

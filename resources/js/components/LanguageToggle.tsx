import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import clsx from "clsx";

interface LanguageToggleProps {
    className?: string;
    variant?: "icon" | "full";
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
    className = "",
    variant = "full",
}) => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
    };

    return (
        <button
            onClick={toggleLanguage}
            className={clsx(
                "flex items-center transition-colors",
                variant === "full" ? "space-x-2 rtl:space-x-reverse" : "",
                className
            )}
            aria-label="Toggle language"
        >
            <Globe className="w-4 h-4" />
            {variant === "full" && (
                <span>{i18n.language === "en" ? "العربية" : "English"}</span>
            )}
        </button>
    );
};

export default LanguageToggle;

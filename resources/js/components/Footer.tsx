import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    Instagram,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import ImageOptimizer from "./ImageOptimizer";

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-accent-950 text-secondary-300">
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div>
                        <div className="h-8 flex items-center gap-3 mb-4">
                            <ImageOptimizer
                                src="/images/logowahoud.png"
                                alt="Khan Wahoud Logo"
                                className="h-8 w-8 object-contain flex-shrink-0"
                            />
                            <span className="font-serif text-lg font-bold uppercase tracking-wider text-secondary-200">
                                {t("khan_wahoud")}
                            </span>
                        </div>
                        <p className="mb-6 opacity-75 max-w-xs text-xs sm:text-[13px] leading-relaxed uppercase tracking-wider rtl:normal-case rtl:tracking-normal">
                            {t("footer.about")}
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com/khanwahoud"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-secondary-700/60 flex items-center justify-center text-secondary-300 hover:text-primary-400 hover:border-primary-500 hover:bg-primary-950/40 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Experiences */}
                    <div>
                        <h3 className="h-8 flex items-center text-lg font-semibold mb-4 uppercase tracking-wider text-secondary-200">
                            {t("footer.experiences", "Experiences")}
                        </h3>
                        <ul className="space-y-2 uppercase tracking-wider text-sm rtl:normal-case rtl:tracking-normal">
                            <li>
                                <Link
                                    href="/rooms"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.rooms")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dining"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.dining")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.events")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Explore */}
                    <div>
                        <h3 className="h-8 flex items-center text-lg font-semibold mb-4 uppercase tracking-wider text-secondary-200">
                            {t("footer.explore", "Explore")}
                        </h3>
                        <ul className="space-y-2 uppercase tracking-wider text-sm rtl:normal-case rtl:tracking-normal">
                            <li>
                                <Link
                                    href="/experience"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.the_khan", "The Khan")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/restoration"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.rebirth", "Rebirth")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="h-8 flex items-center text-lg font-semibold mb-4 uppercase tracking-wider text-secondary-200">
                            {t("contact.title", "Contact Us")}
                        </h3>
                        <ul className="space-y-3 uppercase tracking-wider text-xs sm:text-[13px] rtl:normal-case rtl:tracking-normal">
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/WczTjT3Vac5dNxmk9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 opacity-75 hover:opacity-100 transition-opacity group"
                                >
                                    <MapPin
                                        size={18}
                                        className="mt-0.5 flex-shrink-0 text-secondary-400 group-hover:text-primary-400 transition-colors"
                                    />
                                    <span className="group-hover:underline leading-relaxed">
                                        {t("contact.address")}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="flex-shrink-0 text-secondary-400"
                                />
                                <a
                                    href="mailto:info@khanwahoud.com"
                                    dir="ltr"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    INFO@KHANWAHOUD.COM
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="flex-shrink-0 text-secondary-400"
                                />
                                <a
                                    href="tel:+963930012015"
                                    dir="ltr"
                                    className="opacity-75 hover:opacity-100 transition-opacity inline-block"
                                >
                                    +963 930 012 015
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-accent-800/60 mt-12 pt-8 pb-16 lg:pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs sm:text-sm opacity-75 text-center md:text-start uppercase tracking-wider rtl:normal-case rtl:tracking-normal">
                        {t("footer.copyright")}
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-xs sm:text-sm opacity-75 hover:opacity-100 transition-opacity uppercase tracking-wider"
                        >
                            {t("footer.links.privacy")}
                        </a>
                        <a
                            href="#"
                            className="text-xs sm:text-sm opacity-75 hover:opacity-100 transition-opacity uppercase tracking-wider"
                        >
                            {t("footer.links.terms")}
                        </a>
                        <a
                            href="#"
                            className="text-xs sm:text-sm opacity-75 hover:opacity-100 transition-opacity uppercase tracking-wider"
                        >
                            {t("footer.links.sitemap")}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

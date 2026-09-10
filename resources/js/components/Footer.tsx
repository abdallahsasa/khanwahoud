import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    Instagram,
    Facebook,
    Twitter,
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
                        <div className="flex items-center gap-3 font-serif text-2xl font-bold mb-4">
                            <ImageOptimizer src="/images/logowahoud.png" alt="Khan Wahoud Logo" className="h-12 w-12 object-contain" />
                            Khan Wahoud
                        </div>
                        <p className="mb-6 opacity-75 max-w-xs">
                            A boutique hotel in the restored historical building
                            of Khan Suleyman Pasha in Old Damascus.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com/khanwahoud" target="_blank" rel="noopener noreferrer"
                                className="text-secondary-300 hover:text-primary-700 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://facebook.com/khanwahoud" target="_blank" rel="noopener noreferrer"
                                className="text-secondary-300 hover:text-primary-700 transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://twitter.com/khanwahoud" target="_blank" rel="noopener noreferrer"
                                className="text-secondary-300 hover:text-primary-700 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
                            {t("nav.experience")}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/experience"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("experience.history_title")}
                                </Link>
                            </li>
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

                    {/* More Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
                            {t("membership.title")}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/membership"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("membership.benefits_title")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/restoration"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.restoration")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.contact")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("nav.admin")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
                            {t("contact.title")}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin
                                    size={18}
                                    className="mr-2 mt-1 flex-shrink-0"
                                />
                                <span className="opacity-75">
                                    {t("contact.address")}
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Mail
                                    size={18}
                                    className="mr-2 flex-shrink-0"
                                />
                                <a
                                    href="mailto:info@khanwahoud.com"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("contact.email")}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone
                                    size={18}
                                    className="mr-2 flex-shrink-0"
                                />
                                <a
                                    href="tel:+963930012015"
                                    className="opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    {t("contact.phone")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-accent-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm opacity-75">
                        {t("footer.copyright")}
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                        >
                            {t("footer.links.privacy")}
                        </a>
                        <a
                            href="#"
                            className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                        >
                            {t("footer.links.terms")}
                        </a>
                        <a
                            href="#"
                            className="text-sm opacity-75 hover:opacity-100 transition-opacity"
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

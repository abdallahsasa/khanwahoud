import VideoPlayer from '@/components/VideoPlayer';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import TimelineEvent from '../components/TimelineEvent';
import api from '../utils/axios';

type Event = {
    id?: number;
    phase: string;
    phase_ar?: string;
    description: string;
    description_ar?: string;
    media_url: string;
};

const DEFAULT_TIMELINE_EVENTS: Event[] = [
    {
        phase: 'Reconstructing Without Losing the Structural Integrity',
        phase_ar: 'إعادة البناء مع صون السلامة الإنشائية',
        description:
            'As part of the restoration, several structures within the khan required complete rebuilding. Preserving the building’s structural integrity was our top priority.\nWe began by assembling room-specific, engineered wooden scaffolding tailored to each space. From there, we worked hand in hand with local craftsmen—experts in traditional construction techniques and materials passed down through generations.\nWitnessing these artisans at work, reviving the soul of the khan with such care and mastery, was one of the most rewarding aspects of the entire renovation journey.',
        description_ar:
            'كجزء من أعمال الترميم، تطلبت العديد من الهياكل داخل الخان إعادة بناء كاملة، مع وضع الحفاظ على السلامة الإنشائية للمبنى كأولوية قصوى.\nبدأنا بتركيب سقالات خشبية هندسية مصممة خصيصاً لكل فراغ معماري، وعملنا يداً بيد مع الحرفيين المحليين المتمرسين في تقنيات ومواد البناء التقليدية المتوارثة عبر الأجيال.\nكانت رؤية هؤلاء الحرفيين وهم يعيدون إحياء روح الخان بمثل هذه العناية والبراعة واحدة من أكثر الجوانب إلهاماً ومكافأة في مسيرة التجديد بأكملها.',
        media_url: 'restorations/01K1QGZKX22AYMSYECZPDY1R9P.webp',
    },
    {
        phase: 'Integrating New Materials and Techniques',
        phase_ar: 'دمج المواد والتقنيات الحديثة مع الأصالة',
        description:
            'Khan Suleyman Pasha features one of the largest twin domes in Old Damascus, each with a diameter of 11 meters and a height of 6 meters. Sadly, both domes were destroyed in a 19th-century earthquake. Reconstructing this iconic architectural element was among the most complex and symbolic challenges of the restoration.\n\nHonoring traditional methods while embracing innovation, we chose to rebuild the domes in the spirit of our ancestors—fusing heritage with state-of-the-art techniques. The new domes, crafted from steel and glass, stand as a modern tribute to the structural genius of over 300 years ago.\n\nTo reinforce the dome bases and other key structural areas throughout the khan, we implemented Sika’s advanced carbon fiber reinforcement technology, including CFRP plates and FRP fabrics. These materials offer dynamic strength and durability, ensuring the restored khan stands strong for generations to come.',
        description_ar:
            'يتميز خان سليمان باشا بواحدة من أكبر القباب التوأم في دمشق القديمة، حيث يبلغ قطر كل منها 11 متراً وارتفاعها 6 أمتار. وللأسف، دُمرت كلتا القبتين إثر زلزال في القرن التاسع عشر، فكانت إعادة تشييد هذا المعلم المعماري البارز أحد أكثر التحديات تعقيداً ورمزية في مشروع الترميم.\n\nتقديراً للأساليب التراثية مع تبني روح الابتكار، اخترنا إعادة بناء القباب بروح أجدادنا من خلال دمج التراث بأحدث التقنيات المعاصرة. تقف القباب الجديدة، المشغولة من الفولاذ والزجاج، كتحية حديثة للعبقرية الإنشائية قبل أكثر من 300 عام.\n\nولتدعيم قواعد القباب والمناطق الإنشائية الحيوية في أرجاء الخان، اعتمدنا تقنية ألياف الكربون المتقدمة من Sika، بما في ذلك ألواح CFRP وأقمشة FRP، مما يوفر متانة فائقة تضمن بقاء الخان شامخاً للأجيال القادمة.',
        media_url: 'restorations/01K1QGS8BFY282A3DG579REAEY.webp',
    },
    {
        phase: 'Preserving the Khan’s Traditional Identity',
        phase_ar: 'صون الهوية التاريخية الأصيلة للخان',
        description:
            'Our restoration efforts focused on preserving the khan’s traditional identity by using the same original materials that were once used in its construction. Throughout the restoration process, we prioritized sustainable, locally sourced, raw-earth materials.\n\nFor example, the final layer applied to the domes and walls is the Arabic Mortar (Tineh Al-Arabi), a traditional cladding technique used for centuries. This mortar has proven to be exceptionally durable and highly compatible with historic structures. Its composition includes pozzolan, lime, coal, wheat straw, and hemp hay.\n\nOnce applied, the mortar is covered with an organic lime plaster. After drying, it is delicately finished with a natural mixture made from bay leaf extract, soap, and olive oil — ensuring both resilience and authenticity in preserving the khan’s historic character.',
        description_ar:
            'ركزت جهودنا في الترميم على الحفاظ على الهوية التراثية للخان عبر استخدام نفس المواد الأصلية التي شُيد بها في الماضي. وطوال مراحل الترميم، وضعنا في مقدمة أولوياتنا المواد الطينية المستدامة والمستخرجة من البيئة المحلية.\n\nعلى سبيل المثال، الطبقة النهائية المطبقة على الجدران والقباب هي (الطينة العربية)، وهي تقنية إكساء تقليدية استُخدمت لقرون وأثبتت متانة استثنائية وتوافقاً تاماً مع المباني الأثرية. تتكون هذه الخلطة من البوزولانا والكلس والفحم وقش القمح والقنب.\n\nبعد تطبيق الطينة، تُغطى بطبقة من الملاط الكلسي العضوي، وبمجرد جفافها يتم دهانها بعناية بمزيج طبيعي مستخلص من ورق الغار والصابون وزيت الزيتون — لضمان الحماية والأصالة والحفاظ على الطابع التاريخي العريق للخان.',
        media_url: 'restorations/01K1QY5AAE1EAY98VQWPQF4ZGY.MP4',
    },
];

const RestorationPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith('ar');

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [timelineEvents, setTimelineEvents] = React.useState<Event[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchTimelineEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/restoration`);
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setTimelineEvents(response.data);
                } else {
                    setTimelineEvents(DEFAULT_TIMELINE_EVENTS);
                }
            } catch (err) {
                console.error('Error fetching timeline events:', err);
                setTimelineEvents(DEFAULT_TIMELINE_EVENTS);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineEvents();
    }, []);

    const getEventTitle = (event: Event): string => {
        if (isAr) {
            if (event.phase_ar && event.phase_ar.trim() !== '') return event.phase_ar;
            const p = event.phase.toLowerCase();
            if (p.includes('reconstruct') || p.includes('structural')) {
                return 'إعادة البناء مع صون السلامة الإنشائية';
            }
            if (p.includes('materials') || p.includes('technique')) {
                return 'دمج المواد والتقنيات الحديثة مع الأصالة';
            }
            if (p.includes('identity') || p.includes('preserv') || p.includes('traditional')) {
                return 'صون الهوية التاريخية الأصيلة للخان';
            }
        }
        return event.phase;
    };

    const getEventDescription = (event: Event): string => {
        if (isAr) {
            if (event.description_ar && event.description_ar.trim() !== '') return event.description_ar;
            const p = event.phase.toLowerCase();
            if (p.includes('reconstruct') || p.includes('structural')) {
                return 'كجزء من أعمال الترميم، تطلبت العديد من الهياكل داخل الخان إعادة بناء كاملة، مع وضع الحفاظ على السلامة الإنشائية للمبنى كأولوية قصوى.\nبدأنا بتركيب سقالات خشبية هندسية مصممة خصيصاً لكل فراغ معماري، وعملنا يداً بيد مع الحرفيين المحليين المتمرسين في تقنيات ومواد البناء التقليدية المتوارثة عبر الأجيال.\nكانت رؤية هؤلاء الحرفيين وهم يعيدون إحياء روح الخان بمثل هذه العناية والبراعة واحدة من أكثر الجوانب إلهاماً ومكافأة في مسيرة التجديد بأكملها.';
            }
            if (p.includes('materials') || p.includes('technique')) {
                return 'يتميز خان سليمان باشا بواحدة من أكبر القباب التوأم في دمشق القديمة، حيث يبلغ قطر كل منها 11 متراً وارتفاعها 6 أمتار. وللأسف، دُمرت كلتا القبتين إثر زلزال في القرن التاسع عشر، فكانت إعادة تشييد هذا المعلم المعماري البارز أحد أكثر التحديات تعقيداً ورمزية في مشروع الترميم.\n\nتقديراً للأساليب التراثية مع تبني روح الابتكار، اخترنا إعادة بناء القباب بروح أجدادنا من خلال دمج التراث بأحدث التقنيات المعاصرة. تقف القباب الجديدة، المشغولة من الفولاذ والزجاج، كتحية حديثة للعبقرية الإنشائية قبل أكثر من 300 عام.\n\nولتدعيم قواعد القباب والمناطق الإنشائية الحيوية في أرجاء الخان، اعتمدنا تقنية ألياف الكربون المتقدمة من Sika، بما في ذلك ألواح CFRP وأقمشة FRP، مما يوفر متانة فائقة تضمن بقاء الخان شامخاً للأجيال القادمة.';
            }
            if (p.includes('identity') || p.includes('preserv') || p.includes('traditional')) {
                return 'ركزت جهودنا في الترميم على الحفاظ على الهوية التراثية للخان عبر استخدام نفس المواد الأصلية التي شُيد بها في الماضي. وطوال مراحل الترميم، وضعنا في مقدمة أولوياتنا المواد الطينية المستدامة والمستخرجة من البيئة المحلية.\n\nعلى سبيل المثال، الطبقة النهائية المطبقة على الجدران والقباب هي (الطينة العربية)، وهي تقنية إكساء تقليدية استُخدمت لقرون وأثبتت متانة استثنائية وتوافقاً تاماً مع المباني الأثرية. تتكون هذه الخلطة من البوزولانا والكلس والفحم وقش القمح والقنب.\n\nبعد تطبيق الطينة، تُغطى بطبقة من الملاط الكلسي العضوي، وبمجرد جفافها يتم دهانها بعناية بمزيج طبيعي مستخلص من ورق الغار والصابون وزيت الزيتون — لضمان الحماية والأصالة والحفاظ على الطابع التاريخي العريق للخان.';
            }
        }
        return event.description;
    };

    const beforeAfterSets = [
        {
            title: t('restoration.main_courtyard', isAr ? 'الفناء الرئيسي' : 'Main Courtyard'),
            before: '/images/ruined 2.jpg',
            after: '/images/side hall.jpg',
        },
        {
            title: t('restoration.stone_archways', isAr ? 'الأقواس الحجرية' : 'Stone Archways'),
            before: '/images/before 1.jpg',
            after: '/images/after 1.jpg',
        },
    ];

    const metaTitle = isAr
        ? 'رحلة الإحياء والترميم المعماري | خان وحود'
        : 'The Rebirth & Architectural Restoration | Khan Wahoud';
    const metaDescription = isAr
        ? 'تعرف على رحلة إحياء وترميم خان سليمان باشا العظم (خان وحود) عبر سنوات من العمل الحرفي الدقيق لحفظ التراث المعماري السوري والعثماني العريق.'
        : 'Explore the meticulous restoration journey of Khan Sulayman Pasha al-Azem (Khan Wahoud), preserving 18th-century Ottoman craftsmanship in Syria.';

    return (
        <div className="min-h-screen">
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>

            {/* Hero Section */}
            <section ref={heroRef} className="relative flex flex-col justify-center items-center overflow-hidden min-h-[420px] md:min-h-[480px] lg:min-h-[520px] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/restoration.jpeg"
                        alt={isAr ? 'إعادة إحياء معمارية - خان وحود' : 'A Modern Rebirth - Khan Wahoud'}
                        className="h-full w-full object-cover object-[center_35%]"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-[#4c4c4c]/50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-4xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-3 md:mb-4 font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-[0.05em] uppercase drop-shadow-md">
                            {isAr ? t('restoration.title', 'إعادة إحياء معمارية') : 'A MODERN REBIRTH'}
                        </h1>
                        <p className="font-sans text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase text-white/95 font-medium drop-shadow">
                            {t('restoration.subtitle', isAr ? 'تكريم التراث التاريخي عبر الترميم الحرفي الدقيق' : 'Honoring Heritage Through Restoration')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="bg-white py-14 sm:py-16 md:py-20 border-b border-[#2C4040]/10">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="font-serif text-sm sm:text-base md:text-lg lg:text-[19px] uppercase tracking-[0.08em] leading-relaxed md:leading-[2] text-[#2C4040]">
                        {t('restoration.intro', isAr ? 'يمثل مشروع الترميم لدينا واحدة من أهم مبادرات الحفاظ على التراث الخاص في سوريا، حيث يجمع بين الحرف التقليدية وتقنيات الحفظ الحديثة.' : 'Our restoration project represents one of the most significant private heritage preservation initiatives in Syria, combining traditional craftsmanship with modern conservation techniques.')}
                    </p>
                </div>
            </section>

            {/* The Team Section */}
            <section className="bg-[#FFFFF5] py-20 border-t border-[#781C1D]/10">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-6">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#781C1D]">
                            <span className="italic font-normal lowercase">{t('restoration.team_title_prefix', isAr ? 'فريق' : 'the')}</span>{' '}
                            <span className="font-bold tracking-wide uppercase">{t('restoration.team_title_main', isAr ? 'العمل' : 'TEAM')}</span>
                        </h2>
                    </div>

                    <p className="mx-auto mb-10 max-w-4xl text-center font-serif text-xs sm:text-sm md:text-base uppercase tracking-[0.06em] leading-relaxed md:leading-[1.9] text-[#2C4040]">
                        {t(
                            'restoration.team_description',
                            isAr
                                ? "ولادة خان وحود الجديدة هي ثمرة سنوات من التفاني والترميم والرؤية المشتركة. نتقدم بخالص الامتنان والتقدير لكل من ساهم في هذه الرحلة الاستثنائية — وخاصة الحرفيين والعمال والمهندسين والمعماريين والمصممين الذين أعادت جهودهم وإخلاصهم الحياة إلى الخان."
                                : "KHAN WAHOUD'S REBIRTH IS THE RESULT OF YEARS OF DEDICATION, RESTORATION & SHARED VISION. WE EXTEND OUR GRATITUDE TO ALL WHO CONTRIBUTED TO THIS JOURNEY — ESPECIALLY THE CRAFTSMEN, WORKERS, ENGINEERS, ARCHITECTS, AND DESIGNERS WHOSE CARE AND COMMITMENT HELPED BRING THE KHAN BACK TO LIFE."
                        )}
                    </p>

                    <div className="mx-auto max-w-4xl">
                        <BeforeAfterSlider
                            beforeImage="/images/teambefore.jpeg"
                            afterImage="/images/teamafter.jpeg"
                            beforeLabel={isAr ? 'قبل الترميم' : 'BEFORE'}
                            afterLabel={isAr ? 'بعد الترميم' : 'AFTER'}
                            height="520px"
                            className="shadow-2xl rounded-2xl overflow-hidden border border-[#781C1D]/15"
                        />
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-accent-50 py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title={t('restoration.pillars_title', isAr ? 'ركائز ومراحل الترميم' : 'Restoration Pillars & Phases')}
                        centered={true}
                        className="mb-16"
                    />

                    {loading ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
                            <div className="border-[#781C1D] h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
                            <p className="text-sm text-[#2C4040]/70 font-sans tracking-wide">
                                {t('restoration.loading', isAr ? 'جاري تحميل مراحل الترميم...' : 'Loading restoration timeline...')}
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 py-8">
                            {t('restoration.error_loading', isAr ? 'تعذر تحميل مراحل الترميم. يرجى المحاولة لاحقاً.' : error)}
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {timelineEvents.map((event, index) => {
                                const title = getEventTitle(event);
                                const description = getEventDescription(event);
                                return (
                                    <TimelineEvent
                                        key={event.phase + index}
                                        year={title}
                                        title={title}
                                        description={description}
                                        image={event.media_url}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Before & After */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title={t('restoration.before_after_title', isAr ? 'شواهد قبل وبعد الترميم' : 'Before & After Pillars')}
                        subtitle={t('restoration.before_after_subtitle', isAr ? 'شاهد التحول المعماري التاريخي الفريد' : 'Witness the architectural transformation')}
                        centered={true}
                        className="mb-16"
                    />

                    <div className="space-y-16">
                        {beforeAfterSets.map((set, index) => (
                            <div key={index} className="mx-auto max-w-4xl">
                                <h3 className="mb-6 text-center font-serif text-2xl font-semibold text-[#781C1D]">{set.title}</h3>
                                <BeforeAfterSlider
                                    beforeImage={set.before}
                                    afterImage={set.after}
                                    beforeLabel={t('restoration.before', isAr ? 'قبل الترميم' : 'Before Restoration')}
                                    afterLabel={t('restoration.after', isAr ? 'بعد الترميم' : 'After Restoration')}
                                    className="mb-8"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-accent-950 py-16">
                <div className="container mx-auto px-4 text-center">
                    <SectionTitle
                        title={t('restoration.video_title', isAr ? 'وثائقي الترميم' : 'Restoration Documentary')}
                        subtitle={t('restoration.video_subtitle', isAr ? 'شاهد لمحة عن تقنيات وأسرار الترميم الحرفي' : 'Watch a glimpse on our restoration technique')}
                        centered={true}
                        className="mb-12"
                        whiteText
                    />

                    <div className="mx-auto max-w-4xl">
                        <div className="bg-accent-800 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <VideoPlayer src="/images/output.m3u8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white py-16 border-t border-[#781C1D]/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold text-[#781C1D]">
                        {t('restoration.experience_khan', isAr ? 'عش تجربة الخان المرمم' : 'Experience the Restored Khan')}
                    </h2>
                    <p className="text-accent-700 mx-auto mb-8 max-w-2xl text-base md:text-lg leading-relaxed">
                        {t('restoration.experience_desc', isAr ? 'احجز إقامتك في خان وحود وانغمس في قرون من التراث العريق المرمم بأعلى معايير الفخامة.' : 'Book your stay at Khan Wahoud and immerse yourself in centuries of restored heritage.')}
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button to="/rooms" variant="primary">
                            {t('restoration.book_room', isAr ? 'استكشف الأجنحة والغرف' : 'Explore Suites & Rooms')}
                        </Button>
                        <Button to="/contact" variant="outline">
                            {t('common.contact_us', isAr ? 'تواصل معنا' : 'Contact Us')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RestorationPage;

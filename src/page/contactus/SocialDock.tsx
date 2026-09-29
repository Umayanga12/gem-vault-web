import { Dock, DockIcon } from "@/components/ui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/* ── Colored brand icons ─────────────────────────────────────────────── */

function InstagramIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)" />
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.7" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
    );
}

function FacebookIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
            <path
                d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.1 12.5H13V19H10.5V12.5H8.5V10H10.5V8.3C10.5 6.4 11.7 5 13.7 5H15.5V8Z"
                fill="white"
            />
        </svg>
    );
}

function TikTokIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#010101" />
            {/* cyan shadow */}
            <path
                d="M10.1 8.1a4.2 4.2 0 1 0 4 4.2V8.5a5.3 5.3 0 0 0 3.1 1v-2a3.3 3.3 0 0 1-3.1-3h-2v7.7a2.2 2.2 0 1 1-1.9-2.1z"
                fill="#69C9D0"
                transform="translate(-0.5, 0.3)"
            />
            {/* red shadow */}
            <path
                d="M10.1 8.1a4.2 4.2 0 1 0 4 4.2V8.5a5.3 5.3 0 0 0 3.1 1v-2a3.3 3.3 0 0 1-3.1-3h-2v7.7a2.2 2.2 0 1 1-1.9-2.1z"
                fill="#EE1D52"
                transform="translate(0.5, -0.3)"
            />
            {/* white main */}
            <path
                d="M10.1 8.1a4.2 4.2 0 1 0 4 4.2V8.5a5.3 5.3 0 0 0 3.1 1v-2a3.3 3.3 0 0 1-3.1-3h-2v7.7a2.2 2.2 0 1 1-1.9-2.1z"
                fill="white"
            />
        </svg>
    );
}

function WhatsAppIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#25D366" />
            <path
                d="M12 6.5a5.5 5.5 0 0 0-4.65 8.42L6.5 17.5l2.65-.87A5.5 5.5 0 1 0 12 6.5zm0 10a4.47 4.47 0 0 1-2.28-.63l-.16-.1-1.68.55.56-1.64-.11-.17A4.5 4.5 0 1 1 12 16.5zm2.47-3.37c-.13-.07-.79-.39-.91-.43s-.21-.07-.3.07-.34.43-.42.52-.15.1-.29.03a3.6 3.6 0 0 1-1.06-.65 3.97 3.97 0 0 1-.73-.91c-.08-.13 0-.2.06-.27l.2-.24c.06-.08.08-.13.12-.22s.02-.17-.01-.24-.3-.72-.41-.98c-.11-.26-.22-.22-.3-.22h-.26c-.09 0-.24.03-.37.17a1.73 1.73 0 0 0-.54 1.29 3 3 0 0 0 .63 1.59 6.87 6.87 0 0 0 2.63 2.33c.37.16.65.26.88.33.37.12.7.1.97.06.3-.04.91-.37 1.04-.73s.13-.67.09-.73-.16-.1-.29-.17z"
                fill="white"
            />
        </svg>
    );
}

/* ── Link data ───────────────────────────────────────────────────────── */

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/rheacylone?stkn=MjIzMnJiOGo2ZWdh",
        icon: InstagramIcon,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/share/1EVzE8AQWi/",
        icon: FacebookIcon,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@rheacylone?_r=1&_t=ZS-9A1z0UIIRt6",
        icon: TikTokIcon,
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/+94771770579",
        icon: WhatsAppIcon,
    },
];

/* ── Component ───────────────────────────────────────────────────────── */

export function SocialDock() {
    return (
        <TooltipProvider>
            <Dock
                iconSize={44}
                iconMagnification={68}
                iconDistance={120}
                className="!mx-0 !mt-2 !h-auto backdrop-blur-md px-3 py-2 w-fit"
            >
                {socialLinks.map(({ label, href, icon: Icon }) => (
                    <DockIcon key={label} className="bg-transparent">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <Icon size={28} />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className="bg-black/80 text-white text-xs border border-white/10"
                            >
                                {label}
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                ))}
            </Dock>
        </TooltipProvider>
    );
}

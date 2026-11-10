import { Home, ReceiptText, Ticket, User } from "lucide-react";
import type { CSSProperties } from "react";
import { SCREEN_MAX_WIDTH, colors, font } from "@/lib/design";

const TABS = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "pesanan", label: "Pesanan", icon: ReceiptText },
  { id: "promo", label: "Promo", icon: Ticket },
  { id: "akun", label: "Akun", icon: User },
] as const;

export type TabId = (typeof TABS)[number]["id"];

/** Navigasi bawah ala desain: Beranda, Pesanan, Promo, Akun. */
export function BottomTabBar({
  active,
  onSelect,
  style,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  style?: CSSProperties | undefined;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: SCREEN_MAX_WIDTH,
        background: colors.paper,
        borderTop: `1px solid ${colors.line}`,
        display: "flex",
        padding: "8px 8px calc(10px + env(safe-area-inset-bottom))",
        zIndex: 40,
        ...style,
      }}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            {...(isActive ? { "aria-current": "page" as const } : {})}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "4px 0",
              fontFamily: font.sans,
              fontSize: "0.62rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? colors.green : colors.ink,
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

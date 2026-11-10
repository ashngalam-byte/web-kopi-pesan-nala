import { useRef, type ClipboardEvent, type CSSProperties, type KeyboardEvent } from "react";
import { colors, font } from "@/lib/design";

/** Kotak OTP terkontrol: auto-lanjut, backspace mundur, dukungan tempel (paste). */
export function OtpInput({
  value,
  onChange,
  length = 6,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number | undefined;
  style?: CSSProperties | undefined;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function commit(next: string, focusIndex: number) {
    const clean = next.replace(/\D/g, "").slice(0, length);
    onChange(clean);
    if (focusIndex >= 0 && focusIndex < length) refs.current[focusIndex]?.focus();
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const merged = (digits.slice(0, index).join("") + pasted).slice(0, length);
    commit(merged, Math.min(index + pasted.length, length - 1));
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Backspace") return;
    event.preventDefault();
    const arr = [...digits];
    if (arr[index]) {
      arr[index] = "";
      onChange(arr.join(""));
    } else if (index > 0) {
      arr[index - 1] = "";
      onChange(arr.join(""));
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", ...style }}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1}`}
          value={digit}
          onChange={(e) => {
            const typed = e.target.value.replace(/\D/g, "").at(-1);
            if (typed === undefined) return;
            const arr = [...digits];
            arr[i] = typed;
            commit(arr.join(""), i + 1);
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
          style={{
            width: 44,
            height: 52,
            textAlign: "center",
            fontSize: "1.3rem",
            fontWeight: 700,
            fontFamily: font.sans,
            color: colors.ink,
            border: `1.5px solid ${colors.line}`,
            borderRadius: 10,
            outline: "none",
            background: colors.paper,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

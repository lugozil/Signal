const formatter = new Intl.DateTimeFormat("es", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Puerto_Rico",
});

export function formatDate(iso: string) {
  return formatter.format(new Date(iso));
}

export const KIND_LABEL = { web: "Web", whatsapp: "WhatsApp", otro: "Otro" } as const;

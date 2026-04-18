const CATEGORY_STYLES: Record<string, string> = {
  price: "bg-red-100 text-red-800",
  timing: "bg-yellow-100 text-yellow-800",
  authority: "bg-purple-100 text-purple-800",
  need: "bg-blue-100 text-blue-800",
  other: "bg-muted text-muted-foreground",
}

interface ObjectionTagProps {
  category: string
  quote: string
  suggestedResponse?: string
}

export function ObjectionTag({ category, quote, suggestedResponse }: ObjectionTagProps) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.other

  return (
    <div className="flex flex-col gap-1.5 rounded-md border p-3">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold rounded px-2 py-0.5 capitalize ${style}`}>
          {category}
        </span>
      </div>
      <p className="text-sm text-muted-foreground italic">"{quote}"</p>
      {suggestedResponse && (
        <div className="mt-1 border-l-2 border-muted pl-3">
          <p className="text-xs font-medium text-foreground mb-0.5">Suggested response</p>
          <p className="text-xs text-muted-foreground">{suggestedResponse}</p>
        </div>
      )}
    </div>
  )
}

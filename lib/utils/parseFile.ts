"use client"

export async function parsePdf(file: File): Promise<string | null> {
  try {
    const pdfjsLib = await import("pdfjs-dist")
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const pages: string[] = []

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const text = content.items.map((item: { str?: string }) => item.str ?? "").join(" ")
      pages.push(text)
    }

    const result = pages.join("\n\n").trim()
    return result.length > 50 ? result : null
  } catch {
    return null
  }
}

export async function parseDocx(file: File): Promise<string | null> {
  try {
    const mammoth = await import("mammoth")
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    const text = result.value.trim()
    return text.length > 50 ? text : null
  } catch {
    return null
  }
}

export async function parseTxt(file: File): Promise<string | null> {
  try {
    const text = await file.text()
    const result = text.trim()
    return result.length > 50 ? result : null
  } catch {
    return null
  }
}

export async function parseTranscriptFile(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop()?.toLowerCase()
  if (ext === "pdf") return parsePdf(file)
  if (ext === "docx") return parseDocx(file)
  if (ext === "txt") return parseTxt(file)
  return null
}

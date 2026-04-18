"use client"

import { useState, useRef } from "react"
import { DEAL_STAGES } from "@/lib/constants"
import { parseTranscriptFile } from "@/lib/utils/parseFile"
import type { DealStage } from "@/types"

interface FormState {
  transcriptText: string
  repName: string
  prospectCompany: string
  dealStage: DealStage
  callDate: string
}

interface TranscriptUploadFormProps {
  onSubmit: (data: FormState) => Promise<void>
  isSubmitting: boolean
}

const DEFAULT_FORM: FormState = {
  transcriptText: "",
  repName: "",
  prospectCompany: "",
  dealStage: "discovery",
  callDate: new Date().toISOString().split("T")[0],
}

type Tab = "paste" | "file"

export function TranscriptUploadForm({ onSubmit, isSubmitting }: TranscriptUploadFormProps) {
  const [tab, setTab] = useState<Tab>("paste")
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [fileError, setFileError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function touch(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }))
  }

  function fieldError(key: keyof FormState): string | null {
    if (!touched[key]) return null
    if (key === "transcriptText" && form.transcriptText.trim().length < 50)
      return "Transcript must be at least 50 characters."
    if (key === "repName" && !form.repName.trim()) return "Rep name is required."
    if (key === "prospectCompany" && !form.prospectCompany.trim()) return "Company name is required."
    if (key === "callDate" && !form.callDate) return "Call date is required."
    return null
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileError(null)
    setFileName(file.name)

    const text = await parseTranscriptFile(file)
    if (!text) {
      setFileError(
        "We couldn't extract text from this file. Please paste the transcript directly."
      )
      setFileName(null)
      if (fileRef.current) fileRef.current.value = ""
      return
    }
    set("transcriptText", text)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form)
  }

  const canSubmit =
    form.transcriptText.trim().length > 50 &&
    form.repName.trim() &&
    form.prospectCompany.trim() &&
    form.callDate

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {/* Tab switcher */}
      <div className="flex gap-1 border-b">
        {(["paste", "file"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "paste" ? "Paste Text" : "Upload File"}
          </button>
        ))}
      </div>

      {/* Input area */}
      {tab === "paste" ? (
        <div className="flex flex-col gap-1">
          <textarea
            value={form.transcriptText}
            onChange={(e) => set("transcriptText", e.target.value)}
            onBlur={() => touch("transcriptText")}
            placeholder="Paste your call transcript here…"
            rows={12}
            className={`w-full rounded-md border bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-foreground ${fieldError("transcriptText") ? "border-red-400" : ""}`}
          />
          {fieldError("transcriptText") && (
            <p className="text-xs text-red-500">{fieldError("transcriptText")}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8 text-sm text-muted-foreground cursor-pointer hover:bg-muted transition-colors">
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.pdf,.docx"
              className="hidden"
              onChange={handleFile}
            />
            {fileName ? (
              <span className="text-foreground font-medium">{fileName}</span>
            ) : (
              <>
                <span>Click to upload</span>
                <span className="text-xs mt-1">Supports .txt, .pdf, .docx</span>
              </>
            )}
          </label>
          {fileError && <p className="text-sm text-red-500">{fileError}</p>}
          {form.transcriptText && !fileError && (
            <p className="text-xs text-muted-foreground">
              Extracted {form.transcriptText.length.toLocaleString()} characters — review before submitting.
            </p>
          )}
        </div>
      )}

      {/* Metadata fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Rep Name</label>
          <input
            value={form.repName}
            onChange={(e) => set("repName", e.target.value)}
            onBlur={() => touch("repName")}
            placeholder="e.g. Jane Smith"
            className={`rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground ${fieldError("repName") ? "border-red-400" : ""}`}
          />
          {fieldError("repName") && <p className="text-xs text-red-500">{fieldError("repName")}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Prospect Company</label>
          <input
            value={form.prospectCompany}
            onChange={(e) => set("prospectCompany", e.target.value)}
            onBlur={() => touch("prospectCompany")}
            placeholder="e.g. Acme Corp"
            className={`rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground ${fieldError("prospectCompany") ? "border-red-400" : ""}`}
          />
          {fieldError("prospectCompany") && <p className="text-xs text-red-500">{fieldError("prospectCompany")}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Call Date</label>
          <input
            type="date"
            value={form.callDate}
            onChange={(e) => set("callDate", e.target.value)}
            onBlur={() => touch("callDate")}
            className={`rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground ${fieldError("callDate") ? "border-red-400" : ""}`}
          />
          {fieldError("callDate") && <p className="text-xs text-red-500">{fieldError("callDate")}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Deal Stage</label>
          <select
            value={form.dealStage}
            onChange={(e) => set("dealStage", e.target.value as DealStage)}
            className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground"
          >
            {Object.entries(DEAL_STAGES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="self-start px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting…" : "Analyze Call"}
      </button>
    </form>
  )
}

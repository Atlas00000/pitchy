"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState, useRef } from "react"
import { DEAL_STAGES } from "@/lib/constants"
import { parseTranscriptFile } from "@/lib/utils/parseFile"
import { Button } from "@/components/ui/button"
import { PitchlyCard } from "@/components/ui/pitchly-card"
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

const inputClass =
  "w-full rounded-md border border-pitchly-border bg-pitchly-canvas px-3 py-2 text-sm text-pitchly-text-primary shadow-sm transition-colors duration-150 placeholder:text-pitchly-text-muted focus:border-pitchly-border-strong focus:outline-none focus:ring-2 focus:ring-pitchly-brand/25"

const inputErrorClass = "border-pitchly-score-critical focus:ring-pitchly-score-critical/25"

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

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await onSubmit(form)
  }

  const canSubmit =
    form.transcriptText.trim().length > 50 &&
    form.repName.trim() &&
    form.prospectCompany.trim() &&
    form.callDate

  return (
    <PitchlyCard padding="lg" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-1 border-b border-pitchly-border">
          {(["paste", "file"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out -mb-px ${
                tab === t
                  ? "border-pitchly-brand text-pitchly-text-primary"
                  : "border-transparent text-pitchly-text-muted hover:text-pitchly-text-secondary"
              }`}
            >
              {t === "paste" ? "Paste text" : "Upload file"}
            </button>
          ))}
        </div>

        {tab === "paste" ? (
          <div className="flex flex-col gap-1">
            <textarea
              value={form.transcriptText}
              onChange={(e) => set("transcriptText", e.target.value)}
              onBlur={() => touch("transcriptText")}
              placeholder="Paste your call transcript here…"
              rows={12}
              className={`${inputClass} min-h-[12rem] resize-y ${fieldError("transcriptText") ? inputErrorClass : ""}`}
            />
            {fieldError("transcriptText") && (
              <p className="text-xs font-medium text-pitchly-score-critical">{fieldError("transcriptText")}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-pitchly-border-strong bg-pitchly-surface/50 p-8 text-sm text-pitchly-text-secondary transition-colors duration-150 hover:border-pitchly-brand-muted hover:bg-pitchly-surface">
              <input
                ref={fileRef}
                type="file"
                accept=".txt,.pdf,.docx"
                className="hidden"
                onChange={handleFile}
              />
              {fileName ? (
                <span className="font-medium text-pitchly-text-primary">{fileName}</span>
              ) : (
                <>
                  <span>Click to upload</span>
                  <span className="mt-1 text-xs text-pitchly-text-muted">Supports .txt, .pdf, .docx</span>
                </>
              )}
            </label>
            {fileError && <p className="text-sm font-medium text-pitchly-score-critical">{fileError}</p>}
            {form.transcriptText && !fileError && (
              <p className="text-xs text-pitchly-text-muted">
                Extracted {form.transcriptText.length.toLocaleString()} characters — review before submitting.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pitchly-text-primary">Rep name</label>
            <input
              value={form.repName}
              onChange={(e) => set("repName", e.target.value)}
              onBlur={() => touch("repName")}
              placeholder="e.g. Jane Smith"
              className={`${inputClass} ${fieldError("repName") ? inputErrorClass : ""}`}
            />
            {fieldError("repName") && (
              <p className="text-xs font-medium text-pitchly-score-critical">{fieldError("repName")}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pitchly-text-primary">Prospect company</label>
            <input
              value={form.prospectCompany}
              onChange={(e) => set("prospectCompany", e.target.value)}
              onBlur={() => touch("prospectCompany")}
              placeholder="e.g. Acme Corp"
              className={`${inputClass} ${fieldError("prospectCompany") ? inputErrorClass : ""}`}
            />
            {fieldError("prospectCompany") && (
              <p className="text-xs font-medium text-pitchly-score-critical">{fieldError("prospectCompany")}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pitchly-text-primary">Call date</label>
            <input
              type="date"
              value={form.callDate}
              onChange={(e) => set("callDate", e.target.value)}
              onBlur={() => touch("callDate")}
              className={`${inputClass} ${fieldError("callDate") ? inputErrorClass : ""}`}
            />
            {fieldError("callDate") && (
              <p className="text-xs font-medium text-pitchly-score-critical">{fieldError("callDate")}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pitchly-text-primary">Deal stage</label>
            <select
              value={form.dealStage}
              onChange={(e) => set("dealStage", e.target.value as DealStage)}
              className={inputClass}
            >
              {Object.entries(DEAL_STAGES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" disabled={!canSubmit || isSubmitting} className="self-start">
          {isSubmitting ? "Submitting…" : "Analyze call"}
        </Button>
      </form>
    </PitchlyCard>
  )
}

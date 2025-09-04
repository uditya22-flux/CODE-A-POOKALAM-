"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload, ImageIcon, Trash2 } from "lucide-react"

interface UploadedPookalam {
  id: string
  name: string
  imageUrl: string
  uploadedAt: Date
}

interface UserPookalamPortalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserPookalamPortal({ isOpen, onClose }: UserPookalamPortalProps) {
  const [uploadedPookalams, setUploadedPookalams] = useState<UploadedPookalam[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [pookalamName, setPookalamName] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const uploadPookalam = () => {
    if (!previewImage || !pookalamName.trim()) {
      alert("Please provide both an image and a name for your Pookalam")
      return
    }

    setUploading(true)

    // Simulate upload process
    setTimeout(() => {
      const newPookalam: UploadedPookalam = {
        id: Date.now().toString(),
        name: pookalamName.trim(),
        imageUrl: previewImage,
        uploadedAt: new Date(),
      }

      setUploadedPookalams((prev) => [newPookalam, ...prev])
      setPreviewImage(null)
      setPookalamName("")
      setUploading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 1500)
  }

  const deletePookalam = (id: string) => {
    setUploadedPookalams((prev) => prev.filter((p) => p.id !== id))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-4 border-gradient-to-r from-teal-300 to-emerald-300 relative">
        {/* Decorative Onam elements */}
        <div className="absolute top-4 left-4 w-20 h-16 opacity-20">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9ddabbb5cbc0bd1fbab42614b4255f41.jpg-vHXPSjVfzJtDJlIILybbW5UJcbaDHb.jpeg"
            alt="Kerala boat"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
          <img src="/kerala-traditional-umbrella-parasol.jpg" alt="Umbrella" className="w-full h-full" />
        </div>

        <div className="flex items-center justify-between p-6 border-b-2 border-teal-200 bg-gradient-to-r from-teal-100 to-emerald-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12">
              <img
                src="/kerala-traditional-pookalam-circular-design.jpg"
                alt="Pookalam"
                className="w-full h-full rounded-full border-2 border-teal-300"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                Share Your Pookalam
              </h2>
              <p className="text-teal-600 font-medium">Showcase your beautiful Kerala floral art</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-teal-700 hover:bg-teal-200 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="border-2 border-teal-200 bg-gradient-to-br from-white to-teal-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-emerald-100 border-b border-teal-200">
                <CardTitle className="text-xl text-teal-700 flex items-center">
                  <img src="/camera-icon-kerala-style.jpg" alt="Camera" className="w-6 h-6 mr-2" />
                  Upload Your Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="pookalam-name" className="text-teal-700 font-semibold">
                    Pookalam Name
                  </Label>
                  <Input
                    id="pookalam-name"
                    value={pookalamName}
                    onChange={(e) => setPookalamName(e.target.value)}
                    placeholder="Enter a name for your Pookalam"
                    className="border-2 border-teal-200 focus:border-teal-400 rounded-lg"
                  />
                </div>

                <div
                  className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden ${
                    dragActive
                      ? "border-teal-400 bg-teal-100 scale-105"
                      : "border-teal-300 hover:border-teal-400 bg-gradient-to-br from-white to-teal-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4ac03189aa6de142a22cc688fee0218.jpg-zxGthRdhCLTiUQx9dIwdIqnHcmOpIj.jpeg"
                      alt="Mandala pattern"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {previewImage ? (
                    <div className="space-y-4 relative z-10">
                      <div className="relative">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full max-h-48 mx-auto rounded-xl shadow-lg border-4 border-teal-200"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewImage(null)}
                        className="text-teal-600 border-teal-300 hover:bg-teal-100"
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 relative z-10">
                      <div className="relative">
                        <Upload className="h-16 w-16 text-teal-400 mx-auto" />
                        <div className="absolute -top-2 -right-2">
                          <img src="/kerala-flower-petal.jpg" alt="Petal" className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-teal-700">Drop your Pookalam image here</p>
                        <p className="text-sm text-teal-500 mt-2">or click to browse (Max 5MB)</p>
                        <p className="text-xs text-teal-400 mt-1">Share the beauty of Kerala tradition</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-teal-600 border-teal-300 hover:bg-teal-100 rounded-full px-6"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

                <Button
                  onClick={uploadPookalam}
                  disabled={!previewImage || !pookalamName.trim() || uploading}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-full py-3 font-semibold shadow-lg transform hover:scale-105 transition-all"
                >
                  {uploading ? "🌸 Uploading..." : "🌺 Share Pookalam 🌺"}
                </Button>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 border-b border-emerald-200">
                <CardTitle className="text-xl text-emerald-700 flex items-center">
                  <img src="/kerala-traditional-art-gallery.jpg" alt="Gallery" className="w-6 h-6 mr-2" />
                  Your Pookalam Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {uploadedPookalams.length === 0 ? (
                  <div className="text-center py-12 text-emerald-500 relative">
                    <div className="absolute inset-0 opacity-10">
                      <img src="/kerala-traditional-pookalam-pattern.jpg" alt="Pattern" className="w-full h-full object-contain" />
                    </div>
                    <div className="relative z-10">
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">No Pookalams uploaded yet</p>
                      <p className="text-sm mt-2">Share your first Kerala masterpiece!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {uploadedPookalams.map((pookalam) => (
                      <div
                        key={pookalam.id}
                        className="flex items-center space-x-4 p-4 border-2 border-emerald-100 rounded-xl bg-gradient-to-r from-white to-emerald-50 hover:shadow-md transition-all"
                      >
                        <img
                          src={pookalam.imageUrl || "/placeholder.svg"}
                          alt={pookalam.name}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-emerald-200 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-emerald-800 truncate text-lg">{pookalam.name}</p>
                          <p className="text-sm text-emerald-600 flex items-center">
                            <img src="/calendar-icon.png" alt="Date" className="w-4 h-4 mr-1" />
                            {pookalam.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePookalam(pookalam.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced tips section */}
          <div className="mt-6 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border-2 border-teal-200 relative overflow-hidden">
            <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
              <img src="/kerala-traditional-photographer.jpg" alt="Camera" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                <img src="/kerala-traditional-camera-vintage.jpg" alt="Camera" className="w-7 h-7 mr-3" />
                Photography Tips for Perfect Pookalam Shots
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm text-teal-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 text-lg">📸</span>
                    <span>Take photos from directly above for the best view</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 text-lg">☀️</span>
                    <span>Ensure good lighting - natural daylight works best</span>
                  </li>
                </ul>
                <ul className="text-sm text-teal-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 text-lg">🎯</span>
                    <span>Include the full circular design in the frame</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 text-lg">✨</span>
                    <span>Keep the background clean and uncluttered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from "react"
import { Mail, Linkedin, X, Globe, FileText, MapPin, GraduationCap } from "lucide-react"
import profileData from "../../"

export default function ProfileCard() {
  const profile = profileData

  return (
    <div className="w-80 rounded-xl border border-gray-200 shadow bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>ℹ Public Profile</span>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-300 peer-checked:bg-green-500 rounded-full relative">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></div>
          </div>
        </label>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center px-4 py-6">
        <img
          src={profile.photo}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <h2 className="mt-3 text-xl font-bold">{profile.name}</h2>
        <p className="text-sm text-sky-600">@{profile.username}</p>

        {/* Button */}
        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
          Get your Codolio Card <span role="img" aria-label="lock">🔒</span>
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-gray-600 text-lg">
        {profile.email && (
          <a href={`mailto:${profile.email}`}>
            <Mail size={20} />
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
        )}
        {profile.twitter && (
          <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
            <X size={20} />
          </a>
        )}
        {profile.website && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <Globe size={20} />
          </a>
        )}
        {profile.resume && (
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">
            <FileText size={20} />
          </a>
        )}
      </div>

      {/* Extra info */}
      <div className="mt-4 space-y-2 text-gray-500 px-4">
        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{profile.location}</span>
          </div>
        )}
        {profile.education && (
          <div className="flex items-center gap-2">
            <GraduationCap size={18} />
            <span>{profile.education}</span>
          </div>
        )}
      </div>

      {/* About */}
      <div className="mt-4 border-t pt-3 px-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">About</p>
          <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-md">New</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{profile.about}</p>
      </div>

      {/* Problem Solving Stats */}
      <div className="mt-4 px-4">
        <button className="w-full border rounded-lg px-4 py-2 text-left font-medium bg-gray-50">
          Problem Solving Stats
        </button>
      </div>

      {/* Add Platform */}
      <div className="mt-4 px-4 mb-4">
        <button className="w-full border-2 border-dashed rounded-lg px-4 py-2 text-orange-600 font-medium">
          + Add Platform
        </button>
      </div>
    </div>
  )
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  User, Briefcase, MapPin, Phone, MessageCircle, Mail,
  Tag, Building2, Clock, DollarSign, CheckCircle, Upload,
  Loader2, Send, Wrench, Shield, Award, TrendingUp, Users, Zap, Star,
  AlertCircle, Image as ImageIcon, X,
} from "lucide-react";
import IntroSection from "../components/ui/IntroSection";
import SectionHeading from "../components/ui/SectionHeading";
import InputField from "../components/Form/InputField";
import SelectBox from "../components/Form/SelectBox";
import TextAreaField from "../components/Form/TextAreaField";
import FormSection from "../components/Form/FormSection";
import DynamicListField from "../components/Form/DynamicListField";
import { cities } from "@/data/cities";
import { categories } from "@/data/categories";
import { useAuth } from "@/app/context/AuthContext";
import { useEditBusiness } from "@/app/hooks/useEditBusiness";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import { useBusiness } from "@/app/hooks/useBusiness";

const categoryOptions = categories.map((c) => ({ label: c.name, value: c.slug }));
const cityOptions = cities.map((c) => ({ label: c, value: c }));

const availabilityOptions = [
  { label: "Available", value: "Available" },
  { label: "Busy", value: "Busy" },
  { label: "Unavailable", value: "Unavailable" },
];

const responseTimeOptions = [
  { label: "Within 1 hour", value: "< 1 hour" },
  { label: "Within 2 hours", value: "< 2 hours" },
  { label: "Within 4 hours", value: "< 4 hours" },
  { label: "Same day", value: "Same day" },
  { label: "Next day", value: "Next day" },
];

const phonePattern = {
  value: /^03[0-9]{9}$/,
  message: "Enter valid Pakistani number (03XXXXXXXXX)",
};

// ─── Reusable image upload widget ────────────────────────────────────────────
function ImageUploadField({ label, hint, aspectClass, onUpload, previewUrl, isLoading, error }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        <ImageIcon size={14} className="text-blue-500" />
        {label}
      </label>

      {previewUrl ? (
        <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border border-gray-200 group`}>
          <img src={previewUrl} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { onUpload(null); if (inputRef.current) inputRef.current.value = ""; }}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-full p-1 shadow transition opacity-0 group-hover:opacity-100"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={11} /> Uploaded
          </div>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full ${aspectClass} border-2 border-dashed rounded-xl cursor-pointer transition ${
            isLoading ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={22} className="text-blue-500 animate-spin mb-1" />
              <p className="text-sm text-blue-600 font-medium">Uploading…</p>
            </>
          ) : (
            <>
              <Upload size={22} className="text-gray-400 mb-1" />
              <p className="text-sm text-gray-500 font-medium">Click to upload</p>
              <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleChange}
            disabled={isLoading}
          />
        </label>
      )}

      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function EditBusinessPage() {
  const { token } = useAuth();
  const router = useRouter();

  const { data: business, isLoading: loadingBusiness, isError } = useBusiness();

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [profileImageError, setProfileImageError] = useState("");
  const [formReady, setFormReady] = useState(false);

  const editBusiness = useEditBusiness();
  const profileUpload = useImageUpload("service-markaz/profiles");
  const bannerUpload = useImageUpload("service-markaz/banners");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      services: [{ value: "" }],
      serviceAreas: [{ value: "" }],
      specializations: [{ value: "" }],
    },
  });

  const services = useFieldArray({ control, name: "services" });
  const serviceAreas = useFieldArray({ control, name: "serviceAreas" });
  const specializations = useFieldArray({ control, name: "specializations" });

  // Pre-fill form once business data is loaded
  useEffect(() => {
    if (!business) return;

    setProfileImageUrl(business.profileImage || "");
    setBannerImageUrl(business.bannerImage || "");

    reset({
      name: business.name || "",
      email: business.email || "",
      phone: business.phone || "",
      whatsapp: business.whatsapp || "",
      title: business.title || "",
      category: business.category || "",
      city: business.city || "",
      area: business.area || "",
      about: business.about || "",
      experience: business.experience ?? "",
      completedProjects: business.completedProjects ?? "",
      calloutFee: business.pricing?.calloutFee || "",
      hourlyRate: business.pricing?.hourlyRate || "",
      minCharge: business.pricing?.minCharge || "",
      availability: business.availability || "",
      responseTime: business.responseTime || "",
      services: business.services?.length
        ? business.services.map((s) => ({ value: s }))
        : [{ value: "" }],
      serviceAreas: business.serviceAreas?.length
        ? business.serviceAreas.map((s) => ({ value: s }))
        : [{ value: "" }],
      specializations: business.specializations?.length
        ? business.specializations.map((s) => ({ value: s }))
        : [{ value: "" }],
    });

    setFormReady(true);
  }, [business, reset]);

  useEffect(() => {
    if (!token) router.replace("/sign-in");
  }, [token, router]);

  useEffect(() => {
    if (isError) router.replace("/provider-profile");
  }, [isError, router]);

  const handleProfileUpload = (file) => {
    if (!file) { setProfileImageUrl(""); return; }
    setProfileImageError("");
    profileUpload.mutate(file, {
      onSuccess: (url) => setProfileImageUrl(url),
      onError: (err) => setProfileImageError(err.message),
    });
  };

  const handleBannerUpload = (file) => {
    if (!file) { setBannerImageUrl(""); return; }
    bannerUpload.mutate(file, {
      onSuccess: (url) => setBannerImageUrl(url),
    });
  };

  const onSubmit = (data) => {
    if (!profileImageUrl) {
      setProfileImageError("Profile photo is required");
      return;
    }
    editBusiness.mutate({
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      title: data.title,
      category: data.category,
      city: data.city,
      area: data.area,
      about: data.about,
      services: data.services.map((s) => s.value).filter(Boolean),
      experience: data.experience,
      completedProjects: data.completedProjects,
      specializations: data.specializations.map((s) => s.value).filter(Boolean),
      serviceAreas: data.serviceAreas.map((s) => s.value).filter(Boolean),
      pricing: {
        calloutFee: data.calloutFee,
        hourlyRate: data.hourlyRate,
        minCharge: data.minCharge,
      },
      availability: data.availability,
      responseTime: data.responseTime,
      profileImage: profileImageUrl,
      bannerImage: bannerImageUrl,
    });
  };

  if (!token || loadingBusiness || !formReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  const isSubmitting = editBusiness.isPending;

  return (
    <div className="min-h-screen bg-gray-50">

      <IntroSection
        title="Edit Your Business"
        subtitle="Update your business information to keep your profile accurate and up to date."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 pt-5">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Edit Business Profile</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Fields marked <span className="text-red-500 font-semibold">*</span> are required.
          </p>
        </div>

        {/* Success / Error banners */}
        {editBusiness.isSuccess && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-8">
            <CheckCircle size={22} className="flex-shrink-0 text-green-500" />
            <div>
              <p className="font-semibold">Business updated successfully!</p>
              <p className="text-sm text-green-600">Redirecting to your profile…</p>
            </div>
          </div>
        )}
        {editBusiness.isError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-8">
            <AlertCircle size={22} className="flex-shrink-0" />
            <p className="font-semibold">{editBusiness.error?.message || "Something went wrong. Please try again."}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

          {/* 1 — Personal Information */}
          <FormSection icon={User} title="Personal Information" subtitle="Your name and contact details">
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField
                label="Full Name *"
                icon={User}
                placeholder="e.g. Muhammad Usman"
                registration={register("name", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                error={errors.name?.message}
              />
              <InputField
                label="Email Address *"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                registration={register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                })}
                error={errors.email?.message}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField
                label="Phone Number *"
                icon={Phone}
                type="tel"
                placeholder="03XXXXXXXXX"
                registration={register("phone", { required: "Phone is required", pattern: phonePattern })}
                error={errors.phone?.message}
              />
              <InputField
                label="WhatsApp Number"
                icon={MessageCircle}
                type="tel"
                placeholder="03XXXXXXXXX (optional)"
                registration={register("whatsapp", { pattern: phonePattern })}
                error={errors.whatsapp?.message}
              />
            </div>
          </FormSection>

          {/* 2 — Business Details */}
          <FormSection icon={Briefcase} title="Business Details" subtitle="Describe your service listing">
            <InputField
              label="Business / Service Title *"
              icon={Tag}
              placeholder="e.g. Professional Electrician Services in Rawalpindi"
              registration={register("title", {
                required: "Title is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
              })}
              error={errors.title?.message}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <SelectBox
                label="Category *"
                icon={Tag}
                placeholder="Select Category"
                options={categoryOptions}
                registration={register("category", { required: "Please select a category" })}
                error={errors.category?.message}
              />
              <SelectBox
                label="City *"
                icon={Building2}
                placeholder="Select City"
                options={cityOptions}
                registration={register("city", { required: "Please select a city" })}
                error={errors.city?.message}
              />
            </div>
            <InputField
              label="Area / Location *"
              icon={MapPin}
              placeholder="e.g. Saddar, Satellite Town, F-10"
              registration={register("area", { required: "Area is required" })}
              error={errors.area?.message}
            />
            <TextAreaField
              label="About Your Business *"
              icon={Briefcase}
              placeholder="Describe your services, expertise, and what makes you stand out..."
              rows={4}
              registration={register("about", {
                required: "Description is required",
                minLength: { value: 50, message: "Minimum 50 characters" },
                maxLength: { value: 1000, message: "Maximum 1000 characters" },
              })}
              error={errors.about?.message}
              hint="Minimum 50 characters for a professional description"
            />
          </FormSection>

          {/* 3 — Services Offered */}
          <FormSection icon={Wrench} title="Services Offered" subtitle="List all services you provide">
            <DynamicListField
              icon={Zap}
              label="Add Services *"
              fields={services.fields}
              append={services.append}
              remove={services.remove}
              name="services"
              placeholder="e.g. Residential Wiring, Fault Detection"
              register={register}
              errors={errors}
            />
          </FormSection>

          {/* 4 — Experience */}
          <FormSection icon={Award} title="Experience & Expertise" subtitle="Showcase your professional background">
            <div className="grid sm:grid-cols-2 gap-5">
              <InputField
                label="Years of Experience *"
                icon={Clock}
                type="number"
                placeholder="e.g. 8"
                registration={register("experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 60, message: "Maximum 60 years" },
                  valueAsNumber: true,
                })}
                error={errors.experience?.message}
              />
              <InputField
                label="Completed Projects *"
                icon={TrendingUp}
                type="number"
                placeholder="e.g. 350"
                registration={register("completedProjects", {
                  required: "Projects count is required",
                  min: { value: 0, message: "Cannot be negative" },
                  valueAsNumber: true,
                })}
                error={errors.completedProjects?.message}
              />
            </div>
            <DynamicListField
              icon={Star}
              label="Specializations *"
              fields={specializations.fields}
              append={specializations.append}
              remove={specializations.remove}
              name="specializations"
              placeholder="e.g. Residential, Commercial, Industrial"
              register={register}
              errors={errors}
            />
          </FormSection>

          {/* 5 — Service Areas */}
          <FormSection icon={MapPin} title="Service Areas" subtitle="Cities and areas you serve">
            <DynamicListField
              icon={MapPin}
              fields={serviceAreas.fields}
              append={serviceAreas.append}
              remove={serviceAreas.remove}
              name="serviceAreas"
              placeholder="e.g. Rawalpindi, Islamabad"
              register={register}
              errors={errors}
            />
          </FormSection>

          {/* 6 — Pricing */}
          <FormSection icon={DollarSign} title="Pricing" subtitle="Set your service charges (PKR)">
            <div className="grid sm:grid-cols-3 gap-5">
              <InputField
                label="Service Call Fee *"
                icon={DollarSign}
                placeholder="e.g. 500"
                registration={register("calloutFee", {
                  required: "Call fee is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                })}
                error={errors.calloutFee?.message}
              />
              <InputField
                label="Hourly Rate (PKR) *"
                icon={Clock}
                placeholder="e.g. 1500-2000"
                registration={register("hourlyRate", {
                  required: "Hourly rate is required",
                  pattern: { value: /^[0-9-]+$/, message: "e.g. 1500 or 1500-2000" },
                })}
                error={errors.hourlyRate?.message}
              />
              <InputField
                label="Minimum Charge *"
                icon={DollarSign}
                placeholder="e.g. 1000"
                registration={register("minCharge", {
                  required: "Minimum charge is required",
                  pattern: { value: /^[0-9]+$/, message: "Numbers only" },
                })}
                error={errors.minCharge?.message}
              />
            </div>
          </FormSection>

          {/* 7 — Availability & Scheduling */}
          <FormSection icon={CheckCircle} title="Availability & Scheduling" subtitle="When are you available?">
            <div className="grid sm:grid-cols-2 gap-5">
              <SelectBox
                label="Availability Status *"
                icon={CheckCircle}
                placeholder="Select Availability"
                options={availabilityOptions}
                registration={register("availability", { required: "Please select availability" })}
                error={errors.availability?.message}
              />
              <SelectBox
                label="Response Time *"
                icon={Clock}
                placeholder="Select Response Time"
                options={responseTimeOptions}
                registration={register("responseTime", { required: "Please select response time" })}
                error={errors.responseTime?.message}
              />
            </div>
          </FormSection>

          {/* 8 — Images */}
          <FormSection
            icon={ImageIcon}
            title="Profile & Banner Images"
            subtitle="Upload new images or keep existing ones"
          >
            <ImageUploadField
              label="Profile Photo *"
              hint="JPG or PNG · up to 5 MB · auto-converted to WebP"
              aspectClass="h-40"
              previewUrl={profileImageUrl}
              isLoading={profileUpload.isPending}
              error={profileImageError || (profileUpload.isError ? profileUpload.error?.message : "")}
              onUpload={handleProfileUpload}
            />
            <ImageUploadField
              label="Banner / Cover Image (optional)"
              hint="Recommended 1200 × 400 px · JPG or PNG · up to 5 MB"
              aspectClass="h-32"
              previewUrl={bannerImageUrl}
              isLoading={bannerUpload.isPending}
              error={bannerUpload.isError ? bannerUpload.error?.message : ""}
              onUpload={handleBannerUpload}
            />
          </FormSection>

          {/* Submit */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => router.push("/provider-profile")}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Send size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  User, Briefcase, MapPin, Phone, MessageCircle, Mail,
  Tag, Building2, Clock, DollarSign, CheckCircle, Upload,
  Loader2, Send, Wrench, Shield, Award, TrendingUp, Users, Zap, Star,
  AlertCircle,
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

export default function AddServicePage() {
  const [submitState, setSubmitState] = useState("idle");

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      services: [{ value: "" }],
      serviceAreas: [{ value: "" }],
      specializations: [{ value: "" }],
    },
  });

  const services = useFieldArray({ control, name: "services" });
  const serviceAreas = useFieldArray({ control, name: "serviceAreas" });
  const specializations = useFieldArray({ control, name: "specializations" });

  const onSubmit = async (data) => {
    setSubmitState("loading");
    try {
      // Dummy API — replace with real endpoint later
      await new Promise((res) => setTimeout(res, 1800));
      console.log("Submitted:", data);
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <IntroSection
        title="Add Your Business"
        subtitle="Grow your business by reaching customers in your city. List your service in just a few minutes."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Business Registration Form</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Fields marked <span className="text-red-500 font-semibold">*</span> are required.
          </p>
        </div>

        {/* Success / Error banners */}
        {submitState === "success" && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-8">
            <CheckCircle size={22} className="flex-shrink-0 text-green-500" />
            <div>
              <p className="font-semibold">Business submitted successfully!</p>
              <p className="text-sm text-green-600">We will review and publish your listing within 24 hours.</p>
            </div>
          </div>
        )}
        {submitState === "error" && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-8">
            <AlertCircle size={22} className="flex-shrink-0" />
            <p className="font-semibold">Something went wrong. Please try again.</p>
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

          {/* 7 — Availability & Media */}
          <FormSection icon={CheckCircle} title="Availability & Media" subtitle="When are you available?">
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

            {/* Photo Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Upload size={14} className="text-blue-500" /> Profile Photo
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition group">
                <Upload size={22} className="text-gray-400 group-hover:text-blue-500 mb-1 transition" />
                <p className="text-sm text-gray-500 group-hover:text-blue-600 font-medium">Click to upload photo</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                <input {...register("image")} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" />
              </label>
            </div>
          </FormSection>

          {/* 8 — Terms */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                {...register("terms", { required: "You must accept the terms to continue" })}
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
              />
              <div>
                <p className="text-sm text-gray-700">
                  I confirm all information is accurate and I agree to the{" "}
                  <span className="text-blue-600 font-semibold hover:underline cursor-pointer">Terms & Conditions</span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-semibold hover:underline cursor-pointer">Privacy Policy</span>{" "}
                  of Service Markaz.
                </p>
                {errors.terms && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                    <AlertCircle size={12} /> {errors.terms.message}
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitState === "loading"}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all text-base"
          >
            {submitState === "loading" ? (
              <><Loader2 size={20} className="animate-spin" /> Submitting your business...</>
            ) : (
              <><Send size={18} /> Submit Business Listing</>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            <Shield size={12} className="inline mr-1" />
            Your information is secure and will not be shared with third parties.
          </p>

        </form>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 mt-4">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading
            title="Why list your service?"
            subtitle="Join ServiceMarkaz and grow your local business"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            {[
              { icon: Users, label: "Reach more local customers", bg: "bg-blue-100", color: "text-blue-600" },
              { icon: TrendingUp, label: "Increase visibility online", bg: "bg-green-100", color: "text-green-600" },
              { icon: MessageCircle, label: "Receive direct inquiries", bg: "bg-purple-100", color: "text-purple-600" },
              { icon: Shield, label: "Build trust with your profile", bg: "bg-orange-100", color: "text-orange-600" },
            ].map(({ icon: Icon, label, bg, color }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-100 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <p className="text-sm font-medium text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


import React, { useState } from "react";

const HeroSection = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "resume") setResume(file);
    else setJd(file);
  };

  const analyze = async () => {
    if (!resume || !jd) {
      alert("Please upload both Resume & Job Description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jd);

    try {
      const res = await fetch("http://localhost:8000/api/v1/match", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend not running!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-6">

      {/* TOP LAYOUT: UPLOAD LEFT + RESULTS RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — Upload Section */}
        <div className="space-y-8">

          {/* Resume Upload */}
<div className="
  p-6 bg-card dark:bg-dark-card 
  border border-gray-300 dark:border-dark-border 
  rounded-xl 
  shadow-xl hover:shadow-2xl 
  transition
">
  <h3 className="text-xl font-semibold text-primary-dark dark:text-primary">
    Upload Resume
  </h3>

  <label className="
    mt-4 block w-full p-5 
    border-2 border-dashed rounded-lg 
    cursor-pointer text-center 
    hover:bg-primary/10 hover:border-primary-mid 
    transition
  ">
    <input
      type="file"
      accept=".pdf,.docx"
      className="hidden"
      onChange={(e) => handleUpload(e, 'resume')}
    />
    {resume ? resume.name : "Drag & Drop or Click to Upload"}
  </label>
</div>

          {/* JD Upload */}
<div className="
  p-6 bg-card dark:bg-dark-card 
  border border-gray-300 dark:border-dark-border 
  rounded-xl 
  shadow-xl hover:shadow-2xl 
  transition
">
  <h3 className="text-xl font-semibold text-primary-dark dark:text-primary">
    Upload Job Description
  </h3>

  <label className="
    mt-4 block w-full p-5 
    border-2 border-dashed rounded-lg 
    cursor-pointer text-center 
    hover:bg-primary/10 hover:border-primary-mid 
    transition
  ">
    <input
      type="file"
      accept=".pdf,.docx,.txt"
      className="hidden"
      onChange={(e) => handleUpload(e, 'jd')}
    />
    {jd ? jd.name : "Drag & Drop or Click to Upload"}
  </label>
</div>

          {/* Analyze Button */}
          <button
            onClick={analyze}
            className="
              w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]
              hover:from-[var(--color-primary-mid)] hover:to-[var(--color-primary-dark)]
              shadow-lg hover:shadow-2xl transition-all hover:scale-[1.04]
            "
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* RIGHT — RESULTS */}
        <div className="p-6 bg-card dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-xl shadow-xl min-h-[400px]">
          <h3 className="text-2xl font-extrabold text-primary-dark dark:text-primary mb-4">
            Analysis Results
          </h3>

          {!result && (
            <p className="opacity-60 text-center mt-20">
              Upload files and click Analyze to view results.
            </p>
          )}

          {result && (
            <div>
              <p className="text-lg font-semibold mb-3">
                Match Score:{" "}
                <span className="text-primary-dark">{result.match_score}%</span>
              </p>

              <div className="mb-4">
                <strong>Matching Skills:</strong>
                <p className="opacity-80">
                  {result.matching_skills?.length
                    ? result.matching_skills.join(", ")
                    : "No matching skills found."}
                </p>
              </div>

              <div className="mb-4">
                <strong>Missing Skills:</strong>
                <p className="opacity-80">
                  {result.missing_skills?.length
                    ? result.missing_skills.join(", ")
                    : "No missing skills."}
                </p>
              </div>

              <div className="mb-4">
                <strong>Key Strengths:</strong>
                <p className="opacity-80">
                  {result.key_strengths?.length
                    ? result.key_strengths.join(", ")
                    : "No strengths detected."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* GENERATE EMAIL / COVER LETTER */}
<div className="
  p-6 bg-card dark:bg-dark-card rounded-xl 
  border border-gray-300 dark:border-dark-border
  shadow-xl hover:shadow-2xl transition
">
  <h3 className="font-bold text-primary-dark dark:text-primary mb-3">
    Generate Email / Cover Letter
  </h3>

  <select className="w-full p-3 rounded-md border dark:bg-dark-card dark:border-dark-border">
    <option>Email</option>
    <option>Cover Letter</option>
  </select>

  <select className="w-full p-3 mt-3 rounded-md border dark:bg-dark-card dark:border-dark-border">
    <option>Formal</option>
    <option>Friendly</option>
    <option>HR Professional</option>
  </select>
</div>

        {/* RESUME SUGGESTIONS */}
<div className="
  p-6 bg-card dark:bg-dark-card rounded-xl 
  border border-gray-300 dark:border-dark-border
  shadow-xl hover:shadow-2xl transition
">
  <h3 className="font-bold text-primary-dark dark:text-primary mb-3">
    Resume Improvement Suggestions
  </h3>
  <button
  className="
    w-full py-2 rounded-full font-semibold
    text-white
    bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]
    hover:from-[var(--color-primary-mid)] hover:to-[var(--color-primary-dark)]
    hover:scale-[1.03] hover:shadow-xl
    transition-all
  "
>
  View Suggestions
</button>





</div>

        {/* SKILLS SUMMARY */}
<div className="
  p-6 bg-card dark:bg-dark-card rounded-xl 
  border border-gray-300 dark:border-dark-border
  shadow-xl hover:shadow-2xl transition
">
  <h3 className="font-bold text-primary-dark dark:text-primary mb-3">
    Skills Summary
  </h3>

  <select className="w-full p-3 rounded-md border dark:bg-dark-card dark:border-dark-border">
    <option>Resume Skills</option>
    <option>JD Skills</option>
    <option>Matching Skills</option>
    <option>Missing Skills</option>
    <option>Key Strengths</option>
  </select>
</div>
      </div>
    </div>
  );
};

export default HeroSection;

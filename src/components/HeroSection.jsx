import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://email-backend-vmlo.onrender.com";

const HeroSection = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);

  const [analysis, setAnalysis] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState("formal"); // email/cover letter tone selection

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "resume") setResume(file);
    else setJd(file);
  };

  const analyze = async () => {
    if (!resume || !jd) {
      alert("Please upload both Resume & JD.");
      return;
    }

    setLoading(true);
    setOutput("");

    const formData = new FormData();
    formData.append("resume_file", resume);
    formData.append("jd_file", jd);

    try {
      const res = await fetch(`${API_URL}/api/v1/match`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnalysis(data);
      setOutput("Analysis completed. You can now generate Email, Cover Letter, or Suggestions.");

    } catch (err) {
      alert("Unable to reach backend.");
      console.error(err);
    }

    setLoading(false);
  };

  const generateEmail = async () => {
    if (!analysis) return alert("Run analysis first.");

    setLoading(true);
    setOutput("");

    const payload = {
      resume_text: analysis.resume_text,
      jd_text: analysis.jd_text,
      matching_skills: analysis.matching_skills,
      key_strengths: analysis.key_strengths,
      tone: tone,
    };

    try {
      const res = await fetch(`${API_URL}/api/v1/generate-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setOutput(data.email);

    } catch (err) {
      alert("Failed to generate email.");
    }

    setLoading(false);
  };

  const generateCoverLetter = async () => {
    if (!analysis) return alert("Run analysis first.");

    setLoading(true);
    setOutput("");

    const payload = {
      resume_text: analysis.resume_text,
      jd_text: analysis.jd_text,
      matching_skills: analysis.matching_skills,
      key_strengths: analysis.key_strengths,
      tone: tone,
    };

    try {
      const res = await fetch(`${API_URL}/api/v1/generate-cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setOutput(data.cover_letter);

    } catch (err) {
      alert("Failed to generate cover letter.");
    }

    setLoading(false);
  };

  const viewSuggestions = async () => {
    if (!analysis) return alert("Run analysis first.");

    setLoading(true);
    setOutput("");

    const payload = {
      resume_text: analysis.resume_text,
      jd_text: analysis.jd_text,
      missing_skills: analysis.missing_skills,
      match_score: analysis.match_score,
    };

    try {
      const res = await fetch(`${API_URL}/api/v1/resume-suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setOutput("• " + data.suggestions.join("\n• "));

    } catch (err) {
      alert("Failed to fetch suggestions.");
    }

    setLoading(false);
  };

  const showSkillSummary = (type) => {
    if (!analysis) return alert("Run analysis first.");

    let list = [];

    switch (type) {
      case "Resume Skills":
        list = analysis.resume_skills;
        break;
      case "JD Skills":
        list = analysis.jd_skills;
        break;
      case "Matching Skills":
        list = analysis.matching_skills;
        break;
      case "Missing Skills":
        list = analysis.missing_skills;
        break;
      case "Key Strengths":
        list = analysis.key_strengths;
        break;
    }

    setOutput(list?.length ? list.join(", ") : "No items found.");
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-6">

      {/* ---------------------------------- UPLOAD SECTION ---------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="space-y-8">

          {/* Resume Upload */}
          <div className="p-6 bg-card rounded-xl border shadow-xl">
            <h3 className="text-xl font-semibold">Upload Resume</h3>
            <label className="mt-4 block border-2 border-dashed p-4 rounded-lg cursor-pointer text-center">
              <input type="file" accept=".pdf,.docx" className="hidden"
                onChange={(e) => handleUpload(e, "resume")} />
              {resume ? resume.name : "Click to upload"}
            </label>
          </div>

          {/* JD Upload */}
          <div className="p-6 bg-card rounded-xl border shadow-xl">
            <h3 className="text-xl font-semibold">Upload Job Description</h3>
            <label className="mt-4 block border-2 border-dashed p-4 rounded-lg cursor-pointer text-center">
              <input type="file" accept=".pdf,.docx,.txt" className="hidden"
                onChange={(e) => handleUpload(e, "jd")} />
              {jd ? jd.name : "Click to upload"}
            </label>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyze}
            className="w-full py-3 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-700 hover:scale-105 transition shadow-lg"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* ---------------------------------- ANALYSIS RESULTS ---------------------------------- */}
        <div className="p-6 bg-card rounded-xl border shadow-xl min-h-[300px] text-left">
          <h3 className="text-2xl font-bold mb-4">Analysis Overview</h3>

          {!analysis && (
            <p className="opacity-60 text-center">Upload Resume & JD to begin</p>
          )}

          {analysis && (
            <div className="text-left space-y-3">

              <p>
                <strong>Match Score:</strong> {analysis.match_score}%
              </p>

              <p>
                <strong>Matching Skills:</strong><br />
                {analysis.matching_skills?.length
                  ? analysis.matching_skills.join(", ")
                  : "No matching skills found"}
              </p>

              <p>
                <strong>Missing Skills:</strong><br />
                {analysis.missing_skills?.length
                  ? analysis.missing_skills.join(", ")
                  : "No missing skills found"}
              </p>

              <p>
                <strong>Key Strengths:</strong><br />
                {analysis.key_strengths?.length
                  ? analysis.key_strengths.join(", ")
                  : "No strengths detected"}
              </p>

            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------- ACTION BUTTONS ---------------------------------- */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* EMAIL / COVER LETTER */}
        <div className="p-6 bg-card rounded-xl border shadow-xl">
          <h3 className="font-bold mb-3">Generate Email / Cover Letter</h3>

          {/* Tone Dropdown */}
          <select
            className="w-full p-3 rounded-md border mb-4"
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="simple">Simple</option>
          </select>

          <button
            onClick={generateEmail}
            className="w-full py-2 rounded-full bg-blue-600 text-white mb-2 hover:scale-105 transition shadow-lg"
          >
            Generate Email
          </button>

          <button
            onClick={generateCoverLetter}
            className="w-full py-2 rounded-full bg-indigo-600 text-white hover:scale-105 transition shadow-lg"
          >
            Generate Cover Letter
          </button>
        </div>

        {/* RESUME SUGGESTIONS */}
        <div className="p-6 bg-card rounded-xl border shadow-xl">
          <h3 className="font-bold mb-3">Resume Suggestions</h3>

          <button
            onClick={viewSuggestions}
            className="w-full py-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:scale-105 transition shadow-lg"
          >
            View Suggestions
          </button>
        </div>

        {/* SKILLS SUMMARY */}
        <div className="p-6 bg-card rounded-xl border shadow-xl">
          <h3 className="font-bold mb-3">Skills Summary</h3>

          <select
            onChange={(e) => showSkillSummary(e.target.value)}
            className="w-full p-3 rounded-full border bg-white shadow-md hover:shadow-xl transition cursor-pointer font-semibold"
          >
            <option>Resume Skills</option>
            <option>JD Skills</option>
            <option>Matching Skills</option>
            <option>Missing Skills</option>
            <option>Key Strengths</option>
          </select>
        </div>
      </div>

      {/* ---------------------------------- OUTPUT PANEL ---------------------------------- */}
      <div className="mt-10 p-6 bg-white border rounded-xl shadow-xl min-h-[200px]">
        <h3 className="text-xl font-bold mb-2">Output</h3>

        {loading ? (
          <p className="opacity-70">Loading...</p>
        ) : (
          <pre className="whitespace-pre-wrap text-left leading-relaxed">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

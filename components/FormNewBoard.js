"use client";
import { useState } from "react";

const FormNewBoard = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/board", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      console.log("Board created:", data);
      setName("");
      setSuccess("Board created successfully!");
    } catch (e) {
      console.error("Error creating board:", e);
      setError(e.message || "Failed to create board");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="font-extrabold text-lg">Create new feedback board</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      )}

      <div>
        <label className="form-control w-full">
          <div>
            <span className="label-text">Board name</span>
          </div>
          <input
            required
            type="text"
            className="input input-bordered w-full"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Create Board"
          )}
        </button>
      </div>
    </form>
  );
};

export default FormNewBoard;

"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormNewBoard = () => {
  const router = useRouter();
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
      const response = await axios.post("/api/board", { name });

      console.log("Board created:", response.data);
      setName("");
      setSuccess("Board created successfully!");
      router.refresh();
    } catch (e) {
      console.error("Error creating board:", e);
      setError(
        e.response?.data?.error || e.message || "Failed to create board"
      );
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

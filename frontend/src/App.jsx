import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/violations";

const emptyForm = {
  studentName: "",
  studentId: "",
  violationType: "",
  description: "",
  date: "",
  status: "Pending"
};

function App() {
  // Stores all violation records from the backend.
  const [violations, setViolations] = useState([]);

  // Stores the current form values.
  const [form, setForm] = useState(emptyForm);

  // Stores the ID when editing a record.
  const [editingId, setEditingId] = useState(null);

  // Controls loading, errors, and searching.
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Gets all records from the Express API.
  const fetchViolations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load violation records.");
      }

      const data = await response.json();
      setViolations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load records when the page starts.
  useEffect(() => {
    fetchViolations();
  }, []);

  // Updates form state whenever an input changes.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Handles both creating and updating records.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.studentName.trim() ||
      !form.studentId.trim() ||
      !form.violationType.trim() ||
      !form.description.trim() ||
      !form.date
    ) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      if (editingId) {
        // Update the edited record immediately.
        setViolations((previous) =>
          previous.map((item) =>
            item._id === editingId ? data : item
          )
        );
      } else {
        // Add the new record immediately.
        setViolations((previous) => [
          data,
          ...previous
        ]);
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Loads a record into the form for editing.
  const handleEdit = (violation) => {
    setEditingId(violation._id);

    setForm({
      studentName: violation.studentName,
      studentId: violation.studentId,
      violationType: violation.violationType,
      description: violation.description,
      date: violation.date,
      status: violation.status
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Deletes a record.
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this violation record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete record."
        );
      }

      // Remove the deleted record immediately.
      setViolations((previous) =>
        previous.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Clears the form and exits edit mode.
  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  // Filters records based on the search input.
  const filteredViolations = violations.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.studentName.toLowerCase().includes(keyword) ||
      item.studentId.toLowerCase().includes(keyword) ||
      item.violationType.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="brand">
            <div className="brand-icon">SV</div>

            <div>
              <p className="eyebrow">STUDENT AFFAIRS</p>
              <h1>ViolationLog</h1>
            </div>
          </div>

          <div className="hero-text">
            <span className="hero-tag">
              Student Violation Record System
            </span>

            <h2>
              Keep every student record
              <span> clear and organized.</span>
            </h2>

            <p>
              A simple digital system for recording,
              reviewing, updating, and managing
              student violations.
            </p>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{violations.length}</strong>
              <span>Total Records</span>
            </div>

            <div>
              <strong>
                {
                  violations.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </strong>
              <span>Pending</span>
            </div>

            <div>
              <strong>
                {
                  violations.filter(
                    (item) => item.status === "Resolved"
                  ).length
                }
              </strong>
              <span>Resolved</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container">

        {error && (
          <div className="alert">
            <span>!</span>
            <p>{error}</p>
            <button onClick={() => setError("")}>
              ×
            </button>
          </div>
        )}

        <section className="form-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                {editingId ? "EDIT RECORD" : "NEW RECORD"}
              </span>

              <h3>
                {editingId
                  ? "Update violation"
                  : "Record a violation"}
              </h3>
            </div>

            {editingId && (
              <button
                className="cancel-btn"
                onClick={resetForm}
                type="button"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="field">
                <label>Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  placeholder="e.g. Juan Dela Cruz"
                />
              </div>

              <div className="field">
                <label>Student ID *</label>
                <input
                  type="text"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="e.g. BSIT-2026-001"
                />
              </div>

              <div className="field">
                <label>Violation Type *</label>
                <select
                  name="violationType"
                  value={form.violationType}
                  onChange={handleChange}
                >
                  <option value="">
                    Select violation
                  </option>
                  <option value="Late Attendance">
                    Late Attendance
                  </option>
                  <option value="Uniform Violation">
                    Uniform Violation
                  </option>
                  <option value="Absence">
                    Absence
                  </option>
                  <option value="Disruptive Behavior">
                    Disruptive Behavior
                  </option>
                  <option value="Academic Misconduct">
                    Academic Misconduct
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="field">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Resolved">
                    Resolved
                  </option>
                  <option value="Dismissed">
                    Dismissed
                  </option>
                </select>
              </div>

              <div className="field field-wide">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what happened..."
                  rows="4"
                />
              </div>

            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Clear
              </button>

              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Record"
                    : "Add Violation"}
              </button>
            </div>
          </form>
        </section>

        <section className="records-section">
          <div className="records-header">
            <div>
              <span className="section-label">
                RECORDS
              </span>

              <h3>Violation history</h3>
            </div>

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search student or violation..."
              />
            </div>
          </div>

          {loading ? (
            <div className="state-box">
              <div className="loader"></div>
              <p>Loading violation records...</p>
            </div>
          ) : filteredViolations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>

              <h4>
                {search
                  ? "No matching records"
                  : "No violation records yet"}
              </h4>

              <p>
                {search
                  ? "Try searching for another student or violation."
                  : "Add your first student violation using the form above."}
              </p>
            </div>
          ) : (
            <div className="record-grid">
              {filteredViolations.map((violation) => (
                <article
                  className="record-card"
                  key={violation._id}
                >
                  <div className="card-top">
                    <span
                      className={`status ${violation.status.toLowerCase()}`}
                    >
                      {violation.status}
                    </span>

                    <span className="record-date">
                      {violation.date}
                    </span>
                  </div>

                  <div className="student-info">
                    <div className="avatar">
                      {violation.studentName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h4>{violation.studentName}</h4>
                      <p>{violation.studentId}</p>
                    </div>
                  </div>

                  <div className="violation-info">
                    <span>VIOLATION</span>
                    <strong>
                      {violation.violationType}
                    </strong>

                    <p>{violation.description}</p>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(violation)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(violation._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>
          ViolationLog · Student Violation Record System
        </p>

        <span>
          React · Express · MongoDB
        </span>
      </footer>
    </div>
  );
}

export default App;
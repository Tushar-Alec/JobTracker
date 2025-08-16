function JobForm({ onAddJob }) {
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company || !location) return;

    onAddJob({ title, company, location });
    setTitle("");
    setCompany("");
    setLocation("");
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Compannn"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Job</button>
    </form>
  );
}
export default JobForm;


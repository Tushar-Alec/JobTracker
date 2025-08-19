function JobList({ jobs, onDelete, onUpdate }) {
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <div className="job-card" key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>


          <div className="job-actions">
            <button onClick={() => onUpdate(job)}>Edit</button>
            <button  onClick={() => onDelete(job)}> Delete </button>

          </div>
        </div>
      ))}
    </div>
  );
}
export default JobList;

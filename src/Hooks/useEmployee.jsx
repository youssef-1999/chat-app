import { useEffect, useState } from "react";
import axios from "axios";

const useEmployees = (refreshInterval = 1000) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://firestore.googleapis.com/v1/projects/hr-dashboard-78815/databases/(default)/documents/getEmployees"
      );

      if (!res.data.documents) {
        setEmployees([]);
        return;
      }

      const data = res.data.documents.map((doc) => ({
        id: doc.name.split("/").pop(),
        employeeName: doc.fields.employeeName?.stringValue,
        score: doc.fields.score?.doubleValue,
        notes: doc.fields.notes?.stringValue,
        job: doc.fields.job?.stringValue,
        date: doc.fields.date?.timestampValue
          ? new Date(doc.fields.date.timestampValue).toISOString().split("T")[0]
          : "N/A",
      }));

      setEmployees(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // initial fetch
    const interval = setInterval(getData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { employees, loading, refresh: getData };
};

export default useEmployees;

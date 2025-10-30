import React, { useState } from 'react'
import EmployessFeedback from '../../Components/EmployeesFeedback/EmployessFeedback'
import PaginationComponent from '../../Components/PaginationComponent';
import useEmployees from '../../Hooks/useEmployee';

function Dashboard() {
    const [pageNumber, setPageNumber] = useState(0);
    const { employees } = useEmployees(1000);
  const itemsPerPage = 2;
 

  const start = pageNumber * itemsPerPage;
  const displayItems = employees.slice(start, start + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(employees.length / itemsPerPage);
  return (
    <div>
        <EmployessFeedback employees={displayItems} />
         <PaginationComponent pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  )
}

export default Dashboard
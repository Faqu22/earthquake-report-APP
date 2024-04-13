import React, { useState, useEffect } from 'react';
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Pagination = ({ pagination, setUrlFilter, urlFilter }) => {
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [itemsPerPage, setItemsPerPage] = useState(pagination.per_page);

  useEffect(() => {
    setUrlFilter({ ...urlFilter, page: currentPage, per_page: itemsPerPage });
  }, [currentPage, itemsPerPage, urlFilter, setUrlFilter]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(pagination.total)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    if (e.target.value === '' || e.target.value === '0' || e.target.value === undefined) {
      setItemsPerPage(1);
    }
    else if (e.target.value > 1000) {
      setItemsPerPage(1000);
    }
    else {
    const perPage = parseInt(e.target.value);
    setItemsPerPage(perPage);
    }
    setCurrentPage(1);
  };

  return (
    <div class="flex m-2 items-center">
      <div className="items-per-page" class="flex items-center mr-10 ml-3">
      <span className="sublabel">Mostrando </span>
        <Input type="number" value={itemsPerPage} onChange={handleItemsPerPageChange} min="1" max="1000" className="items-per-page-input" />
        <span className="sublabel">por pagina</span>
      </div>
      <div class="items-center mt-2">

      <Button onClick={handlePrevious} disabled={currentPage === 1} color="default" size="sm"><IoIosArrowBack /></Button>
      <span class="mx-2">
        Pagina {currentPage} de {pagination.total}
      </span>
      <Button onClick={handleNext} disabled={currentPage === pagination.total} color="default" size="sm"><IoIosArrowForward />
</Button>
      </div>
    </div>
  );
};

export default Pagination;

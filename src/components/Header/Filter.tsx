import React from "react";
import Button from "../../utils/Button";

type FilterProps = {
  handleFilter: (value: string) => void;
};
const Filter = (props: FilterProps) => {
  const { handleFilter } = props;
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-align-center text-white">Filter By</p>
      </div>
      <div>
        <Button
          text={"Last Week"}
          handleFilter={handleFilter}
          callValue={"lastWeek"}
        ></Button>
        <Button
          text={"Last Month"}
          handleFilter={handleFilter}
          callValue={"lastMonth"}
        ></Button>

        <Button
          text={"Last Year"}
          handleFilter={handleFilter}
          callValue={"lastYear"}
        ></Button>
      </div>
      {/* Success and Failur */}
      <div>
        <Button
          text={"Success"}
          handleFilter={handleFilter}
          callValue={"success"}
        ></Button>
        <Button
          text={"Fail"}
          handleFilter={handleFilter}
          callValue={"fail"}
        ></Button>
      </div>
      {/* Upcoming */}
      <Button
        text={"Upcoming"}
        handleFilter={handleFilter}
        callValue={"upcoming"}
      ></Button>
    </div>
  );
};

export default Filter;

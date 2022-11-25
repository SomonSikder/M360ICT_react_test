import React, { useEffect, useState } from "react";
import { differenceInDays, formatISO, parseISO } from "date-fns";

type DisProps = {
  value: string;
};

import Search from "./Search";
import Filter from "./Filter";
const Header = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const user = async () => {
      const res = await fetch("https://api.spacexdata.com/v3/launches");
      const data = await res.json();
      setData(data);
      setSearchData(data);
    };
    user();
  }, []);
  const handleSearch = (roketName: string) => {
    const res = data.filter((item: any) => {
      return (
        item.rocket.rocket_name.toLocaleLowerCase() ===
        roketName.toLocaleLowerCase()
      );
    });
    setSearchData(res);
  };

  // Handle Filter
  const handleFilter = (status: string) => {
    switch (status) {
      case "lastWeek":
        const lastWeekData = data.filter((item) => {
          const dis = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year),
            [
              {
                addSuffix: true,
              },
            ]
          );
          if (dis === 7) {
            return dis;
          }
        });
        setSearchData(lastWeekData);
        break;
      case "lastMonth":
        const lastMonthData = data.filter((item) => {
          const dis = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year),
            [
              {
                addSuffix: true,
              },
            ]
          );
          if (dis === 30) {
            return dis;
          }
        });
        setSearchData(lastMonthData);
        break;
      case "lastYear":
        const lastYearData = data.filter((item) => {
          const dis = differenceInDays(
            parseISO(formatISO(new Date())),
            parseISO(item.launch_year),
            [
              {
                addSuffix: true,
              },
            ]
          );
          if (dis === 365) {
            return dis;
          }
        });
        setSearchData(lastYearData);
        break;
      case "success":
        const successData = data.filter((item) => {
          return item.launch_success;
        });
        setSearchData(successData);
        break;
      case "fail":
        const failData = data.filter((item) => {
          return !item.launch_success;
        });
        setSearchData(failData);
        break;
      case "upcoming":
        const upcoming = data.filter((item) => {
          return item.upcoming;
        });

        setSearchData(upcoming);
        break;
      default:
        setSearchData(data);
    }
  };
  return (
    <div className="d-flex flex-collumn justify-content-center align-items-center bg-dark">
      <div className="mb-5 mt-3">
        <h1 className="f1 text-white mb-5">SpaceX</h1>
        <Search handleSearch={handleSearch}></Search>
        <Filter handleFilter={handleFilter}></Filter>
      </div>
    </div>
  );
};

export default Header;
